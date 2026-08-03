import React from 'react';
import { Link } from 'react-router-dom';
import Card from './Card';
import GrafanaPlaceholder from './GrafanaPlaceholder';

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
        <GrafanaPlaceholder title="Dashboards › Smart Digital Water › Main" timeRange="Last 30 days">
          <div className="grafana-mockup-surface">
            {/* Top KPI badge row imitating the screenshot */}
            <div className="grafana-kpi-row">
              <div className="grafana-badge grafana-badge-green">Marene</div>
              <div className="grafana-badge grafana-badge-green">Cavallermaggiore</div>
              <div className="grafana-stat-box">
                <span className="stat-box-label">System Status</span>
                <span className="stat-box-value stat-value-ok">Ok</span>
              </div>
              <div className="grafana-stat-box">
                <span className="stat-box-label">Perdite tot... &#9432;</span>
                <span className="stat-box-value stat-value-green">64</span>
              </div>
              <div className="grafana-timestamp-box">
                <span className="timestamp-label">Ultimo aggiornamento dati</span>
                <span className="timestamp-value">2026-03-04 09:03:17</span>
              </div>
            </div>

            {/* Mock leak events table reproducing the screenshot table */}
            <div className="grafana-table-wrapper">
              <table className="grafana-mock-table">
                <thead>
                  <tr>
                    <th>Distretto</th>
                    <th>Inizio Perdita</th>
                    <th>Fine Perdita</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Marconi</td>
                    <td>2025-09-02 06:45:00</td>
                    <td>2025-09-04 01:45:00</td>
                  </tr>
                  <tr>
                    <td>Ponte</td>
                    <td>2025-09-02 06:45:00</td>
                    <td>2025-09-04 01:45:00</td>
                  </tr>
                  <tr>
                    <td>Marconi</td>
                    <td>2025-09-02 06:45:00</td>
                    <td>2025-09-04 01:45:00</td>
                  </tr>
                  <tr>
                    <td>Ponte</td>
                    <td>2025-09-02 06:45:00</td>
                    <td>2025-09-04 01:45:00</td>
                  </tr>
                  <tr>
                    <td>Marconi</td>
                    <td>2025-09-03 06:45:00</td>
                    <td>2025-09-05 01:45:00</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </GrafanaPlaceholder>
      </Card>

      <p className="grafana-caption">
        Source: Grafana &middot; Last 30 days &middot; All cities
      </p>
    </section>
  );
};

export default RecentLeakEventsSection;
