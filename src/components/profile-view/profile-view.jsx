import React, { useState } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { Form, Button, Row, Col, Container, Carousel } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import PropTypes from "prop-types";
import "../login-view/login-view.scss";
import "./profile-view.scss";

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
  const [birthdate, setBirthdate] = useState(
    user.birthdate ? new Date(user.birthdate).toISOString().split("T")[0] : ""
  );
  const navigate = useNavigate();

  const favoriteMoviesList =
    movies && user.favoriteMovies
      ? movies.filter((m) => user.favoriteMovies.includes(m.id))
      : [];

  const removeFromFavorites = (movieId) => {
    axios
      .delete(
        `https://flixhive-cf7fbbd939d2.herokuapp.com/users/${username}/movies/${movieId}`,
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
      .put(
        `https://flixhive-cf7fbbd939d2.herokuapp.com/users/${username}`,
        updatedUser,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((response) => {
        alert("Profile updated successfully!");
        handleUserUpdate(response.data); // Callback to update user info in parent component
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
        .delete(
          `https://flixhive-cf7fbbd939d2.herokuapp.com/users/${username}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        )
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
    <Container className="profile-view-container">
      <Row className="justify-content-center mx-auto">
        <Col xs={12} md={8} lg={6}>
          <Form className="profile-form" onSubmit={handleUpdate}>
            <h2 className="text-center mb-4">Profile Information</h2>
            <Form.Group controlId="formUsername">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                className="form-control-dark"
              />
            </Form.Group>
            <Form.Group controlId="formPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="*current-password*"
                className="form-control-dark"
              />
            </Form.Group>
            <Form.Group controlId="formEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="form-control-dark"
              />
            </Form.Group>
            <Form.Group controlId="formBirthday">
              <Form.Label>Birthday</Form.Label>
              <Form.Control
                type="date"
                value={birthdate}
                onChange={(e) => setBirthdate(e.target.value)}
                className="form-control-dark"
              />
            </Form.Group>
            <Row>
              <Col>
                <Button variant="warning" type="submit" className=" mt-4">
                  Update Profile
                </Button>
                <Col className="d-flex justify-content-end">
                  <Button
                    variant="outline-danger btn-sm"
                    type="button"
                    className=" mt-3 mr-3"
                    onClick={handleDeregister}
                  >
                    Deregister
                  </Button>
                </Col>
              </Col>
            </Row>
          </Form>
        </Col>
      </Row>
      <h3 className="mt-3 mb-4">Favorite Movies</h3>
      <Row className="mb-4">
        {favoriteMoviesList.length > 0 ? (
          favoriteMoviesList.map((movie) => (
            <Col key={movie.id} xs={12} sm={6} md={4} lg={3} className="mb-4">
              <MovieCard
                movie={movie}
                showRemoveButton={true} // Show the "Remove from Favorites" button
                onRemove={removeFromFavorites}
              />
            </Col>
          ))
        ) : (
          <p>No favorite movies yet!</p>
        )}
      </Row>
    </Container>
  );
};

ProfileView.propTypes = {
  user: PropTypes.shape({
    username: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    birthdate: PropTypes.string,
    favoriteMovies: PropTypes.arrayOf(PropTypes.string).isRequired,
  }).isRequired,
  token: PropTypes.string.isRequired,
  movies: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      genre: PropTypes.shape({
        name: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
      }).isRequired,
      director: PropTypes.shape({
        name: PropTypes.string.isRequired,
        bio: PropTypes.string.isRequired,
        birthYear: PropTypes.number,
        deathYear: PropTypes.number,
      }).isRequired,
      imageURL: PropTypes.string.isRequired,
      rating: PropTypes.number,
      featured: PropTypes.bool,
      actors: PropTypes.arrayOf(
        PropTypes.shape({
          name: PropTypes.string.isRequired,
          birthYear: PropTypes.number.isRequired,
        })
      ).isRequired,
    })
  ).isRequired,
  handleUserUpdate: PropTypes.func.isRequired,
  onUserDeregister: PropTypes.func.isRequired,
  showRemoveButton: PropTypes.bool,
  onRemove: PropTypes.func,
};
