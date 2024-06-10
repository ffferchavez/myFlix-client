import { useState, useEffect } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";

const MainView = () => {
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);

  useEffect(() => {
    fetch("https://marvel-flix-c3644575f8db.herokuapp.com/movies")
      .then((response) => response.json())
      .then((data) => {
        setMovies(
          data.map((movie) => ({
            id: movie.id,
            title: movie.Title,
            description: movie.Description,
            genre: movie.Genre,
            director: movie.Director,
            imagePath: movie.ImagePath,
            featured: movie.Featured,
          }))
        );
      });
  }, []);

  const getSimilarMovies = (movies, currentMovie) => {
    return movies.filter(
      (movie) => movie.genre.Name === currentMovie.genre.Name
    );
  };

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
                  key={movie.id}
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
    return <div>The list is empty!</div>;
  }

  return (
    <div>
      {movies.map((movie) => (
        <MovieCard
          key={movie.id}
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
