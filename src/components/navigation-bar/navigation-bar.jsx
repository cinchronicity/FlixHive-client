import { Navbar, Container, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import "./navigation-bar.scss";


export const NavigationBar = ({ user, onLoggedOut }) => {
  return (
    <Navbar className= "navbar-custom navbar-dark"  expand="lg">
      <Container>
        <Navbar.Brand as={Link} to="/">
          FlixHive
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            {!user && (
              <>
                <Nav.Link as={Link} to="/login">
                  Login
                </Nav.Link>

                <Nav.Link as={Link} to="/signup">
                  Signup
                </Nav.Link>
              </>
            )}
            {user && (
              <>
                <Nav.Link as={Link} to="/">
                  Home
                </Nav.Link>
                <Nav.Link as={Link} to="/profile">
                  Profile
                </Nav.Link>
                {/* <Nav.Link onClick={onLoggedOut}>Logout</Nav.Link> */}
              </>
            )}
          </Nav>
          {user && (
            <>
              <Navbar.Text>
                Welcome, {user.username}!
              </Navbar.Text>
              <></>
              <Nav.Link className="ms-3 navbar-custom" onClick={onLoggedOut}>Logout</Nav.Link>
            </>
          )}
            

        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

NavigationBar.propTypes = {
  user: PropTypes.shape({
    username: PropTypes.string,
  }),
  onLoggedOut: PropTypes.func.isRequired,
};