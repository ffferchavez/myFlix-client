import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useLocation } from "react-router-dom";

function NavigationBar({ onLogout }) {
  const navigate = useNavigate();
  const [isNavExpanded, setIsNavExpanded] = useState(false);
  const location = useLocation();

  const handleLogout = () => {
    // Call the onLogout function passed from the MainView component
    onLogout();

    // Navigate to the login page
    navigate("/login");
  };

  const toggleNavbar = () => {
    setIsNavExpanded(!isNavExpanded);
  };

  // Check if the current location is the login page or the signup page
  if (location.pathname === "/login" || location.pathname === "/signup") {
    return null; // Don't render the NavigationBar component for the login or signup page
  }

  return (
    <Navbar
      expand="lg"
      className="bg-body-tertiary mb-3"
      onToggle={toggleNavbar}
      expanded={isNavExpanded}
    >
      <Container fluid>
        <Navbar.Brand href="http://localhost:1234/movies">
          Marvel Studios
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: "200px" }}
            navbarScroll
          >
            <Nav.Link
              href="http://localhost:1234/movies"
              onClick={toggleNavbar}
            >
              Home
            </Nav.Link>
            <Nav.Link
              href="http://localhost:1234/users/profile"
              onClick={toggleNavbar}
            >
              Profile
            </Nav.Link>
            <Nav.Link
              onClick={() => {
                toggleNavbar();
                handleLogout();
              }}
            >
              Log Out
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavigationBar;
