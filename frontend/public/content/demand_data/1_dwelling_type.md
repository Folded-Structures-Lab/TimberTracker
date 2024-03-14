


### 1. Future Dwellings by Type and Locality

##### Future Dwellings

Projected dwelling data is published by various government levels (primarily, local and State), following various methodologies. The present model uses available State-level household  dwelling projections, developed based on demographic analysis of current dwelling figures and future population and household characteristics. 

| State | Source  |
|------|-------------|
|Queensland| [Queensland Government household and dwelling projections, 2023 edition](https://www.qgso.qld.gov.au/statistics/theme/population/household-dwelling-projections/regions).
|New South Wales |[New South Wales Government 2022 NSW common planning assumption projections](https://www.planning.nsw.gov.au/research-and-demography/population-projections/explore-the-data)| 
|Victoria | [Victoria in Future 2023 (VIF2023) data](https://www.planning.vic.gov.au/guides-and-resources/data-and-insights/victoria-in-future) | 

<p></p>

Dwelling projections per Local Government Area (LGA) are published for 5-year increments from 2021-2046. 
This website calculates the **future dwelling construction** as the annual increase in total private dwellings per LGA. For LGAs with an annual decrease in total private dwellings, future dwelling construction as assumed as zero<sup>1a</sup>.


##### Dwelling Type Proportion


[Building Approvals data](https://www.abs.gov.au/statistics/industry/building-and-construction/building-approvals-australia) collated by the Australian Bureau of Statistics (ABS) provides information about the number of dwellings approved by Local Government Area (LGA). This includes a relatively detailed functional classification of buildings. Seven building codes relate to residential dwellings - these are aggregated into a corresponding building classifications as:

| ABS Code | Code Description | Building Classification |
|------|-------------|-------------------|
| 110 | Houses | Detached |
| 121 | Semi-detached, row or terrace houses, townhouses - One storey | Semi-Detached / Low-Rise |
| 122 | Semi-detached, row or terrace houses, townhouses - Two or more storeys | Semi-Detached / Low-Rise |
| 131 | Apartments - In a one or two storey block | Semi-Detached / Low-Rise |
| 132 | Apartments - In a three storey block | Medium and High-rise |
| 133 | Apartments - In a four to eight storey block | Medium and High-rise |
| 134 | Apartments - In a nine or more storey block | Medium and High-rise |

The current ratios of dwelling types from this dataset are applied to each year of the future dwelling projections to derive a blunt estimate for future dwellings, but both type and LGA<sup>1b,1c,1d</sup>.

##### Notes for Improvement

- 1a: Modelling of development types undertaken by local authorities as part of their infrastructure planning responsibilities may give better local projections of dwellings by type. This data is not typically published as open access.
- 1b: Assumption: future dwelling type composition is constant and same as present. This is in correct, with sources such as the [ShapingSEQ regional plan](https://planning.statedevelopment.qld.gov.au/planning-framework/plan-making/regional-planning/south-east-queensland-regional-plan) indicating housing targets for each LGA will be set, including changes in dwelling density composition. These targets are yet to be published, but could be updated in future website revisions as a direct forecast of dwellings by type. 
- 1c: Improvements to the publication of data about planning approvals, building approvals, and building completion certificates would facilitate better modelling. 
- 1d: Further digitalisation of planning regulations and spatial data outlining future development areas would also allow for greater spatial detail to be incorporated into the model.
- 1e: Modelling is limited to states which have published dwelling projections at an LGA level (QLD, NSW and Victoria). Whilst most states and territories issue population projections, dwelling projections were rarely published. Bespoke projections are outside the scope of this project, TimberTracker could be extended to other states if such information was publicly available.   
- 1f: Even for states where dwelling projections are publicly available, inconsistencies exist between the forecast period 2046 (Qld) 2041 (NSW) and 2036 (Vic). Calculations are limited to the state with the shortest forecast period (2036).
- Other: does not include replacement construction i.e. demolition and rebuild.
