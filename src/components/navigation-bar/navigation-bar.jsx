import React, { useState, useEffect, useRef } from "react";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useNavigate, Link } from "react-router-dom";
import NavbarLogo from "../../assets/img/navbar-logo.jpeg";

function NavigationBar({ onLogout, onSearch }) {
  const navigate = useNavigate();
  const [expanded, setExpanded] = useState(false);
  const navbarRef = useRef(null);
  const [searchTerm, setSearchTerm] = useState("");

  const handleLogout = () => {
    onLogout();
    navigate("/login");
  };

  const handleClickOutside = (e) => {
    if (navbarRef.current && !navbarRef.current.contains(e.target)) {
      setExpanded(false);
    }
  };

  const handleNavbarToggle = () => {
    setExpanded(!expanded);
  };

  const handleNavItemClick = () => {
    setExpanded(false); // Collapse Navbar when a Nav.Link is clicked
  };

  const handleSearchChange = (e) => {
    const value = e.target.value; // Ensure e.target is defined before accessing value
    setSearchTerm(value);
    onSearch(value); // Pass search term to parent component
  };  

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <Navbar
      ref={navbarRef}
      fixed="top"
      expand="lg"
      expanded={expanded}
      style={{ backgroundColor: "rgba(178, 34, 34, 0.5)", width: "100%", paddingTop: "0", paddingBottom: "0" }}
    >
      <Container fluid>
        <Navbar.Brand as={Link} to="/" onClick={() => setExpanded(false)}>
          <img
            src={NavbarLogo}
            height="30"
            className="navbarLogo d-inline-block align-top"
            alt="Marvel Studios Logo"
          />
        </Navbar.Brand>
        <Navbar.Toggle
          aria-controls="navbarScroll"
          onClick={handleNavbarToggle}
        />
        <Navbar.Collapse id="navbarScroll">
          <Nav className="me-auto my-2 my-lg-0" style={{ maxHeight: "200px" }} navbarScroll>
            <Nav.Link as={Link} to="/" style={{ color: "white" }} onClick={handleNavItemClick}>
              Home
            </Nav.Link>
            <Nav.Link as={Link} to="/movies" style={{ color: "white" }} onClick={handleNavItemClick}>
              Movies
            </Nav.Link>
            <Nav.Link as={Link} to="/carousel" style={{ color: "white" }} onClick={handleNavItemClick}>
              Phases
            </Nav.Link>
            <Nav.Link as={Link} to="/users/profile" style={{ color: "white" }} onClick={handleNavItemClick}>
              Profile
            </Nav.Link>
            <Nav.Link className="logout-link" onClick={handleLogout} style={{ color: "white" }}>
              Log Out
            </Nav.Link>
          </Nav>
          <Form className="d-flex">
            <Form.Control
              type="text"
              placeholder="Search your movie..."
              className="mr-2"
              value={searchTerm}
              onChange={handleSearchChange}
            />
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavigationBar;
