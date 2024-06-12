import { useState, useEffect } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";
import { Row, Col } from "react-bootstrap";

const MainView = () => {
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const storedToken = localStorage.getItem("token");
  const [user, setUser] = useState(storedUser ? storedUser : null);
  const [token, setToken] = useState(storedToken ? storedToken : null);

  useEffect(() => {
    if (!token) return;

    fetch("https://marvel-flix-c3644575f8db.herokuapp.com/movies", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => response.json())
      .then((movies) => {
        setMovies(
          movies.map((movie) => ({
            id: movie._id,
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

  if (!user) {
    return (
      <Row className="justify-content-md-center">
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
        <Col md={5}>
          <SignupView />
        </Col>
      </Row>
    );
  }

  const getSimilarMovies = (movies, currentMovie) => {
    return movies.filter(
      (movie) => movie.genre.Name === currentMovie.genre.Name
    );
  };

  if (selectedMovie) {
    const similarMovies = getSimilarMovies(movies, selectedMovie);

    return (
      <Row className="justify-content-md-center">
        <Col md={8} style={{ border: "1px solid black" }}>
          <MovieView
            style={{ border: "1px solid green" }}
            movie={selectedMovie}
            onBackClick={() => setSelectedMovie(null)}
          />
        </Col>
        {similarMovies.length > 0 && (
          <Col md={8}>
            <h3>Similar Movies</h3>
            <Row className="similar-movies">
              {similarMovies.map((movie) => (
                <MovieCard
                  key={movie._id}
                  movie={movie}
                  onMovieClick={() => setSelectedMovie(movie)}
                />
              ))}
            </Row>
          </Col>
        )}
      </Row>
    );
  }

  if (movies.length === 0) {
    return (
      <Row className="justify-content-md-center">
        <Col md={8}>
          <nav>
            <button
              onClick={() => {
                setUser(null);
                setToken(null);
                localStorage.clear();
              }}
            >
              Logout
            </button>
          </nav>
          The list is empty!
        </Col>
      </Row>
    );
  }

  return (
    <Row className="justify-content-md-center">
      <Col md={8}>
        <nav>
          <button
            onClick={() => {
              setUser(null);
              setToken(null);
              localStorage.clear();
            }}
          >
            Logout
          </button>
        </nav>
        {movies.map((movie) => (
          <MovieCard
            key={movie._id}
            movie={movie}
            onMovieClick={() => {
              setSelectedMovie(movie);
            }}
          />
        ))}
      </Col>
    </Row>
  );
};

export default MainView;
