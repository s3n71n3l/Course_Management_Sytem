import React, { useState } from "react";
import AssociateService from "../Service/AssociateService";
import NavHeader from "../Header";
import "./AddAssociate.css";

const ViewAssociate = () => {
  const [associateId, setAssociateId] = useState("");
  const [record, setRecord] = useState(null);
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setAssociateId(e.target.value);
  };

  const validateForm = () => {
    const errors = {};
    if (!associateId.trim()) {
      errors.associateId = "Associate ID is required.";
    }
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    AssociateService.viewAssociateById(associateId)
      .then((response) => {
        setRecord(response.data);
        setMessage("");
      })
      .catch((error) => {
        setRecord(null);
        setMessage("Error fetching associate details.");
      });
  };

  return (
    <div>
      <NavHeader />
      <div className="course_main_container">
        <button className="back-button" onClick={() => window.history.back()}>
          ← Back
        </button>
        <h2 className="form-title">View Associate</h2>
        <form className="course-form" onSubmit={handleSubmit}>
          <div className="form-control">
            <label htmlFor="associateId">Associate ID</label>
            <input
              type="text"
              id="associateId"
              value={associateId}
              onChange={handleChange}
            />
            {errors.associateId && (
              <p className="error-message">{errors.associateId}</p>
            )}
          </div>
          <button type="submit" className="submit-button">
            Get Details
          </button>
        </form>

        {record && (
          <div className="course-details">
            <h4>Associate Details</h4>
            <table className="table">
              <thead>
                <tr>
                  <th>Associate ID</th>
                  <th>Name</th>
                  <th>Address</th>
                  <th>Email ID</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{record.associateId}</td>
                  <td>{record.associateName}</td>
                  <td>{record.associateAddress}</td>
                  <td>{record.associateEmailId}</td>
                </tr>
              </tbody>
            </table>
          </div>
        )}
        {message && <div className="form-message">{message}</div>}
      </div>
    </div>
  );
};

export default ViewAssociate;