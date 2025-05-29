import React, { useState } from "react";
import NavHeader from "../Header";
import "./AddAdmission.css";
import AdmissionService from "../Service/AdmissionService";

const HighestFeeCalculation = () => {
  const [associateId, setAssociateId] = useState("");
  const [message, setMessage] = useState("");
  const [highestFee, setHighestFee] = useState("");

  const validateForm = () => {
    let isValid = true;
    if (!associateId.trim()) {
      isValid = false;
      setMessage("Associate ID is required.");
    } else {
      setMessage("");
    }
    return isValid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    AdmissionService.highestFee(associateId)
      .then((response) => {
        console.log("Response Data:", response.data);
        setHighestFee(response.data);
        setMessage("");
      })
      .catch((error) => {
        console.log(error);
        setMessage("Error retrieving highest fee");
        setHighestFee("");
      });
  };

  return (
    <div>
      <NavHeader />
      <div className="admission_main_container">
        <button className="back-button" onClick={() => window.history.back()}>
          ← Back
        </button>
        <h2 className="form-title">Highest Course Fee by Associate ID</h2>

        <form className="admission-form" onSubmit={handleSubmit}>
          <div className="form-control">
            <label htmlFor="associateId">Associate ID</label>
            <input
              type="text"
              id="associateId"
              value={associateId}
              onChange={(e) => setAssociateId(e.target.value)}
            />
          </div>

          <button type="submit" className="submit-button">
            Submit
          </button>
        </form>

        {message && <div id="message">{message}</div>}

        {highestFee && (
          <div className="admission-details">
            <h4>Highest Course Fee</h4>
            <table className="table">
              <thead>
                <tr>
                  <th>Course ID</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{highestFee}</td>
                </tr>
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default HighestFeeCalculation;