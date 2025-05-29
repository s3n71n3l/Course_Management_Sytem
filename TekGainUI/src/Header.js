import React from "react";
import { Navbar, Container, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import './Header.css';  // Import the CSS file

const NavHeader = () => {
  return (
    <Navbar className="navbar bg-dark" expand="lg">
      <Container>
        <Navbar.Brand as={Link} to="/">
          <h1 style={{ color: "coral", margin: 0 }}>TekGain</h1>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link as={Link} to="/course" className="nav-link">
              Course
            </Nav.Link>
            <Nav.Link as={Link} to="/admission" className="nav-link">
              Admission
            </Nav.Link>
            <Nav.Link as={Link} to="/associate" className="nav-link">
              Associate
            </Nav.Link>
            <Nav.Link as={Link} to="/" className="nav-link">
              Logout
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavHeader;
