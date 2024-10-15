import React, { useState } from 'react';
import { MovieView } from "../movie-view/movie-view.jsx";
import { MovieCard } from "../movie-card/movie-card.jsx";



export const MainView = () => {
  const [movies, setMovies] = useState([
    {
      id: 1,
      // _id: { $oid: "66eba2147975e361d42967e6" },
      title: "Inception",
      description: "A skilled thief is given a chance at redemption if he can successfully perform an inception by planting an idea in a target's mind.",
      genre: { name: "Sci-Fi", description: "Science fiction films often explore futuristic concepts." },
      director: {
        name: "Christopher Nolan",
        bio: "Christopher Nolan is a British-American filmmaker known for making thought-provoking, visually stunning films.",
        birthYear: { $numberInt: "1970" },
        deathYear: null
      },
      rating: { $numberDouble: "8.8" },
      imageURL: "https://example.com/inception.jpg",
      featured: true,
      actors: [{ $oid: "66f1fd9db3b2033c0957ef1c" }, { $oid: "66f1fd9db3b2033c0957ef1d" }]
    },
    {
      id: 2,
      title: "The Matrix",
      description: "A computer hacker learns from mysterious rebels about the true nature of his reality and his role in the war against its controllers.",
      genre: { name: "Sci-Fi", description: "Science fiction films often explore futuristic concepts." },
      director: {
        name: "Lana Wachowski, Lilly Wachowski",
        bio: "The Wachowskis are American film and TV directors, writers, and producers.",
        birthYear: { $numberInt: "1965" },
        deathYear: null
      },
      rating: { $numberDouble: "8.7" },
      imageURL: "https://example.com/matrix.jpg",
      featured: true,
      actors: [{ $oid: "66f1fd9db3b2033c0957ef1e" }, { $oid: "66f1fd9db3b2033c0957ef1f" }]
    },
    {
      id: 3,
      title: "Interstellar",
      description: "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival.",
      genre: { name: "Sci-Fi", description: "Science fiction films often explore futuristic concepts." },
      director: {
        name: "Christopher Nolan",
        bio: "Christopher Nolan is a British-American filmmaker known for making thought-provoking, visually stunning films.",
        birthYear: { $numberInt: "1970" },
        deathYear: null
      },
      rating: { $numberDouble: "8.6" },
      imageURL: "https://example.com/interstellar.jpg",
      featured: true,
      actors: [{ $oid: "66f1fd9db3b2033c0957ef20" }, { $oid: "66f1fd9db3b2033c0957ef21" }]
    }
  ]);

  const [selectedMovie, setSelectedMovie] = useState(null);

 
     if (selectedMovie) {
      return <MovieView movie={selectedMovie} onBackClick={() => setSelectedMovie(null)} />;
     
    }
    if (movies.length === 0) return <div className="main-view">The list is empty!</div>;
    return (
      <div className="main-view">
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} onMovieClick= {(newSelectedMovie) => { setSelectedMovie(newSelectedMovie)}} />
        ))}
      </div>
    );
  };
  


