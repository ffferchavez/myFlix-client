import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate, Link } from "react-router-dom";
import { Row, Col, Button, Container, Form } from "react-bootstrap";
import NavigationBar from "../navigation-bar/navigation-bar";
import { MovieCard } from "../movie-card/movie-card";
import MovieView from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";
import { ProfileView } from "../profile-view/profile-view";
import ControlledCarousel from "../carousel-view/carousel-view";
import "../../index.scss";

const MainView = () => {
  const [movies, setMovies] = useState([]);
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const storedToken = localStorage.getItem("token");
  const [user, setUser] = useState(storedUser || null);
  const [token, setToken] = useState(storedToken || null);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [currentPhase, setCurrentPhase] = useState("1"); // Initialize currentPhase to "1"
  const [searchTerm, setSearchTerm] = useState("");

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

  const handlePhaseChange = (phase) => {
    setCurrentPhase(phase);

    // Filter movies based on selected phase
    const filtered = movies.filter((movie) => movie.Phase === phase);
    setFilteredMovies(filtered);
  };

  const handleSearchChange = (searchTerm) => {
    setSearchTerm(searchTerm);

    // Filter movies based on search term and current phase
    const results = movies.filter(
      (movie) =>
        movie.Title.toLowerCase().includes(searchTerm.toLowerCase()) &&
        movie.Phase === currentPhase
    );
    setFilteredMovies(results);
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
        <NavigationBar onLogout={handleLogout} onSearch={handleSearchChange} />
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
            path="/"
            element={
              <div className="home-background mb-4">
                <Container className="home-info">
                  <Row className="justify-content-center align-items-center text-center">
                    <Col md={12}>
                      <h1 className="mb-4">Welcome to Marvel Flix</h1>
                      <h2 className="mb-4">
                        Explore the Marvel Cinematic Universe
                      </h2>
                      <p className="mb-4">
                        Marvel-Flix is a web application that allows users to
                        browse and view information about movies in the Marvel
                        Cinematic Universe. You can explore a list of Marvel
                        movies with detailed information about each movie,
                        including its title, description, genre, director, and
                        more.
                      </p>
                      <p className="mb-4">
                        The application provides features such as searching for
                        movies by title, viewing detailed information about a
                        specific movie, user authentication and authorization,
                        and the ability for users to mark movies as their
                        favorites and view their favorite movies on their
                        profile page.
                      </p>
                      <p className="mb-4">
                        Get started by exploring our collection of movies and
                        dive into the world of Marvel superheroes and stories.
                      </p>
                    </Col>
                    <Col md={6} className="text-center">
                      <Button variant="secondary">
                        <Link
                          to="/movies"
                          style={{ textDecoration: "none", color: "white" }}
                        >
                          Go to Movies
                        </Link>
                      </Button>
                    </Col>
                  </Row>
                </Container>
              </div>
            }
          />
          <Route
            path="/movies"
            element={
              !user ? (
                <Navigate to="/login" replace />
              ) : (
                <Container className="mb-5">
                  <Row>
                    {searchTerm ? (
                      filteredMovies.length > 0 ? (
                        filteredMovies.map((movie) => (
                          <Col
                            key={movie._id}
                            xs={12}
                            sm={6}
                            md={4}
                            className="d-flex justify-content-center mb-4"
                          >
                            <MovieCard movie={movie} />
                          </Col>
                        ))
                      ) : (
                        <Col>The list is empty!</Col>
                      )
                    ) : movies.length > 0 ? (
                      [...movies]
                        .sort((a, b) => a.Phase - b.Phase)
                        .map((movie) => (
                          <Col
                            key={movie._id}
                            xs={12}
                            sm={6}
                            md={4}
                            className="d-flex justify-content-center mb-4"
                          >
                            <MovieCard movie={movie} />
                          </Col>
                        ))
                    ) : (
                      <Col>The list is empty!</Col>
                    )}
                  </Row>
                </Container>
              )
            }
          />
          <Route
            path="/carousel"
            element={
              !user ? (
                <Navigate to="/login" replace />
              ) : (
                <div className="d-flex flex-column align-items-center">
                  <h1 style={{ color: "white" }}>
                    Movies filtered by Marvel Phases
                  </h1>
                  <div className="phase-buttons">
                    {[...Array(6)].map((_, index) => (
                      <Button
                        key={index + 1}
                        onClick={() => handlePhaseChange(`${index + 1}`)}
                        className="phase-button mx-2"
                        variant={
                          currentPhase === `${index + 1}`
                            ? "primary"
                            : "secondary"
                        }
                      >
                        Phase {index + 1}
                      </Button>
                    ))}
                  </div>
                  <ControlledCarousel movies={filteredMovies} />
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
                  onFavoritesUpdate={(updatedUser) => setUser(updatedUser)}
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
