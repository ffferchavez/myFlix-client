import React, { useState, useEffect } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { useParams } from "react-router-dom";

const ProfileView = ({ token }) => {
  const { id } = useParams();
  const [userData, setUserData] = useState(null);
  const [favoriteMovies, setFavoriteMovies] = useState([]);

  useEffect(() => {
    if (!token) return;

    fetch(`https://marvel-flix-c3644575f8db.herokuapp.com/users/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => response.json())
      .then((userData) => {
        setUserData(userData);

        // Fetch favorite movies based on user's FavoriteMovies array
        const favoriteMovieIds = userData.FavoriteMovies || [];
        Promise.all(
          favoriteMovieIds.map((movie) =>
            fetch(
              `https://marvel-flix-c3644575f8db.herokuapp.com/movies/${movie._id}`,
              {
                headers: { Authorization: `Bearer ${token}` },
              }
            ).then((response) => response.json())
          )
        ).then((favoriteMovies) => setFavoriteMovies(favoriteMovies));
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
      });
  }, [token, id]);

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
                {/* Display more movie details here */}
              </div>
            ))
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default ProfileView;
