import React, { useState , useRef, useEffect} from "react";
import L from 'leaflet';
import { MapContainer, TileLayer, GeoJSON,useMap } from "react-leaflet";
import { Container, Row, Col, Form, Tabs, Tab, Button } from "react-bootstrap";
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'leaflet/dist/leaflet.css';
import geojsonData from '../data.json';
import CustomNavbar from './CustomNavbar';

// Define a color scale. In this example, it's a simple scale for demonstration purposes.
function getColor(d) {
  return d > 50000  ? '#E31A1C' :
         d > 10000  ? '#FC4E2A' :
         d > 5000   ? '#FD8D3C' :
         d > 1000   ? '#FEB24C' :
         d > 100   ? '#FED976' :
                    '#FFEDA0';
}


// Define a component for adding a legend
const Legend = ({ colors, labels }) => {
  const map = useMap();

  useEffect(() => {
    const legend = L.control({ position: 'bottomleft' });

    legend.onAdd = function (map) {
      const div = L.DomUtil.create('div', 'info legend');
      // Loop through our intervals and generate a label with a colored square for each interval
      // const titleHTML = `<h4>${title}</h4>`;
      div.innerHTML = `<b>Structural Timber Consumption</b><br>`;

      for (let i = 0; i < colors.length; i++) {
        div.innerHTML +=
          '<i style="background:' + colors[i] + '"></i> ' +
          labels[i] + ' m3 <br>';
      }
      return div;
    };

    legend.addTo(map);

    // Cleanup
    return () => legend.remove();
  }, [colors, labels]); // This ensures the effect runs only when colors or labels change

  return null;
};


