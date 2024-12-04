import React from "react";
import { useState } from "react";
import PropTypes from "prop-types";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import {GlowingHexagon} from '../glowing-hexagon/glowing-hexagon';
import "./login-view.scss";
import { Container, Row, Col } from "react-bootstrap";
import "../../styles/buttons/custom-buttons.scss"; // Adjust the import path

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
    <Container className="login-view-container">
     <GlowingHexagon />
    <Row>
      <Col className="" >
        <Form className="login-form " onSubmit={handleSubmit}>
          <h2 className="text-center">LOGIN</h2>
          <Form.Group controlId="formUsername">
            <Form.Label></Form.Label>
            <Form.Control 
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              minLength="3"
              placeholder="Enter username"
              className="form-control-dark"
            />
          </Form.Group>
          <Form.Group controlId="formPassword">
            <Form.Label></Form.Label>
            <Form.Control
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Enter password"
              className="form-control-dark"
            />
          </Form.Group>
          <Button className= "btn-custom login-submit" variant="warning" type="submit">
            Login
          </Button>
       
        </Form>
      </Col>
    </Row>
  </Container>
  );
};


LoginView.propTypes = {
  onLoggedIn: PropTypes.func.isRequired,
};