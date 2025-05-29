import React, { useState } from "react";
import CourseService from "../Service/CourseService";
import NavHeader from "../Header";
import "./AddCourse.css";

const UpdateCourse = () => {
  const [courseId, setCourseId] = useState('');
  const [duration, setDuration] = useState('');
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState({});

  const handleCourseIdChange = (e) => {
    setCourseId(e.target.value);
  };

  const handleDurationChange = (e) => {
    setDuration(e.target.value);
  };

  const validateForm = () => {
    const errors = {};

    if (!courseId.trim()) {
      errors.courseId = "Course ID is required.";
    }

    if (!duration.trim()) {
      errors.duration = "Duration is required.";
    } else if (parseInt(duration) <= 0) {
      errors.duration = "Duration must be greater than zero.";
    }

    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    CourseService.updateCourse(courseId, duration)
      .then((response) => {
        setMessage('Course updated successfully.');
        setCourseId("");
        setDuration("");
        setErrors({});
      })
      .catch((error) => {
        setMessage('Error updating course.');
      });
  };

  return (
    <div>
      <NavHeader />
      <div className="course_main_container">
        <button className="back-button" onClick={() => window.history.back()}>
          ← Back
        </button>
        <h2 className="form-title">Update Course Duration</h2>
        <form className="course-form" onSubmit={handleSubmit}>
          <div className="form-control">
            <label htmlFor="courseId">Course ID</label>
            <input
              type="text"
              id="courseId"
              value={courseId}
              onChange={handleCourseIdChange}
            />
            {errors.courseId && <p className="error-message">{errors.courseId}</p>}
          </div>
          <div className="form-control">
            <label htmlFor="duration">Duration (Months)</label>
            <input
              type="number"
              id="duration"
              value={duration}
              onChange={handleDurationChange}
            />
            {errors.duration && <p className="error-message">{errors.duration}</p>}
          </div>
          <button type="submit" className="submit-button">
            Update Course
          </button>
        </form>
        {message && <div className="form-message">{message}</div>}
      </div>
    </div>
  );
};

export default UpdateCourse;
