import geopandas as gpd
import pandas as pd

# Load LGA Data for Queensland and export to data_processed
# Load Australian LGA data
gdf = gpd.read_file("spatial_data/LGA_2023_AUST_GDA2020/LGA_2023_AUST_GDA2020.shp")
gdf_2pc = gpd.read_file("spatial_data/LGA_2023_AUST_GDA2020/LGA_2023_AUST_GDA2020_2pc.shp")
gdf['geometry'] = gdf_2pc['geometry']

# add dwelling increment data
lga_dwellings_incr = pd.read_csv(
    "data_processed/demand/aus_1B_2_lga_dwelling_change_by_type.csv"
)

included_lgas = lga_dwellings_incr["lga_code"].to_list()
included_lgas = [str(x) for x in included_lgas]

# Filter the shape file data for that linked to processed LGAs
# lgas = gdf[gdf["STE_CODE21"] == "3"]
lgas = gdf[gdf["LGA_CODE23"].isin(included_lgas)]
lgas["LGA_CODE23"] = lgas["LGA_CODE23"].astype(int)


lga_timber_dwellings_geojson = lgas.merge(
    lga_dwellings_incr,
    left_on="LGA_CODE23",
    right_on="lga_code",
    how="left",
    suffixes=("", "_y"),
)

# add market share data
lga_timber_dwellings_ms = pd.read_csv(
    "data_processed/demand/aus_1C_lga_timber_dwelling_change.csv"
)
lga_timber_dwellings_geojson = lga_timber_dwellings_geojson.merge(
    lga_timber_dwellings_ms,
    left_on="LGA_CODE23",
    right_on="lga_code",
    how="left",
    suffixes=("", "_y2"),
)

# add timber volume data
lga_timber_dwellings_vs = pd.read_csv(
    "data_processed/demand/aus_1D_lga_timber_volume_change.csv"
)
lga_timber_dwellings_geojson = lga_timber_dwellings_geojson.merge(
    lga_timber_dwellings_vs,
    left_on="LGA_CODE23",
    right_on="lga_code",
    how="left",
    suffixes=("", "_y3"),
)


# # Convert the GeoDataFrame to GeoJSON format for use with Folium.
lga_timber_dwellings_geojson = lga_timber_dwellings_geojson.to_json()


with open("frontend/src/data.json", "w") as file:
    file.write(lga_timber_dwellings_geojson)


# output_file = "data_processed/demand/0_lgas.csv"
# lgas.to_csv(output_file, index=False)
