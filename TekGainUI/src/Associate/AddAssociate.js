import React, { useState } from "react";
import AssociateService from "../Service/AssociateService";
import "./AddAssociate.css";
import NavHeader from "../Header";

const AddAssociate = () => {
  const [associateId, setAssociateId] = useState('');
  const [associateName, setAssociateName] = useState('');
  const [associateAddress, setAssociateAddress] = useState('');
  const [associateEmailId, setAssociateEmailId] = useState('');
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState({});

  const handleAssociateIdChange = (e) => {
    setAssociateId(e.target.value);
  };

  const handleAssociateNameChange = (e) => {
    setAssociateName(e.target.value);
  };

  const handleAssociateAddressChange = (e) => {
    setAssociateAddress(e.target.value);
  };

  const handleAssociateEmailIdChange = (e) => {
    setAssociateEmailId(e.target.value);
  };

  const validateForm = () => {
    const errors = {};
    if (!associateId.trim()) {
      errors.associateId = "Associate Id is required.";
    }
    if (!associateName.trim()) {
      errors.associateName = "Name is required.";
    }
    if (!associateAddress.trim()) {
      errors.associateAddress = "Address is required.";
    }
    if (!associateEmailId.trim()) {
      errors.associateEmailId = "Email Id is required.";
    } else if (!isValidEmail(associateEmailId)) {
      errors.associateEmailId = "Invalid email format.";
    }

    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const isValidEmail = (email) => {
    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const associate = {
      associateId,
      associateName,
      associateAddress,
      associateEmailId,
    };

    AssociateService.addAssociate(associate)
      .then((response) => {
        setMessage("Associate has been added successfully.");
        setAssociateId('');
        setAssociateName('');
        setAssociateAddress('');
        setAssociateEmailId('');
        setErrors({});
      })
      .catch((error) => {
        setMessage("Error adding associate.");
      });
  };

  return (
    <div className="course_main_container">
    <NavHeader />
      <button className="back-button" onClick={() => window.history.back()}>
        ← Back
      </button>
      <h3 className="form-title">Add Associate Details</h3>
      <form className="add-associate-form">
        <div className="form-control">
          <label htmlFor="associateId">Associate Id</label>
          <input
            type="text"
            id="associateId"
            value={associateId}
            onChange={handleAssociateIdChange}
          />
          {errors.associateId && <p className="error-message">{errors.associateId}</p>}
        </div>

        <div className="form-control">
          <label htmlFor="associateName">Name</label>
          <input
            type="text"
            id="associateName"
            value={associateName}
            onChange={handleAssociateNameChange}
          />
          {errors.associateName && <p className="error-message">{errors.associateName}</p>}
        </div>

        <div className="form-control">
          <label htmlFor="associateAddress">Address</label>
          <input
            type="text"
            id="associateAddress"
            value={associateAddress}
            onChange={handleAssociateAddressChange}
          />
          {errors.associateAddress && <p className="error-message">{errors.associateAddress}</p>}
        </div>

        <div className="form-control">
          <label htmlFor="associateEmailId">Email Id</label>
          <input
            type="email"
            id="associateEmailId"
            value={associateEmailId}
            onChange={handleAssociateEmailIdChange}
          />
          {errors.associateEmailId && <p className="error-message">{errors.associateEmailId}</p>}
        </div>

        <button type="submit" className="submit-button" onClick={handleSubmit}>
          Add Associate
        </button>
      </form>

      {message && <div className="form-message">{message}</div>}
    </div>
  );
};

export default AddAssociate;
