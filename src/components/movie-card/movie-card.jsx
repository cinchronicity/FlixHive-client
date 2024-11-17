import PropTypes from "prop-types";
import { Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./movie-card.scss";

//add onAddToFavorites prop to MovieCard component later
export const MovieCard = ({ movie }) => {
  return (
    <Card
      className="h-100 movie-card-container"
    >
      <Card.Img variant="top" src={movie.imageURL} />
      <Card.Body>
        <Card.Title>{movie.title}</Card.Title>
        <Card.Text>{movie.description}</Card.Text>
        <Link to={`/movies/${encodeURIComponent(movie.id)}`}>
          <Button variant="link">Open</Button>
        </Link>
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
};
