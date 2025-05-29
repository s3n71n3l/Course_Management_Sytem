import React, { useState } from "react";
import AdmissionService from "../Service/AdmissionService";
import NavHeader from "../Header"; 
import "./AddAdmission.css"; 

const AddFeedback = () => {
  const [registrationId, setRegistrationId] = useState("");
  const [feedback, setFeedback] = useState("");
  const [feedbackRating, setFeedbackRating] = useState("");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const errors = {};

    if (!registrationId.trim()) {
      errors.registrationId = "Registration ID is required.";
    }

    if (!feedback.trim()) {
      errors.feedback = "Feedback is required.";
    }

    if (!feedbackRating.trim()) {
      errors.feedbackRating = "Feedback rating is required.";
    } else if (isNaN(feedbackRating) || feedbackRating < 1 || feedbackRating > 5) {
      errors.feedbackRating = "Rating must be a number between 1 and 5.";
    }

    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    AdmissionService.addFeedback(registrationId, feedback, feedbackRating)
      .then((response) => {
        console.log(response.data);
        setMessage("Feedback added successfully");
        setRegistrationId("");
        setFeedback("");
        setFeedbackRating("");
        setErrors({});
      })
      .catch((error) => {
        console.log(error);
        setMessage("Error adding feedback");
      });
  };

  return (
    <div>
      <NavHeader />
      <div className="course_main_container">
        <button className="back-button" onClick={() => window.history.back()}>
          ← Back
        </button>
        <h2 className="form-title">Add Feedback</h2>
        <form className="course-form">
          <div className="form-grid">
            <div className="form-control">
              <label htmlFor="registrationId">Registration ID</label>
              <input
                type="text"
                id="registrationId"
                value={registrationId}
                onChange={(e) => setRegistrationId(e.target.value)}
              />
              {errors.registrationId && (
                <p className="error-message">{errors.registrationId}</p>
              )}
            </div>

            <div className="form-control">
              <label htmlFor="feedback">Feedback Comments</label>
              <input
                type="text"
                id="feedback"
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
              />
              {errors.feedback && (
                <p className="error-message">{errors.feedback}</p>
              )}
            </div>

            <div className="form-control">
              <label htmlFor="feedbackRating">Feedback Rating (1–5)</label>
              <input
                type="number"
                id="feedbackRating"
                value={feedbackRating}
                onChange={(e) => setFeedbackRating(e.target.value)}
              />
              {errors.feedbackRating && (
                <p className="error-message">{errors.feedbackRating}</p>
              )}
            </div>
          </div>
          <button type="submit" className="submit-button" onClick={handleSubmit}>
            Submit
          </button>
        </form>
        {message && <div className="form-message">{message}</div>}
      </div>
    </div>
  );
};

export default AddFeedback;
