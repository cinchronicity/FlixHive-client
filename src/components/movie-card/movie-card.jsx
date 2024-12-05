import PropTypes from "prop-types";
import { Button, Card, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./movie-card.scss";

export const MovieCard = ({ movie, showRemoveButton, onRemove }) => {
  return (
    <Card className="h-100 movie-card">
      <Card.Img variant="top" src={movie.imageURL} className="movie-card-img" />
      <Card.Body className="movie-card-body">
        <Card.Title>{movie.title}</Card.Title>
        <Card.Text className="movie-card-description">
          {movie.description}{" "}
        </Card.Text>
        <Link to={`/movies/${encodeURIComponent(movie.id)}`}>
          <Button variant="warning" className="more-details-btn">
            Details
          </Button>
        </Link>
        {showRemoveButton && (
          <Col className="d-flex justify-content-center">
            <Button
              variant="outline-danger"
              size="sm"
              className=" remove-favorites-btn mt-2 "
              onClick={() => onRemove(movie.id)}
            >
              Remove from Favorites
            </Button>
          </Col>
        )}
      </Card.Body>
    </Card>
  );
};
//define all the prop types that the component will use
//this will help catch bugs and make sure component recieves the correct data structure
MovieCard.propTypes = {
  movie: PropTypes.shape({
    title: PropTypes.string,
    description: PropTypes.string,
    genre: PropTypes.shape({
      name: PropTypes.string,
      description: PropTypes.string,
    }),
    director: PropTypes.shape({
      name: PropTypes.string,
      bio: PropTypes.string,
      birthYear: PropTypes.number,
      deathYear: PropTypes.number,
    }),
    imageURL: PropTypes.string,
    rating: PropTypes.number,
    featured: PropTypes.bool,
    actors: PropTypes.array,
  }).isRequired,
  showRemoveButton: PropTypes.bool,
  onRemove: PropTypes.func,
};
