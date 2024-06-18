import React, { useState, useEffect, useRef } from "react";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Form from "react-bootstrap/Form";
import FormControl from "react-bootstrap/FormControl";
import Button from "react-bootstrap/Button";
import { useNavigate, Link } from "react-router-dom";
import NavbarLogo from "../../assets/img/navbar-logo.jpeg";

function NavigationBar({ onLogout, onSearch }) {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [expanded, setExpanded] = useState(false);
  const navbarRef = useRef(null);

  const handleLogout = () => {
    onLogout();
    navigate("/login");
  };

  // Handle search input change
  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    onSearch(query); // Trigger search function passed from MainView
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(searchQuery.trim());
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
      style={{ backgroundColor: "rgba(178, 34, 34, 0.5)", width: "100%" }}
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
          <Form className="d-flex" onSubmit={handleSubmit}>
            <FormControl
              type="search"
              placeholder="Search by movie name"
              className="me-2"
              aria-label="Search"
              value={searchQuery}
              onChange={handleSearchChange} // Update search query on change
            />
            <Button variant="outline-light" type="submit">
              Search
            </Button>
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavigationBar;
