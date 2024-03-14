"""scripts to process TimberTracker consumption data"""

import pandas as pd


def round_df(n):
    """round number to nearest 100"""
    return round(n / 100) * 100


def process_log_availability_data(df: pd.DataFrame) -> pd.DataFrame:
    """process ABARES sawlog availability data"""

    # List of column names to be annualized (assuming they follow a specific naming pattern)
    columns_to_annualize = [col for col in df.columns if "-" in col]

    # remove unnecessary columns
    df.drop(["National Plantation Inventory region", "Log type"], axis=1, inplace=True)

    # Grouping the data by 'State'
    grouped_df = df.groupby("State").sum()

    # Annualising the data for each 5-year period for the grouped data
    for year in range(2020, 2065):
        # TODO - improve year inputs
        period_col = [col for col in columns_to_annualize if str(year)[:3] in col]
        if period_col:
            grouped_df[str(year)] = grouped_df[period_col[0]].apply(round_df)

    # Reset index to include 'State' as a column and reorder columns
    grouped_df = grouped_df.reset_index()
    reordered_columns_grouped = ["State"] + sorted(grouped_df.columns[1:])
    region_df = grouped_df[reordered_columns_grouped]

    # remove 5-year group columns and rename columns
    region_df.drop(columns_to_annualize, axis=1, inplace=True)
    # region_df.drop(["National Plantation Inventory region"], inplace=True)
    region_df.rename(columns={"State": "Region"}, inplace=True)

    # clean up region column
    region_df["Region"] = region_df["Region"].str.replace(r"\s", "", regex=True)

    # sum up to give australia data
    aus_df = region_df.sum().to_frame().transpose()
    aus_df["Region"] = "Australia"

    # join aus data and clean up (flip years to rows)
    region_df = pd.concat([region_df, aus_df])
    region_df.set_index("Region", inplace=True)
    region_df = region_df.transpose().astype(int)
    return region_df


def divide_volumes(
    df: pd.DataFrame, proportion_dict: dict[float]
) -> dict[pd.DataFrame]:
    """seperate material volumes stored in df to multiple dataframes, using
    keys and proportion values stored in proportion_dict"""
    output_df_dict = {}
    for key, val in proportion_dict.items():
        output_df_dict[key] = df.copy(deep=True) * val
    return output_df_dict


def divide_volumes_get_first(
    df: pd.DataFrame, proportion_dict: dict[float]
) -> pd.DataFrame:
    """get material volumes and return first, rounded df from proportion_dict"""
    vol_dict = divide_volumes(df, proportion_dict)
    first_key = list(proportion_dict.keys())[0]
    vol_df = vol_dict[first_key]
    vol_df = vol_df.apply(round_df).astype(int)
    return vol_df


def main():
    """load data, process, export"""
    # Load the data
    file_path = "data_original/AusPlantStatisLogReport2021_log_availability_data.csv"
    df = pd.read_csv(file_path)
    region_df = process_log_availability_data(df)

    print(region_df)

    output_file = "data_processed/supply/Supply1A_sawlogs.csv"
    region_df.to_csv(output_file, index_label="Year")

    trees_per_sawlog = 1 / 0.9 / 0.85
    output_file = "data_processed/supply/Supply0A_trees.csv"
    tree_df = region_df * trees_per_sawlog
    tree_df.round(decimals=-2).astype(int).to_csv(output_file, index_label="Year")

    # sawmill input
    sawmill_prop_dict = {"sawnboard_mill": 0.93, "other_mill": 0.07}
    sawmill_df = divide_volumes_get_first(region_df, sawmill_prop_dict)
    output_file = "data_processed/supply/Supply1B_sawmill_logs.csv"
    sawmill_df.to_csv(output_file, index_label="Year")

    # sawmill board recovery
    recovery_dict = {
        "sawmill_recovered": 0.478,
        "sawmill_not_recovered": 1 - 0.478,
    }
    sawmill_recovered_df = divide_volumes_get_first(sawmill_df, recovery_dict)
    output_file = "data_processed/supply/Supply2A_sawmill_recovered_board.csv"
    sawmill_recovered_df.to_csv(output_file, index_label="Year")

    # sawmill structural product recovery
    product_share_dict = {
        "dry_structural": 0.517,
        "other": 1 - 0.517,
    }
    structural_board_df = divide_volumes_get_first(
        sawmill_recovered_df, product_share_dict
    )
    output_file = "data_processed/supply/Supply2B_recovered_structural_board.csv"
    # structural_board_df.index.name="Year"
    structural_board_df.to_csv(output_file, index_label="Year")

    # new build product
    file_path = "data_original/BIS_new_build_market_share.csv"
    df_sector_share = pd.read_csv(file_path)

    # NOTE: assumes the same years / index in market share input data - not robust
    df_sector_share = df_sector_share.set_index(structural_board_df.index)

    # Multiplying each column of df1 by the factor in df2
    new_build_df = structural_board_df.copy(deep=True)
    for column in new_build_df.columns:
        new_build_df[column] = (
            new_build_df[column] * df_sector_share["new_build_market_share"]
        )
    new_build_df=new_build_df.round(decimals=-2)
    # new_build_share_dict = {
    #     "new_build": 0.55,
    #     "other": 1 - 0.55,
    # }
    # new_build_df = divide_volumes_get_first(structural_board_df, new_build_share_dict)
    output_file = "data_processed/supply/Supply3A_new_build_timber.csv"
    new_build_df.to_csv(output_file, index_label="Year")

    # less wastage product
    wastage_dict = {
        "not_wasted": 0.9,
        "other": 1 - 0.1,
    }
    new_build_with_waste_df = divide_volumes_get_first(new_build_df, wastage_dict)
    output_file = "data_processed/supply/Supply3B_new_build_not_wasted_timber.csv"
    new_build_with_waste_df=new_build_with_waste_df.round(decimals=-2)
    new_build_with_waste_df.to_csv(output_file, index_label="Year")

    # FINAL OUTPUT
    output_file = "data_processed/supply/Supply_Final.csv"
    new_build_with_waste_df.to_csv(output_file, index_label="Year")


if __name__ == "__main__":
    main()
