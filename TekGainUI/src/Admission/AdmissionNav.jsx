import React from "react";
import { Link } from "react-router-dom";
import GetRole from "../Service/GetRole";
import './Admission.css'; 

const AdmissionNav = () => {
  const roles = GetRole();

  return (
    <div className="admission-nav-bar">
      <div className="admission-nav-links">
        {roles.includes("ROLE_USER") && (
          <Link to="registration">🧑‍🎓 Associate Registration</Link>
        )}
        {roles.includes("ROLE_ADMIN") && (
          <Link to="feeDetails">💰 Total Fees</Link>
        )}
        {roles.includes("ROLE_USER") && (
          <Link to="addfeedback">📝 Add Feedback</Link>
        )}
        {roles.includes("ROLE_ADMIN") && (
          <Link to="highestFee">📊 Highest Fee</Link>
        )}
        {roles.includes("ROLE_USER") && (
          <Link to="viewfeedback">🔍 View Feedback</Link>
        )}
        <Link to="makepayment">💳 Make Payment</Link>
      </div>
    </div>
  );
};

export default AdmissionNav;