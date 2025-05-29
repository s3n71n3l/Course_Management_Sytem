import React, { useState } from "react";
import NavHeader from "../Header";
import "./AddAdmission.css";
import AdmissionService from "../Service/AdmissionService";

const TotalFees = () => {
  const [associateId, setAssociateId] = useState("");
  const [setFees] = useState(null);
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setAssociateId(e.target.value);
    setErrors({});
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!associateId.trim()) {
      setErrors({ associateId: "Associate ID is required" });
      return;
    }

    AdmissionService.calculateFees(associateId)
      .then((response) => {
        console.log(response.data);
        setFees(response.data.fees);
        setMessage(`Total Fee: ${response.data.fees}`);
      })
      .catch((error) => {
        console.error(error);
        setMessage("Error retrieving total fee");
      });
  };

  return (
    <div>
      <NavHeader />
      <div className="admission_main_container">
        <button className="back-button" onClick={() => window.history.back()}>
          ← Back
        </button>
        <h2 className="form-title">Total Fee Details</h2>

        <form className="admission-form" onSubmit={handleSubmit}>
          <div className="form-control">
            <label htmlFor="associateId">Associate ID</label>
            <input
              type="text"
              id="associateId"
              value={associateId}
              onChange={handleChange}
            />
            {errors.associateId && (
              <span className="error-message">{errors.associateId}</span>
            )}
          </div>

          <button type="submit" className="submit-button">
            Get Fees
          </button>
        </form>

        {message && <div id="message">{message}</div>}
      </div>
    </div>
  );
};

export default TotalFees;