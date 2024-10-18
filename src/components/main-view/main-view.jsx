import React, { useState } from 'react';
import { MovieView } from "../movie-view/movie-view.jsx";
import { MovieCard } from "../movie-card/movie-card.jsx";
import { useState, useEffect } from "react";



export const MainView = () => {
  const [movies, setMovies] = useState([]); 
  
  const [selectedMovie, setSelectedMovie] = useState(null);

  useEffect(() => {
    fetch("https://flixhive-cf7fbbd939d2.herokuapp.com/movies")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        const moviesFromApi = data.map((doc =>{
          return {
            id: doc._id,
            title: doc.title,
            description: doc.description,
            genre: {
              name: doc.genre.name,
              description: doc.genre.description,
            },
            director: {
              name: doc.director.name,
              bio: doc.director.bio,
              birthYear: doc.director.birthYear,
              deathYear: doc.director.deathYear,
            },
            imageURL: doc.imageURL,
            rating: doc.rating,
            featured: doc.featured,
            actors: doc.actors
          }
        }))
       setMovies(moviesFromApi);
      })
      .catch((error) => {
        console.error("Error fetching movies:", error);
      });
    }, []);
 //get similar movies based on genre, excluding the movie that is currently being viewed
    const getSimilarMovies = (genre) => {
      return movies.filter((movie) => movie.genre.name === genre.name &&movie.id !== selectedMovie.id);
    };
    
     if (selectedMovie) {
      const similarMovies = getSimilarMovies(selectedMovie.genre);
      return (
        <div>
      <MovieView movie={selectedMovie} onBackClick={() => setSelectedMovie(null)} />
        <hr />
            <h3>Similar Movies</h3>
      
        <div className="similar-movies">
          {similarMovies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} onMovieClick={(newSelectedMovie) => setSelectedMovie(newSelectedMovie)} />
          ))}
        </div>
      </div>
      );
    };

    if (movies.length === 0) return <div className="main-view">The list is empty!</div>;
    return (
      <div className="main-view">
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} onMovieClick= {(newSelectedMovie) => { setSelectedMovie(newSelectedMovie)}} />
        ))}
      </div>
    );
  };
  


