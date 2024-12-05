import { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import axios from "axios";
import "../login-view/login-view.scss";
import { Row, Col, Container } from "react-bootstrap";

export const SignupView = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [birthdate, setBirthdate] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    const data = {
      username: username,
      password: password,
      email: email,
      birthdate: birthdate,
    };

    axios
      .post("https://flixhive-cf7fbbd939d2.herokuapp.com/users", data, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        if (response.status === 201) {
          alert("Signup successful");
          window.location.reload();
        } else {
          alert("Signup failed");
        }
      })
      .catch((error) => {
        console.error("Error during signup:", error.response.data);
        alert("Signup failed");
      });
  };

  return (
    <Container className="signup-view-container">
      <Row className="justify-content-md-center">
        <Col md={6} lg={4}>
          <Form className="signup-form" onSubmit={handleSubmit}>
            <h2 className="text-center">SIGN UP</h2>
            <Form.Group controlId="formUsername">
              <Form.Label>Username:</Form.Label>
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
              <Form.Label>Password:</Form.Label>
              <Form.Control
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="Enter password"
                className="form-control-dark"
              />
            </Form.Group>
            <Form.Group controlId="formEmail">
              <Form.Label>Email:</Form.Label>
              <Form.Control
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="Enter email"
                className="form-control-dark"
              />
            </Form.Group>
            <Form.Group controlId="formBirthdate">
              <Form.Label>Birthday</Form.Label>
              <Form.Control
                type="date"
                value={birthdate}
                onChange={(e) => setBirthdate(e.target.value)}
                required
                className="form-control-dark"
              />
            </Form.Group>
            <Button variant="warning" type="submit" className="signup-submit">
              Submit
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};
