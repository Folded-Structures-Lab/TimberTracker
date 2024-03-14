### 1. Forest to Sawmill
##### Sawlog availability

[Australian plantation statistics and log availability data](https://www.agriculture.gov.au/abares/research-topics/forests/forest-economics/plantation-and-log-supply#daff-page-main) are collated and published by the Australian Bureau of Agricultural and Resource Economics and Sciences (ABARES). Forecast log availability data is published for 5-year harvest periods from 2020-24 to 2060-64<sup>1a, 1b</sup>. This is categorised by log type (softwood/hardwood, sawlog/pulplog) and [National Plantation Inventory (NPI)](https://www.agriculture.gov.au/abares/forestsaustralia/australias-national-forest-inventory) region. 

This website uses data from the 2021 report (Legg et al., 2021), rounding annual production volumes for softwood sawlogs to the nearest 100 cubic metres. Production volumes for NPI regions are aggregated into approximate State regions<sup>1c</sup> as:


| NPI region | ~State region |
| ---- | ---- |
| Western Australia | Western Australia |
| Northern Territory | Northern Territory |
| Mount Lofty Ranges and Kangaroo Island | South Australia |
| Green Triangle | Victoria |
| Northern Queensland | Queensland |
| South East Queensland | Queensland |
| Northern Tablelands | New South Wales |
| North Coast | New South Wales |
| Central Tablelands | New South Wales |
| Southern Tablelands | New South Wales |
| Murray Valley | Victoria |
| Central Victoria | Victoria |
| Central Gippsland | Victoria |
| East Gippsland-Bombala | Victoria |
| Tasmania | Tasmania |

<p></p>

##### Sawmill input
Sawlog timber volume includes timber provided to mills which produce various product outputs, including:
- sawn timber (structural and non-structural), 
- veneer and plywood, and
- posts and poles.

The [National Wood Processing Survey](https://www.agriculture.gov.au/abares/research-topics/forests/forest-economics/national-wood-processing-survey) (Downham et al., 2019) lists sawlog inputs<sup>1d</sup> as categorised by timber type (softwood/hardwood/cypress) and mill type. 
- From Table 4: Total softwood sawn timber mill input volume is 8,169,000 m3
- From Table 2: Total softwood sawlog volume is 8,581,000 m3 (excluding cypress pine) or 8,748,000 m3 (including cypress pine) 

The ratio of sawn timber mill input to total input sawlog volume is estimated as 8,169,000 m3 / 8,748,000 m3 = **93%**, for all production years and regions<sup>1e, 1f,1g</sup>.

##### Notes for Improvement
- 1a: Add forecast log availability data reliability classifications (currently unpublished due to data provider confidentiality agreements). 
- 1b: Add forecast log availability uncertainty bounds (accounting for impacts on availability such as from bushfire, land use change, new plantation investment).
- 1c: For NPI regions that lie across two States, divide production volume into each on a pro rata basis (based on land use?).
- 1d: Assumption: total sawlog input volume corresponds to total sawlog availability (unverified, likely influenced by market factors?).
- 1e: Assumption: mill type input ratio will remain constant over time (unverified, check against historical data?).
- 1f: Assumption: mill type input ratio is consistent across all regions - this is incorrect. Could improve with region-specific mill input ratios using alternate data (e.g. region-based mill input data, region-based species production data).
- 1g: Woods and Houghton (2022) evaluates sawnwood sawlog inputs as  90.1-91.9% of total available sawnwood and veneer logs in 2019-20, from ABARES data (Section 3.3.3). 
- Other: The current version of the website does not include plantation supply of pulp logs in its scope. Pulp logs contribute in part to the manufacturing processes of building products such as particleboard.
- Other: Home page displays an 'available tree' estimate, converted from available sawlog volume assuming 0.9 m3 sawlog per tree and 85% of trees used to supply sawlogs (15% pulp logs). Both assumptions could be exposed as model parameters, i.e derive sawlog availability from tree availability.







