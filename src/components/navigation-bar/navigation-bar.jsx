import React, { useState } from "react";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Form from "react-bootstrap/Form";
import FormControl from "react-bootstrap/FormControl";
import Button from "react-bootstrap/Button";
import { useNavigate, Link } from "react-router-dom"; // Import Link from react-router-dom
import NavbarLogo from "../../assets/img/navbar-logo.jpeg"; // Adjust the path as per your actual folder structure

function NavigationBar({ onLogout, onSearch }) {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  const handleLogout = () => {
    // Call the onLogout function passed from the MainView component
    onLogout();

    // Navigate to the login page
    navigate("/login");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(searchQuery.trim()); // Pass the trimmed search query to the parent component
  };

  return (
    <Navbar
      fixed="top"
      expand="lg"
      style={{ backgroundColor: "FireBrick", width: "100%" }}
    >
      <Container fluid>
        <Navbar.Brand as={Link} to="/movies">
          <img
            src={NavbarLogo}
            height="30"
            className="navbarLogo d-inline-block align-top"
            alt="Marvel Studios Logo"
          />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: "200px" }}
            navbarScroll
          >
            <Nav.Link as={Link} to="/" style={{ color: "white" }}>
              Home
            </Nav.Link>
            <Nav.Link as={Link} to="/movies" style={{ color: "white" }}>
              Movies
            </Nav.Link>
            <Nav.Link as={Link} to="/users/profile" style={{ color: "white" }}>
              Profile
            </Nav.Link>
            <Nav.Link
              className="logout-link"
              onClick={handleLogout}
              style={{ color: "white" }}
            >
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
              onChange={(e) => setSearchQuery(e.target.value)}
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
