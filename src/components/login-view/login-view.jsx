import React from "react";
import { useState } from "react";
import PropTypes from "prop-types";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

export const LoginView = ({ onLoggedIn }) => {
  //onLoggedIn is a prop that will be passed from the MainView component
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const handleSubmit = (event) => {
    //prevents default action to reload page
    event.preventDefault();

    const data = {
      username: username,
      password: password,
    };
    fetch("https://flixhive-cf7fbbd939d2.herokuapp.com/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json()) // JSON object will be used to extract the JWT token sent by API
      .then((data) => {
        console.log("Login response: ", data);
        if (data.user) {
          localStorage.setItem("user", JSON.stringify(data.user));
          localStorage.setItem("token", data.token);
          onLoggedIn(data.user, data.token); //onLoggedIn is a prop
        } else {
          alert("No such user");
        }
      })
      .catch((e) => {
        alert("Error logging in");
      });
  };

  return (
    //callback onSubmit tells the form to call the function handleSubmit when the form is submitted
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="formUsername">
        <Form.Label>Username:</Form.Label>
        <Form.Control
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          minLength="3"
          placeholder="Enter username"
        />
      </Form.Group>

      <Form.Group controlId="formPassword">
        <Form.Label>Password:</Form.Label>
        <Form.Control
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          placeholder="Enter password"
        />
      </Form.Group>
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
};


LoginView.propTypes = {
  onLoggedIn: PropTypes.func.isRequired,
};