// function App() {
export const ConsumptionMap = () => {  
  // const [dwellingType, setDwellingType] = useState(null);
  const colors = ['#FFEDA0', '#FED976', '#FEB24C', '#FD8D3C', '#FC4E2A', '#E31A1C'];
  const labels = ['0-100', '101-1000', '1001-5000', '5001-10000', '10001-50000', '50000+'];


  // Feature is active area (LGA)
  const [featureInfo, setFeatureInfo] = useState(geojsonData.features.length > 0 ? geojsonData.features[7].properties : null);
  
  // dateYear is active year
  const [dataYear, setDataYear] = useState(2021);

  const [, forceRender] = useState(false);

  const forceUpdate = () => {
    forceRender(prev => !prev);
  };
  
  const mapRef = useRef(null);

  const choroplethStyle = (feature) => {
    return {
      fillColor: getColor(feature.properties[dwellingsTotalVol]), // replace YOUR_DATA_ATTRIBUTE with the attribute you're using
      weight: 2,
      opacity: 1,
      color: 'white',
      dashArray: '3',
      fillOpacity: 0.7
    };
  }


  const handleMouseOver = (event) => {
    event.target.setStyle({
      weight: 5,
      color: '#666',
      dashArray: '',
      fillOpacity: 0.7
    });
    event.target.bringToFront();
    forceUpdate(); 
  };

  const handleMouseOut = (event) => {
    // Reset the style or use your GeoJSON's default style
    event.target.setStyle(choroplethStyle(event.target.feature));
    forceUpdate(); 
  };

  const handleSliderChange = (event) => {
    // update the Data Year
    setDataYear(event.target.value);
  };

  const handleClick = (event) => {
    mapRef.current.fitBounds(event.target.getBounds());
    setFeatureInfo(event.target.feature.properties); 
    // hoveredFeatureRef.current = event.target.feature.properties;
  };

  var dataYearStr = dataYear.toString() 
  var dwellingsTotal = dataYearStr + '_incr';
  var dwellingsLow = dataYearStr + '_incr_det';
  var dwellingsMid =  dataYearStr + '_incr_med';
  var dwellingsHigh =  dataYearStr + '_incr_high';
  var dwellingsLowTimber = dwellingsLow + '_ms';
  var dwellingsMidTimber =  dwellingsMid + '_ms';
  var dwellingsHighTimber =  dwellingsHigh + '_ms';
  var dwellingsTotalTimber = featureInfo[dwellingsLowTimber] + featureInfo[dwellingsMidTimber] + featureInfo[dwellingsHighTimber];
  var dwellingsTotalVol = dataYearStr+'_total_intensity';
  var dwellingsLowTimberVol = dwellingsLow + '_vs';
  var dwellingsMidTimberVol =  dwellingsMid + '_vs';
  var dwellingsHighTimberVol =  dwellingsHigh + '_vs';
   

  const onEachFeature = (feature, layer) => {
    const tooltipContent = `
    <strong>LGA: ${feature.properties.lga_name}</strong><br>
    `;

    layer.on({
      mouseover: handleMouseOver,
      mouseout: handleMouseOut,
      click: handleClick,
    });
    layer.bindTooltip(tooltipContent);

  };

  // YEAR INCREMENT BUTTON
  const [isAutoIncrementing, setIsAutoIncrementing] = useState(false);

  useEffect(() => {
    let intervalId;

    if (isAutoIncrementing) {
      intervalId = setInterval(() => {
        setDataYear((prevYear) => (prevYear < 2035 ? prevYear + 1 : 2021));
      }, 500); // Change 1000 to the desired increment interval in milliseconds
    }

    return () => clearInterval(intervalId); // Cleanup interval on unmount or when isAutoIncrementing changes
  }, [isAutoIncrementing]);

  const handleButtonClick = () => {
    setIsAutoIncrementing((prev) => !prev); // Toggle auto incrementing
  };

  return (

    <div className="app-wrapper">
      <CustomNavbar />

      <Container className="mt-4">
        <Row>
          {/* Data Type Selection */}
          <Col md={4}>
          
          {/* Title */}
          <h4>{featureInfo.lga_name} {dataYear}</h4>

          {/* Year Slider */}
          <div>
            <Form.Control
              type="range"
              min="2021"
              max="2035"
              value={dataYear}
              onChange={(e) => setDataYear(Number(e.target.value))}
            />
            <Button onClick={handleButtonClick}>
              {isAutoIncrementing ? 'Stop' : 'Auto Increment'}
            </Button>
          </div>
            <hr />


            {/* <h4>Displaying data for year: {year}</h4> */}
            <Tabs defaultActiveKey="timber" id="data-tabs">
              <Tab eventKey="timber" title="Construction">
              <br></br>
              <h5>Forecast Dwelling Construction</h5>
                <p>Total Dwellings, Any Material (#): {featureInfo[dwellingsTotal]}
                  <ul>
                  <li>Detached: {featureInfo[dwellingsLow]}</li>
                  <li>Semi-Detached / Low-Rise: {featureInfo[dwellingsMid]}</li>
                  <li>Medium and High-rise: {featureInfo[dwellingsHigh]}</li>
                  </ul>
                </p>
                <p>Total Dwellings, Timber Framed (#): {dwellingsTotalTimber}
                  <ul>
                  <li>Detached: {featureInfo[dwellingsLowTimber]}</li>
                  <li>Semi-Detached / Low-Rise: {featureInfo[dwellingsMidTimber]}</li>
                  <li>Medium and High-rise: {featureInfo[dwellingsHighTimber]}</li>
                  </ul>
                </p>
                <p>Total Buildings, Timber Framed:
                  <ul>
                    <li>Missing <Link to="/consumption/data">data assumption</Link></li>
                  </ul>
                </p>
              </Tab>
              {/* TAB 2 - Consumption */}
              <Tab eventKey="dwellings" title="Consumption">
              <br></br>
              <h5>Forecast Resource Consumption</h5>
                <p>Total Volume, Structural Timber (m3): {featureInfo[dwellingsTotalVol]}
                  <ul>
                  <li>Detached: {featureInfo[dwellingsLowTimberVol]}</li>
                  <li>Semi-Detached / Low-Rise: {featureInfo[dwellingsMidTimberVol]}</li>
                  <li>Medium and High-rise: {featureInfo[dwellingsHighTimberVol]}</li>
                  {/* <li>Combined: {featureInfo[dwellingsTotalVol]}</li> */}
                  </ul>
                </p>
             </Tab>
            </Tabs>


          </Col>
          
          {/* Map */}
          <Col md={8}>
            <MapContainer center={[-22.9179229, 144.9710086]} zoom={5} style={{ height: "80vh", width: "100%" }}  ref = {mapRef}>
              <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
              {/* <Marker position={data[year]} /> */}
              <GeoJSON  
                data={geojsonData}
                style={choroplethStyle}
                onEachFeature={onEachFeature}
              />
              <Legend colors={colors} labels={labels} />
            </MapContainer>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default ConsumptionMap;
