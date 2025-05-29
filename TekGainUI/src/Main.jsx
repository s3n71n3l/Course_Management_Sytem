import React from "react";
import { Navbar, Container, Card } from "react-bootstrap";
import { Link } from "react-router-dom";

const Main = ({ isAuthenticated }) => {
  return (
    <div
      style={{
        backgroundColor: "#eef1f5",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Navbar className="bg-dark" style={{ flexShrink: 0 }}>
        <Container>
          <Navbar.Brand as={Link} to="/">
            <h1 style={{ color: "coral" }}>TekGain</h1>
          </Navbar.Brand>
          <div className="d-flex gap-3">
            {isAuthenticated ? (
              <>
                <Link to="/course" className="nav-link text-light">
                  Course
                </Link>
                <Link to="/admission" className="nav-link text-light">
                  Admission
                </Link>
                <Link to="/associate" className="nav-link text-light">
                  Associate
                </Link>
                <Link to="/" className="nav-link text-light">
                  Logout
                </Link>
              </>
            ) : (
              <Link to="/login" className="nav-link text-light">
                Login
              </Link>
            )}
          </div>
        </Container>
      </Navbar>
      <Container
        className="my-5"
        style={{
          flex: 1, // This makes sure this container takes up available space
          minHeight: "calc(100vh - 150px)", // Subtract height of navbar and footer
          display: "flex",
          flexDirection: "column",
          justifyContent: "center", // Centering content vertically
          alignItems: "center", // Centering content horizontally
        }}
      >
        <h1 className="text-center mb-3">
          TekGain - Empowering Minds Through E-Learning
        </h1>
        <p className="text-center fw-bold">
          Comprehensive learning programs & classes for all students
        </p>
        <p className="text-center">
          Become lifelong learners with India's best teachers, engaging video
          lessons, and personalized learning journeys.
        </p>

        <Card className="p-3 mb-4" style={{ width: "100%", maxWidth: "600px" }}>
          <Card.Body>
            <Card.Title className="text-danger">Our Key Features:</Card.Title>
            <ul>
              <li>Expert Teachers</li>
              <li>Engaging Video Lessons</li>
              <li>Personalized Learning</li>
              <li>Comprehensive Courses</li>
              <li>Flexible Schedule</li>
            </ul>
          </Card.Body>
        </Card>

        <h2 className="text-center">Join TekGain Now!</h2>
        <p className="text-center">
          Join us on this journey of knowledge and growth, and unlock your true
          potential with TekGain's E-Learning platform.
        </p>
      </Container>

      {/* Footer Section */}
      <div
        style={{
          backgroundColor: "#2c3e50",
          padding: "20px 0",
          flexShrink: 0, 
        }}
      >
        <Container>
          <p className="text-center text-light">
            © 2025 TekGain. All rights reserved.
          </p>
        </Container>
      </div>
    </div>
  );
};

export default Main;
