import pandas as pd
import json

# Load LGA Data for Queensland
qld_lgas = pd.read_csv("data_processed/demand/0_qld_lgas.csv")

# 2A. IMPORT DWELLING PROJECTION DATA
# import dwelling projection data
dwelling_data = pd.read_csv("csv_data/qld_dwelling_projections.csv")

# Merge the dwelling data with qld_lgas based on the LGA_Code column
lga_dwellings = qld_lgas.merge(
    dwelling_data, left_on="LGA_CODE23", right_on="lga_code", how="left"
)

lga_dwellings.drop(["LGA_CODE23", "LGA_NAME23"], axis=1, inplace=True)
output_file = "data_processed/demand/1A_lga_dwelling_projection.csv"
lga_dwellings.to_csv(output_file, index=False)

# 3. CALCULATE DWELLING INCREASE INCREMENT

# Define a list of years to work with columns
proj_years = [2021, 2026, 2031, 2036, 2041, 2046]

# Calculate dwelling change for every increment:
for i in range(1, len(proj_years)):
    curr_col = f"{proj_years[i]}_dw"
    prev_col = f"{proj_years[i-1]}_dw"

    increment = lga_dwellings[curr_col] / 5 - lga_dwellings[prev_col] / 5

    # Interpolate output as yearly increments
    for j in range(0, 5):
        year = proj_years[i] - (5 - j)
        new_col = str(year) + "_incr"

        lga_dwellings[new_col] = increment

# Check output
# lga_dwellings.drop(columns = ['AREASQKM', 'LOCI_URI21', 'geometry']).to_csv('test4.csv')

output_file = "data_processed/demand/1B_lga_dwelling_change.csv"
lga_dwellings_save = lga_dwellings.round(decimals=0)
lga_dwellings_save.to_csv(output_file, index=False)

# sum up and export QLD values
incr_columns = lga_dwellings_save.filter(regex="_incr$")
incr_columns = incr_columns.rename(columns=lambda x: x.replace("_incr", ""))
qld_dwellings_save = incr_columns.sum(numeric_only=True)
# qld_dwellings_save.rename(lambda x: "New Dwellings")
qld_dwellings_save.index.name = "Year"
output_file = "data_processed/demand/1B_qld_dwelling_change.csv"
qld_dwellings_save.to_csv(output_file, header=["New_Dwellings"])

### Step 4: Process building approvals data to derive estimates of building type

# Import building approvals data (2021 - 22 and 2022 - 23 financial years)
lga_ba_2122 = pd.read_csv("csv_data/lga_ba_2122.csv")
lga_ba_2223 = pd.read_csv("csv_data/lga_ba_2223.csv")

lga_ba = pd.concat([lga_ba_2122, lga_ba_2223])
lga_ba["dwl"] = pd.to_numeric(lga_ba["dwl"], errors="coerce")

# Filter to type of work "new"
lga_ba = lga_ba[lga_ba["type_work"] == 1]
print(len(lga_ba))

# Filter to only LGAS in QLD
lga_ba = lga_ba[lga_ba["LGA_code"].isin(qld_lgas["LGA_CODE23"])]
print(len(lga_ba))

# Filter to only building work of interest
type_bld = {
    110: "Houses",
    121: "Semi-detached, row or terrace houses, townhouses - One storey",
    122: "Semi-detached, row or terrace houses, townhouses - Two or more storeys",
    131: "Apartments - In a one or two storey block",
    132: "Apartments - In a three storey block",
    133: "Apartments - In a four to eight storey block",
    134: "Apartments - In a nine or more storey block",
}

lga_ba = lga_ba[lga_ba["type_bld"].isin(type_bld.keys())]
print(len(lga_ba))

# Define categories for high, medium and det
type_bld_cat = {"det": [110], "med": [121, 122, 131], "high": [132, 133, 134]}

# Add new det, medium, high column to the building approvals dataset
for key, value in type_bld_cat.items():
    lga_ba.loc[lga_ba["type_bld"].isin(value), "type_bld_cat"] = key

    # Group by building type
lga_ba_group = lga_ba.groupby(["LGA_code", "type_bld_cat"])
lga_ba_group = lga_ba_group["dwl"].sum().reset_index()
lga_ba_values = lga_ba_group.pivot_table(
    index="LGA_code", columns="type_bld_cat", values="dwl"
).reset_index()

# Calculate ratios
lga_ba_values["dwl_sum"] = lga_ba_values[["det", "med", "high"]].sum(axis=1)

for cat in ["det", "med", "high"]:
    lga_ba_values[cat + "_pct"] = lga_ba_values[cat] / lga_ba_values["dwl_sum"]

# Fill NAN with zero
lga_ba_values = lga_ba_values.fillna(0)

# If no residential approvals in 2022/2023 - assume any additional dwellings will be detached houses
lga_ba_values.loc[lga_ba_values["dwl_sum"] == 0, "det_pct"] = 1.0

