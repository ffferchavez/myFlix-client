import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Row, Col, Button, Container } from "react-bootstrap";
import NavigationBar from "../navigation-bar/navigation-bar";
import { MovieCard } from "../movie-card/movie-card";
import MovieView from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";
import { ProfileView } from "../profile-view/profile-view";
import ControlledCarousel from "../carousel-view/carousel-view";

const MainView = () => {
  const [movies, setMovies] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const storedToken = localStorage.getItem("token");
  const [user, setUser] = useState(storedUser || null);
  const [token, setToken] = useState(storedToken || null);
  const [selectedMovieId, setSelectedMovieId] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPhase, setCurrentPhase] = useState("1"); // Initialize currentPhase to "1"

  useEffect(() => {
    if (!token) return;

    fetch("https://marvel-flix-c3644575f8db.herokuapp.com/movies", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((moviesData) => {
        const formattedMovies = moviesData.map((movie) => ({
          _id: movie._id,
          Title: movie.Title,
          Description: movie.Description,
          ImagePath: movie.ImagePath,
          Phase: movie.Phase,
          Featured: movie.Featured,
          Genre: {
            Name: movie.Genre.Name,
            Description: movie.Genre.Description,
          },
          Director: {
            Name: movie.Director.Name,
            Bio: movie.Director.Bio,
            Birth: movie.Director.Birth,
            Death: movie.Director.Death,
          },
        }));

        // Set all movies initially
        setMovies(formattedMovies);

        // Filter movies based on initial phase (Phase 1)
        const initialFilteredMovies = formattedMovies.filter(
          (movie) => movie.Phase === currentPhase
        );
        setFilteredMovies(initialFilteredMovies);
      })
      .catch((error) => {
        console.error("Error fetching movies:", error);
      });
  }, [token, currentPhase]); // Add currentPhase to dependency array

  const handleSearch = (query) => {
    setSearchQuery(query); // Update searchQuery state

    // Filter movies based on search query
    const filtered = movies.filter((movie) =>
      movie.Title.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredMovies(filtered);
  };

  const handlePhaseChange = (phase) => {
    setCurrentPhase(phase);

    // Filter movies based on selected phase
    const filtered = movies.filter((movie) => movie.Phase === phase);
    setFilteredMovies(filtered);
  };

  const mainContentStyle = {
    paddingTop: "70px", // Add padding to avoid content being hidden behind the navbar
  };

  const handleLogout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  };

  return (
    <BrowserRouter>
      {user && token && (
        <NavigationBar onLogout={handleLogout} onSearch={handleSearch} />
      )}
      <Row className="justify-content-md-center" style={mainContentStyle}>
        <Routes>
          <Route
            path="/signup"
            element={
              user ? (
                <Navigate to="/" />
              ) : (
                <Col md={5}>
                  <SignupView />
                </Col>
              )
            }
          />
          <Route
            path="/login"
            element={
              user ? (
                <Navigate to="/" />
              ) : (
                <Col md={5}>
                  <LoginView
                    onLoggedIn={(user, token) => {
                      setUser(user);
                      setToken(token);
                      localStorage.setItem("user", JSON.stringify(user));
                      localStorage.setItem("token", token);
                    }}
                  />
                </Col>
              )
            }
          />
          <Route
            path="/movies"
            element={
              !user ? (
                <Navigate to="/login" replace />
              ) : (
                <div className="d-flex flex-column align-items-center">
                  <div className="phase-buttons mb-3">
                    {[...Array(6)].map((_, index) => (
                      <Button
                        key={index + 1}
                        onClick={() => handlePhaseChange(`${index + 1}`)}
                        className="phase-button mx-2" // Add mx-2 for horizontal space between buttons
                        variant={currentPhase === `${index + 1}` ? "primary" : "secondary"} // Highlight active phase button
                      >
                        Phase {index + 1}
                      </Button>
                    ))}
                  </div>
                  {filteredMovies.length === 0 ? (
                    <Col>The list is empty!</Col>
                  ) : (
                    <ControlledCarousel movies={filteredMovies} />
                  )}
                </div>
              )
            }
          />
          <Route
            path="/movies/:movieId"
            element={
              !user ? (
                <Navigate to="/login" replace />
              ) : (
                <Col md={8}>
                  <MovieView movies={movies} />
                </Col>
              )
            }
          />
          <Route
            path="/users/profile"
            element={
              !user ? (
                <Navigate to="/login" replace />
              ) : (
                <ProfileView
                  user={user}
                  movies={movies} // Pass movies array
                  onAccountUpdate={(updatedUser) => setUser(updatedUser)}
                  onFavouritesUpdate={(updatedUser) => setUser(updatedUser)}
                />
              )
            }
          />
          <Route path="/" element={<Navigate to="/movies" />} />
        </Routes>
      </Row>
    </BrowserRouter>
  );
};

export default MainView;
