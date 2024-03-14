import geopandas as gpd

# Load LGA Data for Queensland and export to data_processed
# Load Australian LGA data
gdf = gpd.read_file("spatial_data/LGA_2023_AUST_GDA2020/LGA_2023_AUST_GDA2020.shp")

# Filter the data for Queensland LGAs
qld_lgas = gdf[gdf["STE_CODE21"] == "3"]
qld_lgas["LGA_CODE23"] = qld_lgas["LGA_CODE23"].astype(int)
qld_lgas.drop(
    [
        "geometry",
        "STE_CODE21",
        "STE_NAME21",
        "AUS_CODE21",
        "AUS_NAME21",
        "AREASQKM",
        "LOCI_URI21",
    ],
    axis=1,
    inplace=True,
)

output_file = "data_processed/demand/0_qld_lgas.csv"
qld_lgas.to_csv(output_file, index=False)
