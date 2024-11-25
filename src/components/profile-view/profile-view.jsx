import React, { useState } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { Form, Button, Row, Col, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const ProfileView = ({
  user,
  token,
  movies,
  handleUserUpdate,
  onUserDeregister,
}) => {
  const [username, setUsername] = useState(user.username);
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState(user.email);
  const [birthdate, setBirthdate] = useState(user.birthdate);
  const navigate = useNavigate();

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
        handleUserUpdate(response.data); // Update user data
      })
      .catch((error) => {
        console.error("Error removing movie from favorites", error);
      });
  };
  
  const handleUpdate = (event) => {
    event.preventDefault();
    const updatedUser = { username, email, birthdate };
    if (password) {
      updatedUser.password = password;
    }
      

    axios
      .put(`https://flixhive-cf7fbbd939d2.herokuapp.com/users/${user.username}`, updatedUser, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        alert("Profile updated successfully!");
        onUserUpdate(response.data); // Callback to update user info in parent component
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
      axios
        .delete(`https://flixhive-cf7fbbd939d2.herokuapp.com/users/${user.username}`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then(() => {
          alert("Account successfully deleted.");
          onUserDeregister(); // Callback to log out or handle user removal
          navigate("/login");
        })
        .catch((error) => {
          console.error("Error deleting account:", error);
          alert("Something went wrong while deleting your account.");
        });
    }
  };

 

  return (
    <Container className= "profile-view">
      
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
              value={birthdate}
              onChange={(e) => setBirthdate(e.target.value)}
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
