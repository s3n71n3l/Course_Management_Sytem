import React from 'react';
import { Outlet } from 'react-router-dom';
import NavHeader from '../Header';
import CourseNav from './CourseNav';
import './Course.css';

function Course() {
  return (
    <div className="course_body">
      <NavHeader />
      <h2 className="course_heading">📘 Course Information Portal</h2>
      <CourseNav />

      <div className="course_content_wrapper">
        <section style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '1.5rem',
          marginBottom: '2rem'
        }}>
          <div style={cardStyle}>
            <h3>📝 Add or Update</h3>
            <p>Add new courses or update existing ones to keep your curriculum fresh and accurate.</p>
          </div>
          <div style={cardStyle}>
            <h3>📊 View Courses</h3>
            <p>Browse and explore available courses with details and descriptions for users.</p>
          </div>
          <div style={cardStyle}>
            <h3>⭐ Feedback</h3>
            <p>Track course ratings and student feedback to improve course quality.</p>
          </div>
        </section>

        <Outlet />
      </div>
    </div>
  );
}

const cardStyle = {
  backgroundColor: '#ffffff',
  padding: '1.5rem',
  borderRadius: '12px',
  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
};

export default Course;