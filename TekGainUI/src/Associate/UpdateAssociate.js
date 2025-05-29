import React, { useState } from "react";
import AssociateService from "../Service/AssociateService";
import NavHeader from "../Header";
import "./AddAssociate.css"; // Reuse styling for layout and form consistency

const UpdateAssociate = () => {
  const [associateId, setAssociateId] = useState('');
  const [associateAddress, setAssociateAddress] = useState('');
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState({});

  const handleAssociateIdChange = (e) => {
    setAssociateId(e.target.value);
  };

  const handleAssociateAddressChange = (e) => {
    setAssociateAddress(e.target.value);
  };

  const validateForm = () => {
    const errors = {};

    if (!associateId.trim()) {
      errors.associateId = "Associate ID is required.";
    }

    if (!associateAddress.trim()) {
      errors.associateAddress = "Address is required.";
    }

    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    AssociateService.updateAssociate(associateId, associateAddress)
      .then((response) => {
        setMessage("Associate address updated successfully.");
        setAssociateId("");
        setAssociateAddress("");
        setErrors({});
      })
      .catch((error) => {
        setMessage("Error updating associate address.");
      });
  };

  return (
    <div>
      <NavHeader />
      <div className="course_main_container">
        <button className="back-button" onClick={() => window.history.back()}>
          ← Back
        </button>
        <h2 className="form-title">Update Associate Address</h2>
        <form className="course-form" onSubmit={handleSubmit}>
          <div className="form-control">
            <label htmlFor="associateId">Associate ID</label>
            <input
              type="text"
              id="associateId"
              value={associateId}
              onChange={handleAssociateIdChange}
            />
            {errors.associateId && <p className="error-message">{errors.associateId}</p>}
          </div>
          <div className="form-control">
            <label htmlFor="associateAddress">New Address</label>
            <input
              type="text"
              id="associateAddress"
              value={associateAddress}
              onChange={handleAssociateAddressChange}
            />
            {errors.associateAddress && <p className="error-message">{errors.associateAddress}</p>}
          </div>
          <button type="submit" className="submit-button">
            Update Address
          </button>
        </form>
        {message && <div className="form-message">{message}</div>}
      </div>
    </div>
  );
};

export default UpdateAssociate;