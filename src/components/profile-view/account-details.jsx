import React, { useState } from "react";
import PropTypes from "prop-types";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Modal from "react-bootstrap/Modal";

export const AccountDetails = ({ user, onAccountUpdate }) => {
  const [username, setUsername] = useState(user.Username);
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState(user.Email);
  const [birthday, setBirthday] = useState(user.Birthday.slice(0, 10));
  const [editMode, setEditMode] = useState(false);
  const [showModal, setShowModal] = useState(false);

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
    };

    try {
      const response = await fetch(
        `https://movies-myflix-api-84dbf8740f2d.herokuapp.com/users/${user._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify(updatedProfile),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update account");
      }

      const updatedUser = await response.json();
      localStorage.setItem("user", JSON.stringify(updatedUser));
      onAccountUpdate(updatedUser);
      alert("Account updated successfully.");
      setEditMode(false); // Exit edit mode after successful update
    } catch (error) {
      console.error("Error updating account:", error);
      alert("Failed to update account. Please try again.");
    }
  };

  const handleDeleteAccount = () => {
    setShowModal(true);
  };

  const confirmDeleteAccount = async () => {
    try {
      const response = await fetch(
        `https://movies-myflix-api-84dbf8740f2d.herokuapp.com/users/${user._id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        alert("Account deleted successfully.");
        localStorage.clear();
        window.location.reload();
      } else {
        throw new Error("Failed to delete account");
      }
    } catch (error) {
      console.error("Error deleting account:", error);
      alert("Failed to delete account. Please try again.");
    } finally {
      setShowModal(false);
    }
  };

  return (
    <>
      <Container className="account-info d-flex justify-content-center align-items-center">
        <Row>
          <Col>
            {!editMode && (
              <div>
                <h2 className="text-center">Account Information</h2>
                <p>
                  <strong>Username:</strong> {username}
                </p>
                <p>
                  <strong>Email:</strong> {email}
                </p>
                <p>
                  <strong>Birthday:</strong> {birthday}
                </p>
                <div className="d-flex flex-column justify-space-between align-center">
                <Button
                  variant="secondary"
                  className="mb-4"
                  onClick={toggleEditMode}
                >
                  Edit Information
                </Button>
                <Button variant="primary" onClick={handleDeleteAccount}>
                  Delete Account Permanently
                </Button>
                </div>
              </div>
            )}

            {editMode && (
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
                  <Col className="d-flex justify-content-between">
                    <Button variant="primary" type="submit">
                      Update
                    </Button>
                    <Button
                      variant="secondary"
                      onClick={toggleEditMode}
                    >
                      Cancel
                    </Button>
                  </Col>
                </Row>
              </Form>
            )}
          </Col>
        </Row>
      </Container>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Account Deletion</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete your account permanently? This action
          cannot be undone.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={confirmDeleteAccount}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

AccountDetails.propTypes = {
  user: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    Username: PropTypes.string.isRequired,
    Email: PropTypes.string.isRequired,
    Birthday: PropTypes.string.isRequired,
  }).isRequired,
  onAccountUpdate: PropTypes.func.isRequired,
};

export default AccountDetails;
