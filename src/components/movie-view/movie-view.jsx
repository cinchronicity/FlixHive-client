import "./movie-view.scss";
import { MovieCard } from "../movie-card/movie-card";
import { useEffect } from "react";
import { useParams } from "react-router-dom"; // Import useParams from react-router-dom
import { Row, Col, Container, Image } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import axios from "axios";
import PropTypes from "prop-types";

export const MovieView = ({
  movies,
  getSimilarMovies,
  user,
  token,
  setUser,
}) => {
  const { movieId } = useParams(); // Use useParams to get movieId from URL
  const movie = movies.find((m) => m.id === movieId);
  const similarMovies = getSimilarMovies(movieId); // Get similar movies based on movieId

  //POST request to add movie to users favorites
  const addToFavorites = (movieId) => {
    axios
      .post(
        `https://flixhive-cf7fbbd939d2.herokuapp.com/users/${user.username}/movies/${movieId}`,
        null,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((response) => {
        setUser(response.data);
        localStorage.setItem("user", JSON.stringify(response.data));
      })
      .catch((error) => {
        console.error("Error adding movie to favorites", error);
      });
  };

  const removeFromFavorites = (movieId) => {
    axios
      .delete(
        `https://flixhive-cf7fbbd939d2.herokuapp.com/users/${user.username}/movies/${movieId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((response) => {
        setUser(response.data);
        localStorage.setItem("user", JSON.stringify(response.data));
      })
      .catch((error) => {
        console.error("Error removing movie from favorites", error);
      });
  };

  // Scroll to top when navigating to a new movie view
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [movieId]); // Dependency on movieId ensures it's triggered on route change

  if (!movie) {
    return <div>Movie not found</div>;
  }

  return (
    <Container className="movie-view-container">
      <Button
        className="add-to-favorites-btn"
        variant="link"
        onClick={() =>
          user.favoriteMovies.includes(movie.id)
            ? removeFromFavorites(movie.id)
            : addToFavorites(movie.id)
        }
      >
        <i
          className={
            user.favoriteMovies.includes(movie.id)
              ? "bi bi-heart-fill favorited"
              : "bi bi-heart not-favorited"
          }
        ></i>
      </Button>
      <Row>
        <Col md={4}>
          <Image
            src={movie.imageURL}
            alt={movie.title}
            fluid
            className="movie-view-image"
          />
        </Col>
        <Col className="movie-details" md={8}>
          <h1 className="movie-view-title">{movie.title}</h1>
          <p className="movie-view-description">
            <strong>Description: </strong>
            {movie.description}
          </p>
          <p className="movie-view-genre">
            <strong>Genre:</strong> {movie.genre.name}
          </p>
          <p className="movie-view-director">
            <strong>Director:</strong> {movie.director.name}
          </p>
          <p className="movie-view-rating">
            <strong>Rating:</strong> {movie.rating}
          </p>
          <p className="movie-view-featured">
            <strong>Featured: </strong> {movie.featured ? "Yes" : "No"}
          </p>
          <p className="movie-view-actors">
            <strong>Actors:</strong>
            <ul>
              {movie.actors.map((actor) => (
                <li key={actor.name}>
                  {actor.name} (Born: {actor.birthYear})
                </li>
              ))}
            </ul>
          </p>
        </Col>
      </Row>
      <Link to={`/movies`}>
        <Button className="back-button" variant="dark">
          Back
        </Button>
      </Link>

      <h3>Similar Movies</h3>
      {similarMovies.length > 0 ? (
        <Row>
          {similarMovies.map((similarMovie) => (
            <Col key={similarMovie.id} xs={12} sm={6} md={4} lg={3}>
              <MovieCard movie={similarMovie} />
            </Col>
          ))}
        </Row>
      ) : (
        <p> No similar movies found.</p>
      )}
    </Container>
  );
};

MovieView.propTypes = {
  movies: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      genre: PropTypes.shape({
        name: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
      }).isRequired,
      director: PropTypes.shape({
        name: PropTypes.string.isRequired,
        bio: PropTypes.string.isRequired,
        birthYear: PropTypes.number,
        deathYear: PropTypes.number,
      }).isRequired,
      imageURL: PropTypes.string.isRequired,
      rating: PropTypes.number,
      featured: PropTypes.bool,
      actors: PropTypes.arrayOf(
        PropTypes.shape({
          name: PropTypes.string.isRequired,
          birthYear: PropTypes.number.isRequired,
        })
      ).isRequired,
    })
  ).isRequired,
  getSimilarMovies: PropTypes.func.isRequired,
  user: PropTypes.shape({
    username: PropTypes.string.isRequired,
  }).isRequired,
  token: PropTypes.string.isRequired,
  setUser: PropTypes.func.isRequired,
  addToFavorites: PropTypes.func.isRequired,
  removeFromFavorites: PropTypes.func.isRequired,
};
