import React, { useState, useEffect } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { Form, Button, Row, Col, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const ProfileView = ({
  user,
  token,
  movies,
  onUserUpdate,
  onUserDeregister,
}) => {
  const [username, setUsername] = useState(user.username);
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState(user.email);
  const [birthday, setBirthday] = useState(user.birthday);
  const navigate = useNavigate();

  // console.log("User's FavoriteMovies:", user.favoriteMovies); // Array of favorite movie IDs

  const favoriteMoviesList =
    movies && user.favoriteMovies
      ? movies.filter((m) => user.favoriteMovies.includes(m.id))
      : [];

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
        onUserUpdate(response.data); // Update user data
      })
      .catch((error) => {
        console.log("Error removing movie from favorites", error);
      });
  };
  const handleUpdate = (event) => {
    event.preventDefault();
    const updatedUser = { username, password, email, birthday };

    fetch(
      `https://flixhive-cf7fbbd939d2.herokuapp.com/users/${user.username}`,
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedUser),
      }
    )
      .then((response) => response.json())
      .then((data) => {
        alert("Profile updated successfully!");
        onUserUpdate(data); // Callback to update user info in parent component
      })
      .catch((error) => {
        console.error("Error updating profile:", error);
        alert("Something went wrong while updating your profile.");
      });
  };

  const handleDeregister = () => {
    const confirmDeregister = window.confirm(
      "Are you sure you want to delete your account?"
    );
    if (confirmDeregister) {
      fetch(`https://yourapi.com/users/${user.username}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      })
        .then(() => {
          alert("Account successfully deleted.");
          onUserDeregister(); // Callback to log out or handle user removal
          navigate("/login");
        })
        .catch((error) => {
          console.error("Error deregistering account:", error);
          alert("Something went wrong while deleting your account.");
        });
    }
  };

  return (
    <Container className= "profile-view"r>
      
        <h2>Profile Information</h2>
        <Form onSubmit={handleUpdate}>
          <Form.Group controlId="formUsername">
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group controlId="formPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Leave blank to keep unchanged"
            />
          </Form.Group>
          <Form.Group controlId="formEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group controlId="formBirthday">
            <Form.Label>Birthday</Form.Label>
            <Form.Control
              type="date"
              value={birthday}
              onChange={(e) => setBirthday(e.target.value)}
            />
          </Form.Group>
          <Button className="mt-3" variant="primary" type="submit">
            Update Profile
          </Button>
        </Form>
        <Button className="mt-3" variant="danger" onClick={handleDeregister}>
          Deregister
        </Button>
        <h3 className="mt-5">Favorite Movies</h3>
        <Row>
          {favoriteMoviesList.length > 0 ? (
            favoriteMoviesList.map((movie) => (
              <Col key={movie.id} xs={12} sm={6} md={4} lg={3}>
                <MovieCard movie={movie} />
                <Button
                  variant="danger"
                  onClick={() => removeFromFavorites(movie.id)}
                >
                  Remove from Favorites
                </Button>
              </Col>
            ))
          ) : (
            <p>No favorite movies yet!</p>
          )}
        </Row>
      
    </Container>
  );
};
