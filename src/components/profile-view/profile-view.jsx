import React, { useState, useEffect } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { useParams } from "react-router-dom";

const ProfileView = ({ token, userId }) => {
  const [userData, setUserData] = useState(null);
  const [favoriteMovies, setFavoriteMovies] = useState([]);

  useEffect(() => {
    if (!token || !userId) return;

    console.log(`Fetching user data for userId: ${userId}`);

    // Fetch user profile data
    fetch(`https://marvel-flix-c3644575f8db.herokuapp.com/users/${userId}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((userData) => {
        console.log("User data fetched:", userData);
        setUserData(userData);

        // Fetch favorite movies based on user's FavoriteMovies array
        const favoriteMovieIds = userData.FavoriteMovies || [];
        if (favoriteMovieIds.length > 0) {
          fetch(
            `https://marvel-flix-c3644575f8db.herokuapp.com/movies?ids=${favoriteMovieIds.join(
              ","
            )}`,
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          )
            .then((response) => response.json())
            .then((favoriteMoviesData) => {
              console.log("Favorite movies fetched:", favoriteMoviesData);
              setFavoriteMovies(favoriteMoviesData);
            })
            .catch((error) => {
              console.error("Error fetching favorite movies:", error);
            });
        }
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
      });
  }, [token, userId]);

  if (!userData) {
    return <div>Loading user profile...</div>;
  }

  // Handlers for updating user info or deregistering
  const handleUpdateUserInfo = () => {
    // Placeholder for updating user info logic
    alert("Update user info functionality will be implemented.");
  };

  const handleDeregister = () => {
    // Placeholder for deregistering user logic
    alert("Deregister functionality will be implemented.");
  };

  return (
    <Container className="my-4">
      <Row>
        <Col md={6}>
          <h2>User Profile</h2>
          <p>Username: {userData.Username}</p>
          <p>Email: {userData.Email}</p>
          <p>Date of Birth: {userData.Birthday}</p>
          <Button onClick={handleUpdateUserInfo}>Update Info</Button>
          <Button variant="danger" onClick={handleDeregister}>
            Deregister
          </Button>
        </Col>
        <Col md={6}>
          <h2>Favorite Movies</h2>
          {favoriteMovies.length === 0 ? (
            <p>No favorite movies selected.</p>
          ) : (
            favoriteMovies.map((movie) => (
              <div key={movie._id}>
                <h4>{movie.Title}</h4>
                <p>{movie.Description}</p>
              </div>
            ))
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default ProfileView;
