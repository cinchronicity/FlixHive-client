import "./movie-view.scss";
import { MovieCard } from "../movie-card/movie-card";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"; // Import useParams from react-router-dom
import { Row, Col, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import axios from "axios";

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
        console.log("Successfully added to favorites:", response.data);
        setUser(response.data);
        localStorage.setItem("user", JSON.stringify(response.data));
      })
      .catch((error) => {
        console.log("Error adding movie to favorites", error);
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
        console.log("Successfully removed from favorites:", response.data);
        setUser(response.data);
        localStorage.setItem("user", JSON.stringify(response.data));
      })
      .catch((error) => {
        console.log("Error removing movie from favorites", error);
      });
  };

  // GET request to get user data from API
  axios
    .get(`https://flixhive-cf7fbbd939d2.herokuapp.com/users/${user.username}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((response) => {
      console.log("User API response:", response.data);
    });

  // Scroll to top when navigating to a new movie view
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [movieId]); // Dependency on movieId ensures it's triggered on route change

  if (!movie) {
    return <div>Movie not found</div>;
  }

  return (
    <Container>
      <div className="movie-view">
        <div className="movie-title">
          <h1>{movie.title}</h1>
        </div>
        <div className="movie-description">
          <p>
            <strong>Description: </strong>
            {movie.description}
          </p>
        </div>
        <div className="movie-genre">
          <p>
            <strong>Genre:</strong> {movie.genre.name}
          </p>
        </div>
        <div className="movie-director">
          <p>
            <strong>Director:</strong> {movie.director.name}
          </p>
        </div>
        <div className="movie-rating">
          <p>
            <strong>Rating:</strong> {movie.rating}
          </p>
        </div>
        <div className="featured">
          <strong> Featured: </strong> {movie.featured ? "Yes" : "No"}
        </div>
        <div className="movie-image">
          <img src={movie.imageURL} alt={movie.title} />
        </div>
        <Link to={`/movies`}>
          <Button className= "back-button" variant="link">
            Back
          </Button>
        </Link>
        <Button className="favorite-button"
          variant={
            user.favoriteMovies.includes(movie.id) ? "danger" : "primary"
          }
          onClick={() =>
            user.favoriteMovies.includes(movie.id)
              ? removeFromFavorites(movie.id)
              : addToFavorites(movie.id)
          }
        >
          {user.favoriteMovies.includes(movie.id)
            ? "Remove from Favorites"
            : "Add to Favorites"}
        </Button>
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
      </div>
    </Container>
  );
};
