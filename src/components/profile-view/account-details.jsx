import React, { useState } from "react";
import PropTypes from "prop-types";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

export const AccountDetails = ({ user, onAccountUpdate }) => {
  const [username, setUsername] = useState(user.Username);
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState(user.Email);
  const [birthday, setBirthday] = useState(user.Birthday.slice(0, 10));
  const [editMode, setEditMode] = useState(false); // State to toggle edit mode

  const toggleEditMode = () => {
    setEditMode(!editMode);
  };

  const handleUpdate = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case "username":
        setUsername(value);
        break;
      case "email":
        setEmail(value);
        break;
      case "password":
        setPassword(value);
        break;
      case "birthday":
        setBirthday(value);
        break;
      default:
        break;
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const updatedProfile = {
      Username: username,
      Email: email,
      Birthday: birthday,
      // Note: You might want to handle password updates securely
    };

    fetch(
      `https://movies-myflix-api-84dbf8740f2d.herokuapp.com/users/${user._id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(updatedProfile),
      }
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to update account");
        }
        return response.json();
      })
      .then((updatedUser) => {
        localStorage.setItem("user", JSON.stringify(updatedUser));
        onAccountUpdate(updatedUser);
        alert("Account updated successfully.");
        setEditMode(false); // Exit edit mode after successful update
      })
      .catch((error) => {
        console.error("Error updating account:", error);
        alert("Failed to update account. Please try again.");
      });
  };

  const handleDeleteAccount = () => {
    fetch(
      `https://movies-myflix-api-84dbf8740f2d.herokuapp.com/users/${user._id}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
      }
    )
      .then((response) => {
        if (response.ok) {
          alert("Account deleted successfully.");
          localStorage.clear();
          window.location.reload();
        } else {
          throw new Error("Failed to delete account");
        }
      })
      .catch((error) => {
        console.error("Error deleting account:", error);
        alert("Failed to delete account. Please try again.");
      });
  };

  return (
    <>
      {!editMode ? (
        <div>
          <h2>Account Information</h2>
          <p>
            <strong>Username:</strong> {username}
          </p>
          <p>
            <strong>Email:</strong> {email}
          </p>
          <p>
            <strong>Birthday:</strong> {birthday}
          </p>
          <Button variant="primary" onClick={toggleEditMode}>
            Edit Information
          </Button>
        </div>
      ) : (
        <Form onSubmit={handleSubmit} className="mb-5">
          <Form.Group className="mb-2" controlId="profileFormUsername">
            <Form.Label>Username:</Form.Label>
            <Form.Control
              type="text"
              name="username"
              value={username}
              onChange={handleUpdate}
              minLength="8"
              required
            />
          </Form.Group>
          <Form.Group className="mb-2" controlId="profileFormPassword">
            <Form.Label>Password:</Form.Label>
            <Form.Control
              type="password"
              name="password"
              value={password}
              onChange={handleUpdate}
              minLength="10"
              required
            />
          </Form.Group>
          <Form.Group className="mb-2" controlId="profileFormEmail">
            <Form.Label>Email:</Form.Label>
            <Form.Control
              type="email"
              name="email"
              value={email}
              onChange={handleUpdate}
              required
            />
          </Form.Group>
          <Form.Group className="mb-2" controlId="profileFormBirthday">
            <Form.Label>Birthdate:</Form.Label>
            <Form.Control
              type="date"
              name="birthday"
              value={birthday}
              onChange={handleUpdate}
              required
            />
          </Form.Group>
          <Row className="my-4">
            <Col>
              <Button variant="primary" type="submit">
                Update
              </Button>
              <Button variant="outline-secondary" onClick={toggleEditMode}>
                Cancel
              </Button>
            </Col>
          </Row>
        </Form>
      )}
      <Row>
        <Col>
          <Button
            type="button"
            onClick={handleDeleteAccount}
            variant="outline-secondary"
          >
            Delete Account Permanently
          </Button>
        </Col>
      </Row>
    </>
  );
};

AccountDetails.propTypes = {
  user: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    Username: PropTypes.string.isRequired,
    Email: PropTypes.string.isRequired,
    Birthday: PropTypes.string.isRequired,
    FavouriteMovies: PropTypes.arrayOf(PropTypes.string),
  }).isRequired,
  onAccountUpdate: PropTypes.func.isRequired,
};