import React from 'react';
import { Outlet } from 'react-router-dom';
import NavHeader from '../Header';
import AssociatNav from './AssociatNav';
import './Associate.css'; // You can create a specific CSS file for associate styling if needed

function Associate() {
  return (
    <div className="associate_body">
      <NavHeader />
      <h2 className="associate_heading">🧑‍🤝‍🧑 Associate Information Portal</h2>
      <AssociatNav />

      <div className="associate_content_wrapper">
        <section
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '1.5rem',
            marginBottom: '2rem',
          }}
        >
          <div style={cardStyle}>
            <h3>➕ Add Associate</h3>
            <p>Add new associates or update existing ones to keep your records up to date.</p>
          </div>
          <div style={cardStyle}>
            <h3>🔄 Update Associate</h3>
            <p>Edit the details of an existing associate to maintain current information.</p>
          </div>
          <div style={cardStyle}>
            <h3>👀 View Associates</h3>
            <p>Browse and explore associate details for quick reference.</p>
          </div>
        </section>

        <Outlet />
      </div>
    </div>
  );
}

const cardStyle = {
  backgroundColor: '#ffffff',
  padding: '1.5rem',
  borderRadius: '12px',
  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
};

export default Associate;
