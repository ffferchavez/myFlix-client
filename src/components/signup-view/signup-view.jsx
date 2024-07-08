import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Container, Alert } from "react-bootstrap";
import marvelLogo from "../../assets/img/marvel-logo.jpeg";

export const SignupView = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [birthday, setBirthday] = useState("");
  const [errors, setErrors] = useState({});
  const [showErrorAlert, setShowErrorAlert] = useState(false);
  const navigate = useNavigate();

  const validate = () => {
    let errors = {};

    if (!username.trim()) {
      errors.username = "Username is required";
    } else if (username.length < 5) {
      errors.username = "Username must be at least 5 characters long";
    }

    if (!password.trim()) {
      errors.password = "Password is required";
    } else if (password.length < 6) {
      errors.password = "Password must be at least 6 characters long";
    }

    if (!email.trim()) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = "Email is not valid";
    }

    if (!birthday.trim()) {
      errors.birthday = "Birthday is required";
    }

    return errors;
  };

  /*const isValidDate = (dateString) => {
    const regEx = /^\d{2}\/\d{2}\/\d{4}$/;
    if (!dateString.match(regEx)) return false; // Invalid format
    const d = new Date(dateString);
    const dNum = d.getTime();
    if (!dNum && dNum !== 0) return false; // NaN value, invalid date
    return d.toISOString().slice(0, 10) === dateString;
  };*/

  const handleSubmit = (event) => {
    event.preventDefault();

    const errors = validate();
    if (Object.keys(errors).length === 0) {
      const data = {
        Username: username,
        Password: password,
        Email: email,
        Birthday: birthday,
      };

      fetch("https://marvel-flix-c3644575f8db.herokuapp.com/users", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => {
          if (response.ok) {
            alert("Signup successful!");
            navigate("/login");
          } else {
            response.json().then((data) => {
              setShowErrorAlert(true);
              setErrors(
                data.errors.reduce((acc, error) => {
                  acc[error.param] = error.msg;
                  return acc;
                }, {})
              );
            });
          }
        })
        .catch((error) => {
          console.error("Error signing up:", error);
          setShowErrorAlert(true);
          setErrors({ general: "Signup failed. Please try again later." });
        });
    } else {
      setErrors(errors);
    }
  };

  return (
    <Container
      className="signup-c justify-content-center align-items-center mt-2"
      style={{ minHeight: "100vh" }}
    >
      <div>
        <img
          src={marvelLogo}
          alt="Marvel Logo"
          className="login-logo img-fluid"
        />
      </div>
      {showErrorAlert && (
        <Alert
          variant="danger"
          onClose={() => setShowErrorAlert(false)}
          dismissible
        >
          <Alert.Heading>Error!</Alert.Heading>
          <ul>
            {Object.values(errors).map((error, index) => (
              <li key={index}>{error}</li>
            ))}
          </ul>
        </Alert>
      )}
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formUsername">
          <Form.Label className="signup-label">Username:</Form.Label>
          <Form.Control
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            isInvalid={!!errors.username}
            required
            minLength={5}
          />
          <Form.Control.Feedback type="invalid">
            {errors.username}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group controlId="formPassword">
          <Form.Label className="signup-label">Password:</Form.Label>
          <Form.Control
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            isInvalid={!!errors.password}
            required
            minLength={6}
          />
          <Form.Control.Feedback type="invalid">
            {errors.password}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group controlId="formEmail">
          <Form.Label className="signup-label">Email:</Form.Label>
          <Form.Control
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            isInvalid={!!errors.email}
            required
            pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
          />
          <Form.Control.Feedback type="invalid">
            {errors.email}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group controlId="formBirthday">
          <Form.Label className="signup-label">Birthday:</Form.Label>
          <Form.Control
            type="text"
            value={birthday}
            onChange={(e) => setBirthday(e.target.value)}
            isInvalid={!!errors.birthday}
            required
            placeholder="yyyy/mm/dd"
          />
          <Form.Control.Feedback type="invalid">
            {errors.birthday}
          </Form.Control.Feedback>
        </Form.Group>

        <Container className="d-flex justify-content-between mt-5">
          <div className="d-flex justify-content-between">
            <Button variant="primary" type="submit">
              Sign Up
            </Button>
          </div>
          <div>
            <Link className="login-link" to="/login">
              Login Here
            </Link>
          </div>
        </Container>
      </Form>
    </Container>
  );
};
