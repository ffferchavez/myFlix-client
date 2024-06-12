import { useState } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";

const MainView = () => {
  const [movies, setMovies] = useState([
    {
      id: 1,
      title: "Inception",
      description:
        "A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea in the mind of a CEO.",
      genre: "Action, Science Fiction",
      director: "Christopher Nolan",
      imageUrl:
        "https://images-na.ssl-images-amazon.com/images/I/51InjRPaF7L._SX377_BO1,204,203,200_.jpg",
    },
    {
      id: 2,
      title: "The Shawshank Redemption",
      description:
        "Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.",
      genre: "Drama",
      director: "Frank Darabont",
      imageUrl: "https://example.com/shawshank-redemption-poster.jpg",
    },
    {
      id: 3,
      title: "The Godfather",
      description:
        "The aging patriarch of an organized crime dynasty transfers control of his clandestine empire to his reluctant son.",
      genre: "Crime, Drama",
      director: "Francis Ford Coppola",
      imageUrl: "https://example.com/the-godfather-poster.jpg",
    },
  ]);

  const [selectedMovie, setSelectedMovie] = useState(null);

  if (selectedMovie) {
    const similarMovies = getSimilarMovies(movies, selectedMovie);

    return (
      <div>
        <MovieView
          movie={selectedMovie}
          onBackClick={() => setSelectedMovie(null)}
        />
        {similarMovies.length > 0 && (
          <div>
            <h3>Similar Movies</h3>
            <div className="similar-movies">
              {similarMovies.map((movie) => (
                <MovieCard
                  key={movie._id}
                  movie={movie}
                  onMovieClick={() => setSelectedMovie(movie)}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    );
  }

  if (movies.length === 0) {
    return (
      <div>
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
      </div>
    );
  }

  return (
    <div>
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
    </div>
  );
};

export default MainView;
