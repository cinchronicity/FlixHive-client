import React, { useState, useEffect } from "react";
import { MovieView } from "../movie-view/movie-view.jsx";
import { MovieCard } from "../movie-card/movie-card.jsx";
import { LoginView } from "../login-view/login-view.jsx";
import { SignupView } from "../signup-view/signup-view.jsx";
import { NavigationBar } from "../navigation-bar/navigation-bar.jsx";
import { ProfileView } from "../profile-view/profile-view.jsx";
import { Row, Col, Form, InputGroup } from "react-bootstrap";
import "../movie-card/movie-card.scss";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import axios from "axios";
import "./main-view.scss";
import "../login-view/login-view.scss";

export const MainView = () => {
  const [movies, setMovies] = useState([]);
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const storedToken = localStorage.getItem("token");
  const [user, setUser] = useState(storedUser ? storedUser : null);
  const [token, setToken] = useState(storedToken ? storedToken : null);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    if (!token) return;

    axios
      .get("https://flixhive-cf7fbbd939d2.herokuapp.com/movies", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        const moviesFromApi = response.data.map((doc) => ({
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
          actors: doc.actors,
        }));
        setMovies(moviesFromApi);
      })
      .catch((error) => {
        console.error("Error fetching movies:", error);
      });
  }, [token]);

  const handleLogout = () => {
    setUser(null);
    setToken(null);
    localStorage.clear();
  };

  const getSimilarMovies = (movieId) => {
    const currentMovie = movies.find((movie) => movie.id === movieId);
    if (!currentMovie) return [];
    // Filter movies by genre and exclude the current movie
    return movies.filter(
      (movie) =>
        movie.genre.name === currentMovie.genre.name && movie.id !== movieId
    );
  };
  const handleUserUpdate = (updatedUser) => {
    setUser(updatedUser);
    localStorage.setItem("user", JSON.stringify(updatedUser));
  };

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };
  const filteredMovies = movies.filter((movie) =>
    movie.title.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <BrowserRouter>
      <NavigationBar user={user} onLoggedOut={handleLogout} />
      <div className="main-content">
        <Routes>
          {!user ? (
            <>
              <Route
                path="/login"
                element={
                  <Row className="justify-content-md-center">
                    <Col md={5}>
                      <LoginView
                        onLoggedIn={(user, token) => {
                          setUser(user);
                          setToken(token);
                        }}
                      />
                    </Col>
                  </Row>
                }
              />
              <Route path="/signup" element={<SignupView />} />
              <Route path="*" element={<Navigate to="/login" />} />
            </>
          ) : (
            <>
              <Route
                path="/movies"
                element={
                  <>
                    <Form className="filter-form mb-4">
                      <Form.Group controlId="filter">
                        <Form.Label className="form-label-dark"></Form.Label>
                        <InputGroup>
                          <InputGroup.Text>
                            <i className="bi bi-search"></i>{" "}
                          
                          </InputGroup.Text>
                          <Form.Control
                            type="text"
                            placeholder="Start typing to filter..."
                            value={filter}
                            onChange={handleFilterChange}
                            className="form-control-dark"
                          />
                        </InputGroup>
                      </Form.Group>
                    </Form>
                    <Row>
                      {filteredMovies.map((movie) => (
                        <Col
                          className="mb-5"
                          key={movie.id}
                          xs={12}
                          sm={6}
                          md={4}
                          lg={3}
                        >
                          <MovieCard movie={movie} />
                        </Col>
                      ))}
                    </Row>
                  </>
                }
              />
              <Route
                path="/movies/:movieId"
                element={
                  movies.length === 0 ? (
                    <div>Loading...</div>
                  ) : (
                    <MovieView
                      movies={movies} // pass movies array as prop
                      getSimilarMovies={getSimilarMovies}
                      user={user}
                      setUser={setUser}
                      token={token}
                    />
                  )
                }
              />
              <Route
                path="/profile"
                element={
                  <ProfileView
                    user={user}
                    movies={movies}
                    token={token}
                    handleUserUpdate={handleUserUpdate}
                    onUserDeregister={handleLogout}
                  />
                }
              />
              <Route path="/" element={<Navigate to="/movies" />} />
              <Route path="*" element={<Navigate to="/" />} />
            </>
          )}
        </Routes>
      </div>
    </BrowserRouter>
  );
};
