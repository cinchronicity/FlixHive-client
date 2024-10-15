export const MovieCard = ({ movie, onMovieClick, onAddToFavorites }) => {
  return (
    <div onClick={() => onMovieClick(movie)}
    >
      {movie.title}
    </div>
  );
}
  // return (
  //   <div onClick={() => onMovieClick(movie)}>
  //     <h2>{movie.title}</h2>
  //     <img src={movie.imageURL} alt={movie.title} />
  //     <button onClick={() => onAddToFavorites(movie)}>
  //       {movie.isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
  //     </button>
  //   </div>
  // );
  //};
