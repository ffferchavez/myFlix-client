import { AccountDetails } from "./account-details";
import { FavouriteMovies } from "./favourite-movies";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

export const ProfileView = ({
  user,
  movies = [], // Default to an empty array if movies is undefined
  onAccountUpdate,
  onFavouritesUpdate,
}) => {
  const favouriteMovieList =
    movies && user.FavouriteMovies
      ? movies.filter((m) => user.FavouriteMovies.includes(m._id))
      : [];

  return (
    <Container
      className="d-flex justify-content-center align-items-center"
      style={{ minHeight: "100vh" }}
    >
      <Row className="w-100">
        <Col md={6} className="mx-auto">
          <AccountDetails user={user} onAccountUpdate={onAccountUpdate} />
          <FavouriteMovies
            favouriteMovieList={favouriteMovieList}
            user={user}
            onFavouritesUpdate={onFavouritesUpdate}
          />
        </Col>
      </Row>
    </Container>
  );
};
