import React, { useState } from "react";
import NavHeader from "../Header";
import "./AddAdmission.css";
import AdmissionService from "../Service/AdmissionService";

const AssociateRegistration = () => {
  const [courseId, setCourseId] = useState("");
  const [associateId, setAssociateId] = useState("");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const errors = {};
    if (!courseId.trim()) {
      errors.courseId = "Course ID is required.";
    }
    if (!associateId.trim()) {
      errors.associateId = "Associate ID is required.";
    }
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    AdmissionService.register(associateId, courseId)
      .then((response) => {
        setMessage(`Registered successfully! Your registration ID: ${response.data.registrationId}`);
        setCourseId("");
        setAssociateId("");
        setErrors({});
      })
      .catch((error) => {
        console.log(error);
        setMessage("Error registering associate");
      });
  };

  return (
    <div>
      <NavHeader />
      <div className="admission_main_container">
        <button className="back-button" onClick={() => window.history.back()}>
          ← Back
        </button>
        <h2 className="form-title">Associate Registration Form</h2>

        <form className="admission-form" onSubmit={handleSubmit}>
          <div className="form-control">
            <label>Course ID</label>
            <input
              type="text"
              id="courseId"
              value={courseId}
              onChange={(e) => setCourseId(e.target.value)}
            />
            {errors.courseId && (
              <p className="error-message">{errors.courseId}</p>
            )}
          </div>

          <div className="form-control">
            <label>Associate ID</label>
            <input
              type="text"
              id="associateId"
              value={associateId}
              onChange={(e) => setAssociateId(e.target.value)}
            />
            {errors.associateId && (
              <p className="error-message">{errors.associateId}</p>
            )}
          </div>

          <button type="submit" className="submit-button">
            Register Now
          </button>
        </form>

        {message && <div id="message">{message}</div>}
      </div>
    </div>
  );
};

export default AssociateRegistration;