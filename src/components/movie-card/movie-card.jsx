import PropTypes from "prop-types";

export const MovieCard = ({ movie, onMovieClick, onAddToFavorites }) => {
  return (
    <div onClick={() => onMovieClick(movie)}
    >
      {movie.title}
    </div>
  );
}
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
  onMovieClick: PropTypes.func.isRequired,
}; 