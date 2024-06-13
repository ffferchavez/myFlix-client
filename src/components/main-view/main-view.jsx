import { useState, useEffect } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";
import { Button, Row, Col } from "react-bootstrap";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  Link,
  useParams,
} from "react-router-dom";
import NavigationBar from "../navigation-bar/navigation-bar";

const MainView = () => {
  const { id } = useParams();
  const [movies, setMovies] = useState([]);
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const storedToken = localStorage.getItem("token");
  const [user, setUser] = useState(storedUser ? storedUser : null);
  const [token, setToken] = useState(storedToken ? storedToken : null);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [similarMovies, setSimilarMovies] = useState([]);

  useEffect(() => {
    if (!token) return;

    fetch("https://marvel-flix-c3644575f8db.herokuapp.com/movies", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => response.json())
      .then((movies) => {
        setMovies(
          movies.map((movie) => ({
            _id: movie._id,
            title: movie.Title,
            description: movie.Description,
            genre: movie.Genre,
            director: movie.Director,
            imagePath: movie.ImagePath,
            featured: movie.Featured,
          }))
        );
      });
  }, [token]);

  useEffect(() => {
    if (!token || !id) return;

    const fetchMovieData = async () => {
      try {
        const response = await fetch(
          `https://marvel-flix-c3644575f8db.herokuapp.com/movies/${id}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        const movieData = await response.json();
        setSelectedMovie(movieData);

        const similarMoviesResponse = await fetch(
          `https://marvel-flix-c3644575f8db.herokuapp.com/movies/${id}/similar`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        const similarMoviesData = await similarMoviesResponse.json();
        setSimilarMovies(similarMoviesData);
      } catch (error) {
        console.error("Error fetching movie data:", error);
      }
    };

    fetchMovieData();
  }, [token, id]);

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
              <>
                {user ? (
                  <Navigate to="/" />
                ) : (
                  <Col md={5}>
                    <SignupView />
                  </Col>
                )}
              </>
            }
          />
          <Route
            path="/login"
            element={
              <>
                {user ? (
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
                )}
              </>
            }
          />
          <Route
            path="/movies"
            element={
              <>
                {!user ? (
                  <Navigate to="/login" replace />
                ) : movies.length === 0 ? (
                  <Col>The list is empty!</Col>
                ) : (
                  <>
                    {movies.map((movie) => (
                      <Col className="mb-5 mt-5" key={movie._id} md={3}>
                        <Link to={`/movies/${id}`}>
                          <MovieCard movie={movie} />
                        </Link>
                      </Col>
                    ))}
                  </>
                )}
              </>
            }
          />
          <Route
            path="/movies/:id"
            element={
              <>
                {!user ? (
                  <Navigate to="/login" replace />
                ) : (
                  <Col md={8}>
                    {selectedMovie && (
                      <MovieView
                        movie={selectedMovie}
                        similarMovies={similarMovies}
                      />
                    )}
                  </Col>
                )}
              </>
            }
          />
          <Route path="/" element={<Navigate to="/movies" />} />
        </Routes>
      </Row>
    </BrowserRouter>
  );
};

export default MainView;
