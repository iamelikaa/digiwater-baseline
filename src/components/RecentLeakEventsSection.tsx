import React from 'react';
import { Link } from 'react-router-dom';
import Card from './Card';
import leakEventsPlaceholderImg from '../assets/leak-events-placeholder.png';

export const RecentLeakEventsSection: React.FC = () => {
  return (
    <section className="recent-leaks-section" aria-label="Recent Leak Events Aggregated View">
      <div className="section-header-row">
        <h3 className="section-heading">Recent Leak Events (Aggregated View)</h3>
        <Link to="/leak-history" className="view-dashboard-link">
          View full dashboard &rarr;
        </Link>
      </div>

      <Card className="recent-leaks-card">
        <div className="grafana-placeholder-wrapper">
          <img
            src={leakEventsPlaceholderImg}
            alt="Grafana Recent Leak Events Dashboard Placeholder"
            className="grafana-placeholder-image"
          />
        </div>
      </Card>

      <p className="grafana-caption">
        Source: Grafana &middot; Last 30 days &middot; All cities
      </p>
    </section>
  );
};

export default RecentLeakEventsSection;
