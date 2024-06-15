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
    <Container>
      <Row>
        <Col md={6}>
          <h2>Account Information</h2>
          <AccountDetails user={user} onAccountUpdate={onAccountUpdate} />
        </Col>
      </Row>
      <Row>
        <Col md={12}>
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
