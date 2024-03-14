import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Table, Dropdown } from "react-bootstrap";
import Plot from 'react-plotly.js';
import Papa from 'papaparse';


const regionTimberDemandMapping = {
    'Queensland': 'qld_timber_dwelling_change',
    'New South Wales': 'nsw_timber_dwelling_change',
    'Victoria': 'vic_timber_dwelling_change',
    //TODO others
}

const regionTimberSupplyMapping = {
    'Queensland': 'qld_supply_timber',
    'New South Wales': 'nsw_supply_timber',
    'Victoria': 'vic_supply_timber',
    //TODO others
}


const regionTreeMapping = {
    'Queensland': 'qld_supply_trees',
    'New South Wales': 'nsw_supply_trees',
    'Victoria': 'vic_supply_trees',
    //TODO others
}

const regionDwellingMapping = {
    'Queensland': 'qld_dwelling_change',
    'New South Wales': 'nsw_dwelling_change',
    'Victoria': 'vic_dwelling_change',
    //TODO others
}


const regionAbbrevMapping = {
    'Queensland': 'QLD',
    'New South Wales': 'NSW',
    'Victoria': 'VIC',
    //TODO others
}

const HomeChart = () => {
    // const [currentView, setCurrentView] = useState('Queensland'); // Default view
    const [chartData, setChartData] = useState([]);
    const [currentYear, setCurrentYear] = useState(2024); // Add state for current year
    const [data, setData] = useState([]); // State to store the parsed CSV data

    const [currentRegion, setCurrentRegion] = useState('Queensland');

    useEffect(() => {
        // Increment the year
        const interval = setInterval(() => {
            setCurrentYear(year => (year < 2035 ? year + 1 : 2024));
        }, 1000); // Adjust the interval as needed

        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        // Parse the CSV file
        Papa.parse('./data/market_gap.csv', {
            download: true,
            header: true,
            complete: (result) => {
                setData(result.data);
                prepareChartData(result.data)
            }
        });
    }, [currentRegion]);

    const prepareChartData = (data) => {
        // Filter or map data here as needed for the chart
        const filteredData = data.filter(row => parseInt(row.year, 10) >= 2024);
        const chartData = filteredData.map(row => {
            return {
                x: row.year, 
                y1: parseFloat(row[regionTimberDemandMapping[currentRegion]]), 
                y2: parseFloat(row[regionTimberSupplyMapping[currentRegion]])
            };
        });

        setChartData(chartData);
    };

    // Function to get data for the current year
    const getDataForYear = (year) => {
        const yearData = data.find(row => row.year === year.toString());
        return yearData || {}; // Return empty object if no data found
    };

    const yearData = getDataForYear(currentYear);
    // const regionTimberDemandData = yearData.qld_timber_dwelling_change;
    const regionTimberDemandData = yearData[regionTimberDemandMapping[currentRegion]]
    // const regionTimberSupplyData = yearData.qld_supply_timber;
    const regionTimberSupplyData = yearData[regionTimberSupplyMapping[currentRegion]]
    // const regionTreeSupplyData = yearData.qld_supply_trees;
    const regionTreeSupplyData = yearData[regionTreeMapping[currentRegion]]
    // const regionDwellingDemandData = yearData.qld_dwelling_change;
    const regionDwellingDemandData = yearData[regionDwellingMapping[currentRegion]]
    const regionTimberShortage = regionTimberDemandData-regionTimberSupplyData;
    const regionRound = Math.round(regionTimberShortage/regionTimberSupplyData*1000)/10;
    const redColour = 'rgb(158,0,0)';


    return (
        // <div>
        <Container className="mt-4">
            <Row>

            <Col md={6}>
                <Table borderless hover size="sm">
                    <tbody>
                        <tr className="align-items-center">
                            <td>
                                <Dropdown>
                                <Dropdown.Toggle variant="" id="dropdown-basic" size="sm" className="text-button">
                                </Dropdown.Toggle>

                                <Dropdown.Menu>
                                    <Dropdown.Item onClick={() => setCurrentRegion('Queensland')}>Queensland</Dropdown.Item>
                                    <Dropdown.Item onClick={() => setCurrentRegion('New South Wales')}>New South Wales</Dropdown.Item>
                                    <Dropdown.Item onClick={() => setCurrentRegion('Victoria')}>Victoria</Dropdown.Item>

                                </Dropdown.Menu>
                            </Dropdown>
                            </td>
                        <td colSpan={3} className="align-middle">
                            In <b>{currentYear}</b>, <b>{currentRegion}'s</b>:   
                        </td>
                        </tr>
                        <tr>
                        <td></td>
                        <td></td>
                        <td colSpan={2}><b>- planned housing construction</b></td>
                        </tr>
                        <tr>
                        <td></td>
                        <td></td>
                        <td style={{ textAlign: 'right' }}>will require</td>
                        <td><b>{regionTimberDemandData || 'N/A'}</b> m<sup>3</sup> of structural timber </td>
                        </tr>
                        <tr>
                        <td></td>
                        <td></td>
                        <td style={{ textAlign: 'right' }}>to build</td>
                        <td><b>{regionDwellingDemandData || 'N/A'}</b> new dwellings.</td>
                        </tr>
                        <tr>
                        <td></td>
                        <td></td>
                        <td colSpan={2}><b>- timber supply chain</b></td>
                        </tr>
                        <tr>
                        <td></td>
                        <td></td>
                        <td style={{ textAlign: 'right' }}>can produce</td>
                        <td><b>{regionTimberSupplyData || 'N/A'}</b> m<sup>3</sup> of structural timber</td>
                        </tr>
                        <tr>
                        <td></td>
                        <td></td>
                        <td style={{ textAlign: 'right' }}>from</td>
                        <td><b>{regionTreeSupplyData || 'N/A'}</b> available softwood plantation trees.</td>
                        </tr>
                        {/* <tr>
                        <td colSpan={4} className="align-middle">Required increase in timber construction supply: <b style={{color:'red'}}>{regionTimberShortage}  m<sup>3</sup> by {currentYear}</b></td>
                        </tr>
                         */}
                    </tbody>
                    </Table>
            </Col>
            <Col md={6}>
                <Plot
                        data={[
                            {
                                x: [currentYear],
                                y: [regionTimberSupplyData],
                                type: 'bar',
                                width: [0.5],
                                name: currentYear + ' Supply',
                                marker: { color: 'rgb(0,158,0)' },
                            },
                            {
                                x: [currentYear],
                                y: [regionTimberShortage],
                                type: 'bar',
                                width: [0.5],
                                name: currentYear + ' Shortage',
                                marker: { color: redColour },
                            },
                            {
                                x: chartData.map(item => item.x),
                                y: chartData.map(item => item.y2),
                                fill: 'tozeroy',
                                type: 'scatter',
                                name: regionAbbrevMapping[currentRegion] + ' Supply',
                                line: { color: '#32A573' },
                            },
                            {
                                x: chartData.map(item => item.x),
                                y: chartData.map(item => item.y1),
                                fill: 'tonexty',
                                type: 'scatter',
                                name: regionAbbrevMapping[currentRegion] + ' Demand',
                                line: { color: '#123BA5' },
                            },
                        ]}
                        layout={{
                            margin: {
                                l: 50, // Left margin
                                r: 30, // Right margin
                                t: 20, // Top margin
                                b: 40  // Bottom margin
                            },
                            legend: {
                                x: 1.0,
                                y: 0.0
                            },
                            yaxis: {title: 'Structural Timber (m3)'},
                            xaxis: {title: 'Year', range: [2024, 2035]},
                            // responsive: true,
                            // useResizeHandler: true,
                            barmode: 'stack'}}
                        style={{ width: "100%", height: "100%" }} // Fill the container
                        useResizeHandler={true}
                    />    
            </Col>    

            </Row>
            <Row>
            <Col md={12}>
            <p>
            So, {currentRegion} needs a <b>{regionTimberShortage}  m<sup>3</sup> ({regionRound}%) boost to structural timber production capability</b> by {currentYear}.
            </p>
            </Col>
            </Row>


        </Container>

        // </div>
    );
};

export default HomeChart;
