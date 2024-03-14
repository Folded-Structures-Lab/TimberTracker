import React, { useState, useEffect } from 'react';
import CustomNavbar from './CustomNavbar';
import HomeChart from './HomeChart';
import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

  


export const Home = () => {

  return (
    <>
      <CustomNavbar />
      <Container className="mt-5">
        <p>The future development of Australia's built environment must tackle two key challenges: 
          improving access to affordable housing and transitioning to net-zero in construction. Given that the majority of Australian housing is built using timber framing, a key barrier to addressing these challenges is the growing gap between the escalating market demand and the limited supply of sustainably-sourced structural sawn timber:</p>
        <HomeChart />
        <Row>
        <Col md={12}>
        <p>This website has been developed to investigate how open data sources, available in timber supply, building design, and urban planning information ecosystems, can be effectively combined and visualised to better understand the timber resources required for Australia's current and future housing ambitions. The <Link to="/consumption/map">Timber Consumption</Link> tracker delves into demand-side factors contributing to Australia's growing need for structural timber. The <Link to="/production/map">Timber Production</Link> tracker analyses supply-side factors affecting domestic timber availability. </p>
        </Col>
        </Row>
      </Container>
    </>
  );

//   return ;
};

export default Home;