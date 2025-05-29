import React from 'react';
import { Link } from 'react-router-dom';
import GetRole from "../Service/GetRole";
import './Course.css'; // Ensure this import exists

const CourseNav = () => {
  const roles = GetRole();

  return (
    <div className="course-nav-bar">
      <div className="course-nav-links">
        {roles.includes("ROLE_ADMIN") && (
          <Link to="addcourse">➕ Add Course</Link>
        )}
        {roles.includes("ROLE_ADMIN") && (
          <Link to="updatecourse">✏️ Update Course</Link>
        )}
        {roles.includes("ROLE_USER") && (
          <Link to="viewcourse">📚 View Course</Link>
        )}
        {roles.includes("ROLE_ADMIN") && (
          <Link to="viewfeedbackrating">⭐ View Feedback</Link>
        )}
        {roles.includes("ROLE_ADMIN") && (
          <Link to="deactivate">🚫 Deactivate Course</Link>
        )}
      </div>
    </div>
  );
};

export default CourseNav;