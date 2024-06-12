import { useState, useEffect } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";
import { Button, Row, Col } from "react-bootstrap";

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
            //CHECK FOR MORE PROPS LATER..
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
        <Col md={8}>
          <MovieView
            movie={selectedMovie}
            onBackClick={() => setSelectedMovie(null)}
          />
        </Col>
        {similarMovies.length > 0 && (
          <Col md={12}>
            <h3>Similar Movies</h3>
            <Row>
              {similarMovies.map((movie, index) => (
                <Col key={index} xs={6} sm={4} md={3} lg={2} className="mb-4">
                  <MovieCard
                    movie={movie}
                    onMovieClick={() => setSelectedMovie(movie)}
                  />
                </Col>
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
        <nav>
          <Button
            onClick={() => {
              setUser(null);
              setToken(null);
              localStorage.clear();
            }}
          >
            Logout
          </Button>
        </nav>
        The list is empty!
      </Row>
    );
  }

  return (
    <Row className="justify-content-md-center">
      <nav>
        <Button
          onClick={() => {
            setUser(null);
            setToken(null);
            localStorage.clear();
          }}
        >
          Logout
        </Button>
      </nav>

      <Row>
        {movies.map((movie) => (
          <Col className="mb-5 mt-5" key={movie._id} md={3}>
            <MovieCard
              movie={movie}
              onMovieClick={() => {
                setSelectedMovie(movie);
              }}
            />
          </Col>
        ))}
      </Row>
    </Row>
  );
};

export default MainView;
