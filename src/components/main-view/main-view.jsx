import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Row, Col } from "react-bootstrap";
import NavigationBar from "../navigation-bar/navigation-bar";
import { MovieCard } from "../movie-card/movie-card";
import MovieView from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";
import { ProfileView } from "../profile-view/profile-view";

const MainView = () => {
  const [movies, setMovies] = useState([]);
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const storedToken = localStorage.getItem("token");
  const [user, setUser] = useState(storedUser || null);
  const [token, setToken] = useState(storedToken || null);
  const [selectedMovieId, setSelectedMovieId] = useState(null);

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
      })
      .catch((error) => {
        console.error("Error fetching movies:", error);
      });
  }, [token]);

  return (
    <BrowserRouter>
      <NavigationBar
        onLogout={() => {
          setUser(null);
          setToken(null);
          localStorage.removeItem("user");
          localStorage.removeItem("token");
        }}
      />
      <Row className="justify-content-md-center">
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
              ) : movies.length === 0 ? (
                <Col>The list is empty!</Col>
              ) : (
                <>
                  {movies.map((movie) => (
                    <Col className="mb-5 mt-5" key={movie._id} md={3}>
                      <MovieCard
                        movie={movie}
                        onMovieClick={() => setSelectedMovieId(movie._id)}
                      />
                    </Col>
                  ))}
                </>
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
