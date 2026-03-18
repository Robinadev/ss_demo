import React from 'react';
import { useAuth } from '@/contexts/AuthContext';

const DashboardPage: React.FC = () => {
  const { user } = useAuth();

  return (
    <div className="dashboard-page">
      <h1>Dashboard</h1>
      <div className="dashboard-info">
        <h2>Welcome, {user?.fullName}!</h2>
        <p>Role: {user?.role}</p>
        <p>Email: {user?.email}</p>
      </div>

      <div className="dashboard-grid">
        <div className="dashboard-card">
          <h3>Your Reports</h3>
          <p>Manage your abuse reports and track their status.</p>
          <button className="btn btn-primary">View Reports</button>
        </div>
        <div className="dashboard-card">
          <h3>File a New Report</h3>
          <p>Report a new incident of violence, abuse, or bullying.</p>
          <button className="btn btn-primary">File Report</button>
        </div>
        <div className="dashboard-card">
          <h3>Get Support</h3>
          <p>Connect with counselors and support professionals.</p>
          <button className="btn btn-primary">Get Help</button>
        </div>
        <div className="dashboard-card">
          <h3>Analytics</h3>
          <p>View platform statistics and insights.</p>
          <button className="btn btn-primary">View Analytics</button>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
