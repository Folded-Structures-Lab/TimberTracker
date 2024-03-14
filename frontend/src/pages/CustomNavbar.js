import React from 'react';
import { Nav, Navbar, Button, NavDropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';
// import {About} from './pages/About'; 
import { FaTreeCity } from 'react-icons/fa6';

const CustomNavbar = () => {
    return (
        <>
        {/* <Container className="mt-5"> */}
            <div className="navbar-sticky"> 
                <Navbar className="align-middle justify-content-between" bg="dark" variant="dark">
                    {/* Logo and brand name */}
                    <Link to="/" className="navbar-brand">
                    <div className="d-flex align-items-center">
                        <Button variant="dark" className="mr-2 d-flex align-items-center">
                            <FaTreeCity size={21} />
                            <Navbar.Brand className="ml-2 mb-0">
                                <strong>TimberTracker Australia</strong>
                            </Navbar.Brand>
                        </Button>
                    </div>
                    </Link>

                    {/* Nav links */}
                    <Nav className="ms-auto"> {/* This line is changed */}
                        <NavDropdown title="Timber Consumption" id="resource-dropdown">
                            <NavDropdown.Item as={Link} to="/consumption/map">Map</NavDropdown.Item>
                            <NavDropdown.Item as={Link} to="/consumption/data">Data</NavDropdown.Item>
                        </NavDropdown>
                        <NavDropdown title="Timber Production" id="resource-dropdown">
                            <NavDropdown.Item as={Link} to="/production/map">Map</NavDropdown.Item>
                            <NavDropdown.Item as={Link} to="/production/data">Data</NavDropdown.Item>
                        </NavDropdown>
                        {/* <Nav.Link as={Link} to="/scenarios">Timber Production</Nav.Link> */}
                        {/* <Nav.Link as={Link} to="/data">Scenarios</Nav.Link> */}
                        <Nav.Link as={Link} to="/about">About</Nav.Link>
                    </Nav>
                </Navbar>
            </div>
             {/* </Container> */}
</>
);
}

export default CustomNavbar;

