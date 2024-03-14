import pandas as pd


# import demand data
dwelling_change = pd.read_csv("data_processed/demand/aus_1B_state_dwelling_change.csv")
timber_dwelling_change = pd.read_csv(
    "data_processed/demand/aus_1C_state_timber_dwelling_change.csv"
)


# import supply data
tree_supply = pd.read_csv("data_processed/supply/Supply0A_trees.csv")
timber_supply = pd.read_csv("data_processed/supply/Supply_Final.csv")


rename_dict_1 = {"Queensland": "qld", "New South Wales": "nsw", "Victoria": "vic"}

rename_dict_2 = {
    "NewSouthWales": "nsw",
    "NorthernTerritory": "nt",
    "Queensland": "qld",
    "SouthAustralia": "sa",
    "Tasmania": "tas",
    "Victoria": "vic",
    "WesternAustralia": "wa",
    "Australia": "aus",
}


# clean up data imports - change index and rename
all_dfs = [dwelling_change, timber_dwelling_change, tree_supply, timber_supply]
for df in all_dfs:
    df.set_index("Year", inplace=True)
    df.rename(rename_dict_1, axis=1, inplace=True)
    df.rename(rename_dict_2, axis=1, inplace=True)

# make unique columns for each state and data stream
states = [v for _, v in rename_dict_2.items()]
dwelling_change_cols = [x + "_dwelling_change" for x in states]
timber_dwelling_change_cols = [x + "_timber_dwelling_change" for x in states]
supply_trees_cols = [x + "_supply_trees" for x in states]
supply_timber_cols = [x + "_supply_timber" for x in states]

# rename columns in each data stream
dwelling_change.rename(dict(zip(states, dwelling_change_cols)), axis=1, inplace=True)
timber_dwelling_change.rename(
    dict(zip(states, timber_dwelling_change_cols)), axis=1, inplace=True
)
tree_supply.rename(dict(zip(states, supply_trees_cols)), axis=1, inplace=True)
timber_supply.rename(dict(zip(states, supply_timber_cols)), axis=1, inplace=True)


result = dwelling_change.join([timber_dwelling_change, tree_supply, timber_supply], how='outer')
result.rename_axis("year", inplace=True)
# result = result.astype(int)
result.to_csv("data_processed/market_gap.csv")
result.to_csv("frontend/public/data/market_gap.csv")

# TODO
# merge data streas
# dwelling_change.merge(dwelling_change, how="cross")
# export
