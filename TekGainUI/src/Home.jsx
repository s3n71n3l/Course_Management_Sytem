import React, { useState } from "react";
import { Navbar, Container, Card, Form, Button, Alert } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FaLock, FaUser } from "react-icons/fa";
import validateUser from "./Service/LoginService"; // Make sure this path is correct
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [logingStatus, setLogStatus] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    validateUser(username, password).then(
      () => {
        setLogStatus(true);
        navigate("/", { state: { isAuthenticated: true } }); // Redirect after successful login
      },
      (error) => {
        setMessage("Invalid UserName/Password");
      }
    );
  };

  return (
    <div style={{ backgroundColor: "#f4f6f8", minHeight: "100vh" }}>
      {!logingStatus ? (
        <>
          <Navbar className="bg-dark shadow">
            <Container>
              <Link to="/" style={{ textDecoration: "none" }}>
                <Navbar.Brand className="d-flex align-items-center">
                  <h1 style={{ color: "coral", margin: 0 }}>TekGain</h1>
                </Navbar.Brand>
              </Link>
            </Container>
          </Navbar>

          <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: "85vh" }}>
            <Card style={{ width: "100%", maxWidth: "420px", borderRadius: "20px" }} className="p-5 shadow-lg border-0">
              <h3 className="text-center mb-4 fw-bold" style={{ color: "#2c3e50" }}>Welcome Back</h3>
              <p className="text-center text-muted mb-4">Login to your TekGain account</p>
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-4" controlId="formUsername">
                  <Form.Label className="fw-semibold">
                    <FaUser className="me-2" /> Username
                  </Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter your username"
                    value={username}
                    onChange={(e) => setUserName(e.target.value)}
                    required
                    className="py-2"
                  />
                </Form.Group>

                <Form.Group className="mb-4" controlId="formPassword">
                  <Form.Label className="fw-semibold">
                    <FaLock className="me-2" /> Password
                  </Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="py-2"
                  />
                </Form.Group>

                <Button variant="primary" type="submit" className="w-100 py-2 fw-bold">
                  Login
                </Button>
              </Form>

              {message && <Alert variant="danger" className="mt-3 text-center">{message}</Alert>}
            </Card>
          </Container>
        </>
      ) : (
        // You can place the navbar with authenticated routes here
        <div>Authenticated! Your content goes here.</div>
      )}
    </div>
  );
};

export default Home;
