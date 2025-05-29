import React from 'react';
import { Outlet } from 'react-router-dom';
import NavHeader from '../Header';
import AdmissionNav from './AdmissionNav';
import './Admission.css';

function Admission() {
  return (
    <div className="admission_body">
      <NavHeader />
      <h2 className="admission_heading">🎓 Admission Management Portal</h2>
      <AdmissionNav />

      <div className="admission_content_wrapper">
        <section style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '1.5rem',
          marginBottom: '2rem'
        }}>
          <div style={cardStyle}>
            <h3>🧾 Add Feedback</h3>
            <p>Collect feedback from students to evaluate and enhance their admission experience.</p>
          </div>
          <div style={cardStyle}>
            <h3>💳 Payment</h3>
            <p>Manage tuition fee payments, receipts, and payment status for each student.</p>
          </div>
          <div style={cardStyle}>
            <h3>📈 Admission Stats</h3>
            <p>Get insights like highest fee paid and total collected amount for all admissions.</p>
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

export default Admission;