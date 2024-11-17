import "./movie-view.scss";
import { MovieCard } from "../movie-card/movie-card";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"; // Import useParams from react-router-dom
import { Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";

export const MovieView = ({ movies, getSimilarMovies }) => {
  const { movieId } = useParams(); // Use useParams to get movieId from URL
  const movie = movies.find((m) => m.id === movieId);
  const similarMovies = getSimilarMovies(movieId); // Get similar movies based on movieId

  // Scroll to top when navigating to a new movie view
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [movieId]); // Dependency on movieId ensures it's triggered on route change

  if (!movie) {
    return <div>Movie not found</div>;
  }
  //TODO: add this code if you want to scroll to top when back button is clicked
  // const handleBackClick = () => {
  //   console.log("Scrolling to top from MovieView back button");
  //   window.scrollTo(0, 0);
  // };

  return (
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
        <Button className="back-button" variant="link">
          Back
        </Button>
        {/* <button className="back-button"
         onClick={handleBackClick} >Back</button> */}
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
    </div>
  );
};
