import React from 'react';
import { Link } from 'react-router-dom';
import Card from '../components/Card';

export const Overview: React.FC = () => {
  return (
    <div className="overview-page">
      <header className="overview-header">
        <div className="overview-logo">
          <div className="app-mark" aria-hidden="true">DW</div>
          <span className="app-wordmark">DigiWater</span>
        </div>
        <div className="overview-actions">
          <Link to="/" className="nav-link">
            ← Back to Login
          </Link>
        </div>
      </header>

      <main className="overview-content">
        <Card className="overview-card">
          <h1>Network Overview</h1>
          <p className="overview-subtitle">
            Welcome to the DigiWater monitoring dashboard prototype.
          </p>
          <p className="overview-note">
            Select a district or view real-time metrics from the navigation panel.
          </p>
        </Card>
      </main>
    </div>
  );
};

export default Overview;
