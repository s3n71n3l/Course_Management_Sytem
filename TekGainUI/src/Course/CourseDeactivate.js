import React, { useState } from "react";
import CourseService from "../Service/CourseService";
import NavHeader from "../Header";
import "./AddCourse.css";

const CourseDeactivate = () => {
  const [courseId, setCourseId] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setMessage('');

    if (!courseId.trim()) {
      setError('Course ID is required.');
      return;
    }

    CourseService.deactivate(courseId)
      .then((response) => {
        setMessage(`Course ${courseId} is deactivated successfully.`);
        setCourseId('');
      })
      .catch((error) => {
        setError('Error deactivating course.');
      });
  };

  return (
    <div>
      <NavHeader />
      <div className="course_main_container">
        <button className="back-button" onClick={() => window.history.back()}>
          ← Back
        </button>
        <h2 className="form-title">Deactivate Course</h2>
        <form className="course-form" onSubmit={handleSubmit}>
          <div className="form-grid">
            <div className="form-control">
              <label htmlFor="courseId">Course ID</label>
              <input
                type="text"
                id="courseId"
                value={courseId}
                onChange={(e) => setCourseId(e.target.value)}
              />
              {error && <p className="error-message">{error}</p>}
            </div>
          </div>
          <button type="submit" className="submit-button">
            Deactivate Course
          </button>
        </form>
        {message && <div className="form-message">{message}</div>}
      </div>
    </div>
  );
};

export default CourseDeactivate;
