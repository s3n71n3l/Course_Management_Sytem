import React from 'react';
import { Link } from 'react-router-dom';
import GetRole from "../Service/GetRole";
import './Associate.css'; // Ensure this import exists

const AssociatNav = () => {
  const roles = GetRole();

  return (
    <div className="associate-nav-bar">
      <div className="associate-nav-links">
        {roles.includes("ROLE_ADMIN") && (
          <Link to="addassociate">➕ Add Associate</Link>
        )}
        {roles.includes("ROLE_USER") && (
          <Link to="updateassociate">✏️ Update Associate</Link>
        )}
        {roles.includes("ROLE_USER") && (
          <Link to="viewassociate">👀 View Associate</Link>
        )}
      </div>
    </div>
  );
};

export default AssociatNav;
