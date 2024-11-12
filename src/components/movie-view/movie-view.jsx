import "./movie-view.scss";

export const MovieView = ({ movie, onBackClick }) => {
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

      <div className="movie-buttons">
        <button onClick={onBackClick} className="back-button">
          Back
        </button>
      </div>
    </div>
  );
};
