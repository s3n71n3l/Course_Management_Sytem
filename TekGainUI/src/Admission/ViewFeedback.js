import React, { useState } from "react";
import AdmissionService from "../Service/AdmissionService";
import NavHeader from "../Header";
import "../Course/AddCourse.css";

const ViewFeedback = () => {
  const [courseId, setCourseId] = useState("");
  const [feedback, setFeedback] = useState("");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const errors = {};
    if (!courseId.trim()) {
      errors.courseId = "Course ID is required.";
    }
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    AdmissionService.viewFeedbackByCourseId(courseId)
      .then((response) => {
        setFeedback(response.data);
        setMessage("");
        setErrors({});
      })
      .catch((error) => {
        setFeedback("");
        setMessage("Error fetching feedback.");
      });
  };

  return (
    <div>
      <NavHeader />
      <div className="course_main_container">
        <button className="back-button" onClick={() => window.history.back()}>
          ← Back
        </button>
        <h2 className="form-title">View Course Feedback</h2>

        <form className="course-form" onSubmit={handleSubmit}>
          <div className="form-control">
            <label htmlFor="courseId">Course ID</label>
            <input
              type="text"
              id="courseId"
              value={courseId}
              onChange={(e) => setCourseId(e.target.value)}
            />
            {errors.courseId && <p className="error-message">{errors.courseId}</p>}
          </div>
          <button type="submit" className="submit-button">
            Get Feedback
          </button>
        </form>

        {message && <div id="message" className="form-message">{message}</div>}

        {feedback && (
          <div className="course-details" style={{ marginTop: "24px" }}>
            <h4>Feedback Details</h4>
            <table className="table">
              <thead>
                <tr>
                  <th>Course ID</th>
                  <th>Feedback</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{courseId}</td>
                  <td>{feedback}</td>
                </tr>
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default ViewFeedback;