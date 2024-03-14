
### 2. Forecast Timber-Framed Dwellings

Forecast timber-framed dwellings are estimated based on market share proportion. 
Australian Construction Insights (2018) reported timber-framed building market share as 73% for detached houses, 79% for Class 1 semi-detached/attached dwellings, and 46% of Class 2 dwellings up to three storeys (ref National Construction Code (NCC) classifications). Woods and Houghton (2022) assume a uniform 85% market share for timber-framed houses and townhouses. Houghton (2019) derive a 2.9% market share for timer-framed Class 2 and 3 (residential) buildings 4 to 8 storeys<sup>2b</sup>. From this data, the model assumes the following market share for each building classification, for all years<sup>2c</sup> and in all regions<sup>2d</sup>: 

| Building Classification | Assumed Market Share| 
|------|-------------|
| Detached | 75% |
| Semi-Detached / Low-Rise | 75% | 
| Medium and High-rise | 2.9% | 

<p></p>

##### Notes for Improvement
- 2a: Building classes correspond to National Construction Code (NCC) classifications. 
- 2b: This is based on number of apartments rather than number of buildings, so is consistent with ABS projection data for Medium and High Rise building classification, which is based on number of dwellings rather than number of buildings. 
- 2c: Timber market share reduced over the time period studied in Australian Construction Insights (2018) report and is sensitive to market factors (in particular, supply availability). Alternate evaluation methods could be used to improve this assumption (e.g. use of materials information provided planning submission / building approvals documentation).
- 2d: Building material composition varies between different geographical regions. This assumption could be improved with access to more detailed market share / construction data.


### 3. Forecast Timber Demand

**Detached Dwelling Timber Volume**

Houghton (2023) calculated timber materials used in typical detached house as 14.58 m<sup>3</sup>. Kapambwe et al. (2009) similarly calculated this as 14m <sup>3, 3a</sup>. Both studies include flooring timber and non-structural timber (joinery etc) in calculated volumes. Excluding flooring and non-structural frame gives a structural timber frame volume of ~**12.5 m<sup>3</sup> per dwelling**, adopted for all regions and years<sup>3b</sup>.
 

**Semi-Detached / Low-Rise Timber Volume**

Woods and Houghton (2022) assume sawn wood per townhouse is 67% of the detached dwelling volume of 14.58 m3 (pro rata on average dwelling floor area).  This model assumes 67% of 12.5 m<sup>3</sup> = 8.4m<sup>3</sup> per dwelling**, adopted for all regions and years<sup>3b,3c</sup>.
 

**Medium and High-rise Timber Volume**
Woods and Houghton (2022) assume sawn wood per townhouse is 0.411 m<sup>3</sup>. Adopted directly for the present model for all regions and years<sup>3c,3d</sup>


##### Notes for Improvement
- 3a: This assumes a weighted average for the proportion of proportion of one and two-storey dwellings and the study notes some inconsistencies how this was measured. It ultimately adopts a 70%/30% weighted proportion of one/two storey houses, despite sample data showing a 33.7%/66.3% one/two storey proportion. This should be exposed directly a model model parameter and connected to separate timber volume data for one/two storey houses.
- 3b: This has historically decreased over time and is also highly varied by region (referenced surveys primarily consider Australian East Coast markets). Could be updated with expected future productivity improvements and region-specific data.
- 3c: Can be significantly improved, e.g. with as-built manufacturing data.
- 3d: There are relatively few medium and high-rise timber apartments nationally, so application as a region-specific factor may give unrealistic values. Apply only to high-density development regions?




<img src="/content/consumption_model.png" width="50%">

### References

- Australian Construction Insights (2018). *Framing material use in residential construction.  An investigation of the factors influencing framing material choice in residential building: 2018 follow up*. Forest and Wood Products Australia, Melbourne, Australia. Available online: [https://fwpa.com.au/update-on-the-residential-framing-market/] (https://fwpa.com.au/update-on-the-residential-framing-market/). 
- Houghton, J. (2019) *Timber's Mid-Rise Market Share*. Forest and Wood Products Australia, Melbourne, Australia. [https://fwpa.com.au/timber-s-mid-rise-market-share-lifts/](https://fwpa.com.au/timber-s-mid-rise-market-share-lifts/).
- Houghton, J. (2023). *Timber usage in residential construction 2017–18 dataset: Report on methodology and results*. Forest and Wood Products Australia, Melbourne, Australia. Available from: [https://fwpa.com.au/timber-usage-in-residential-construction-2017-18-dataset-report-on-methodology-and-results/](https://fwpa.com.au/timber-usage-in-residential-construction-2017-18-dataset-report-on-methodology-and-results/).
- Kapambwe, M., Ximenes, F., Vinden, P., & Keenan, R. (2009). *Dynamics of carbon stocks in timber in Australian residential housing*. Forest and Wood Products Australia, Melbourne, Australia. Available from: [https://fwpa.com.au/dynamics-of-carbon-stocks-in-timber-in-australian-residential-housing/](https://fwpa.com.au/dynamics-of-carbon-stocks-in-timber-in-australian-residential-housing/).
- Woods, T., and Houghton, J. (2022). *Future market dynamics and potential impacts on Australian timber imports - Final Report*. Forest and Wood Products Australia, Melbourne, Australia. Available online: [https://fwpa.com.au/future-market-dynamics-and-potential-impacts-on-australian-timber-imports-interim-report-released/](https://fwpa.com.au/.future-market-dynamics-and-potential-impacts-on-australian-timber-imports-interim-report-released/).