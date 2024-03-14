// In MySubComponent.js
import React from 'react';
import { Container, Row, Col } from "react-bootstrap";


function PageTitle(props) {
  return (
    <Container className="mt-4">
    <Row>
      <Col md={12}>
        <h3>{props.pgTitle}</h3>
        <p>{props.pgSubtitle}</p>
      </Col>
    </Row>
      {/* <Navbar.Brand>TimberTrend Australia: Mapping Forestry Resource to Housing Supply</Navbar.Brand> */}
    </Container>
  );
}

export default PageTitle;