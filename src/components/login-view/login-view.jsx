import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Container } from "react-bootstrap";
import "./login-view.scss";

export const LoginView = ({ onLoggedIn }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
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
    }

    return errors;
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const errors = validate();
    if (Object.keys(errors).length === 0) {
      const data = {
        Username: username,
        Password: password,
      };

      fetch("https://marvel-flix-c3644575f8db.herokuapp.com/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("Login response: ", data);
          if (data.user) {
            localStorage.setItem("user", JSON.stringify(data.user));
            localStorage.setItem("token", data.token);
            onLoggedIn(data.user, data.token);
          } else {
            navigate("/signup"); // Redirect to the signup page
          }
        })
        .catch((e) => {
          alert("Something went wrong");
        });
    } else {
      setErrors(errors);
    }
  };

  return (
    <Container
      className="login-container d-flex justify-content-center align-items-center"
      style={{ minHeight: "100vh" }}
    >
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formUsername">
          <Form.Label>Username:</Form.Label>
          <Form.Control
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            isInvalid={errors.username}
            required
            minLength="5"
          />
          {errors.username && (
            <Form.Control.Feedback type="invalid">
              {errors.username}
            </Form.Control.Feedback>
          )}
        </Form.Group>

        <Form.Group controlId="formPassword">
          <Form.Label>Password:</Form.Label>
          <Form.Control
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            isInvalid={errors.password}
            required
          />
          {errors.password && (
            <Form.Control.Feedback type="invalid">
              {errors.password}
            </Form.Control.Feedback>
          )}
        </Form.Group>

        <Container className="d-flex justify-content-between mt-5">
          <div className="d-flex justify-content-between">
            <Button variant="primary" type="submit">
              Login
            </Button>
          </div>
          <div>
            <Link to="/signup">Sign Up Here</Link>
          </div>
        </Container>
      </Form>
    </Container>
  );
};
