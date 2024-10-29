import React, { useState } from 'react'; 
import { MovieView } from "../movie-view/movie-view.jsx";
import { MovieCard } from "../movie-card/movie-card.jsx"; 
import { useState, useEffect } from "react";
import { LoginView } from "../login-view/login-view.jsx";
import { SignupView } from "../signup-view/signup-view.jsx";


export const MainView = () => {
  const [movies, setMovies] = useState([]); 
  
  const [selectedMovie, setSelectedMovie] = useState(null);

  const storedUser = JSON.parse(localStorage.getItem("user"));
  const storedToken = localStorage.getItem("token"); 

  const [user, setUser] = useState(storedUser? storedUser : null);

  const [token, setToken] = useState(storedToken? storedToken : null); 
  
 

  useEffect(() => {
    if (!token) {
      return;
    }
    fetch("https://flixhive-cf7fbbd939d2.herokuapp.com/movies", {
      headers: {Authorization: 'Bearer ${token}'},
    })
      .then((response) => response.json())
      .then((movies) => {
        setMovies(movies);

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
    }, [token]); //second argument to useEffect tells React when to run the effect

    if (!user) {
      return (
        <>
        <LoginView 
        onLoggedIn={(user, token) => {
          setUser(user);
          setToken(token);
        }}
        />
        or 
        <SignupView />
        </>
        );
    };

   
      

    //get similar movies based on genre, excluding the movie that is currently being viewed
    const getSimilarMovies = (genre) => {
      return movies.filter((movie) => movie.genre.name === genre.name &&movie.id !== selectedMovie.id);
    };
    
     if (selectedMovie) {
      const similarMovies = getSimilarMovies(selectedMovie.genre);
      return (
        <div>
        <button onClick={() => { setUser(null); setToken(null); localStorage.clear(); }}>Logout</button>         
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
        <button onClick={() => { setUser(null); setToken(null); localStorage.clear(); }}>Logout</button>
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} onMovieClick= {(newSelectedMovie) => { setSelectedMovie(newSelectedMovie)}} />
        ))}
      </div>
  
    );
  };
  