# add LGA_NAME for legibility
lga_ba_values.rename(columns={"LGA_code": "lga_code"}, inplace=True)

# Merge df1 and df2 on 'LGA_CODE'
lga_ba_values = pd.merge(
    lga_ba_values, lga_dwellings[["lga_code", "lga_name"]], on="lga_code", how="left"
)
print(lga_ba_values.sort_values(by="det_pct"))

# ### Step 5 - Apply approval building type ratios to projected dwellings

# Merge projections with ratio of building types
dwl_type_proj = pd.merge(
    lga_dwellings,
    lga_ba_values[["lga_code", "det_pct", "med_pct", "high_pct"]],
    on="lga_code",
    how="left",
)

# Save to .csv to view output
# dwl_type_proj.drop(columns = ['AREASQKM', 'LOCI_URI21', 'geometry']).to_csv('test.csv')

# Use ratios to calculate dwellings by type in projections (for each increment)

for i in range(2021, 2046):
    year = i
    total_column = str(year) + "_incr"

    for cat in ["det", "med", "high"]:
        r_col = cat + "_pct"
        dwl_type_proj[total_column + "_" + cat] = (
            dwl_type_proj[r_col] * dwl_type_proj[total_column]
        )
        dwl_type_proj[total_column + "_" + cat] = dwl_type_proj[
            total_column + "_" + cat
        ].apply(lambda x: max(0, x))

# dwl_type_proj.drop(columns = ['AREASQKM', 'LOCI_URI21', 'geometry']).to_csv('test2.csv')

output_file = "data_processed/demand/1B_2_lga_dwelling_change_by_type.csv"
dwl_type_proj = dwl_type_proj.round(decimals=0)
dwl_type_proj.to_csv(output_file, index=False)


### Step 6: Convert total dwellings to timber dwellings
# import timber market share
qld_timber_market_share = pd.read_csv("csv_data/qld_timber_market_share.csv")

# merge timber market share with dwelling projections
lga_timber_dwellings = dwl_type_proj.merge(
    qld_timber_market_share,
    left_on="lga_code",
    right_on="lga_code",
    how="left",
    suffixes=("", "_ms"),
)

# Calculate timber market share for each year and increment

timber_intensity_dict = {"det": 12.5, "med": 0.67 * 12.5, "high": 0.411}

for i in range(2021, 2046):
    vol_cols = []

    for cat in ["det", "med", "high"]:
        year = str(i)
        target_col = year + "_incr" + "_" + cat
        # ms = market share
        ms_col = target_col + "_ms"
        # vs = volume share
        vol_col = target_col + "_vs"

        # print(ms_col)

        lga_timber_dwellings[ms_col] = (
            lga_timber_dwellings[target_col] * lga_timber_dwellings[cat]
        )
        lga_timber_dwellings[vol_col] = (
            lga_timber_dwellings[ms_col] * timber_intensity_dict[cat]
        )

        vol_cols = vol_cols + [vol_col]

    lga_timber_dwellings[year + "_total_intensity"] = lga_timber_dwellings[
        vol_cols
    ].sum(axis=1)

# Just add market share columns
ms_col_list = [col for col in lga_timber_dwellings.columns if col.endswith("_ms")]
ms_col_list = ["lga_code"] + ["lga_name"] + ms_col_list[2:]
market_share_df = lga_timber_dwellings[ms_col_list]
market_share_df = market_share_df.round(decimals=0)

output_file = "data_processed/demand/1C_lga_timber_dwelling_change.csv"
market_share_df.to_csv(output_file, index=False)

vs_col_list = [col for col in lga_timber_dwellings.columns if col.endswith("_vs")]
total_vol_col_list = [
    col for col in lga_timber_dwellings.columns if col.endswith("_total_intensity")
]
vs_col_list = ["lga_code"] + ["lga_name"] + vs_col_list + total_vol_col_list
volume_share_df = lga_timber_dwellings[vs_col_list]
volume_share_df = volume_share_df.round(decimals=0)
volume_share_df = volume_share_df.round(decimals=-1)

output_file = "data_processed/demand/1D_lga_timber_volume_change.csv"
volume_share_df.to_csv(output_file, index=False)


# sum up and export QLD values
incr_columns = lga_timber_dwellings.filter(regex="_total_intensity")
incr_columns = incr_columns.rename(columns=lambda x: x.replace("_total_intensity", ""))
qld_timber_save = incr_columns.sum(numeric_only=True).round(decimals=-2)
# qld_dwellings_save.rename(lambda x: "New Dwellings")
qld_timber_save.index.name = "Year"
output_file = "data_processed/demand/1C_qld_timber_dwelling_change.csv"
qld_timber_save.to_csv(output_file, header=["Timber_Volume"])

