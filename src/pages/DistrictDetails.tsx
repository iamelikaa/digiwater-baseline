import React, { useMemo } from 'react';
import { Link, useParams } from 'react-router-dom';
import { districts } from '../data/mockData';
import { getEffectiveSeverity } from '../utils/statusHelpers';
import GrafanaPlaceholder from '../components/GrafanaPlaceholder';
import Card from '../components/Card';
import SensorChart from '../components/SensorChart';
import SensorStatusCard from '../components/SensorStatusCard';
import districtLeakHistoryPlaceholderImg from '../assets/district-leak-history-placeholder.png';

export const DistrictDetails: React.FC = () => {
  const { cityId, districtId } = useParams<{ cityId: string; districtId: string }>();
  const city = useMemo(() => districts.find(d => d.id === cityId), [cityId]);
  const district = useMemo(() => districts.find(d => d.id === districtId), [districtId]);

  const sensors = useMemo(() => {
    const count = district?.sensorCount || 2;
    // Sensor-level status is derived from the district's actual reported
    // severity instead of an arbitrary index pattern: a "Normal" district
    // now shows all-normal sensors, and a "Warning"/"Critical" district
    // surfaces the sensor(s) responsible, so the sensor grid always agrees
    // with the status pill shown in the page header above it.
    const severity = district ? getEffectiveSeverity(district) : 'normal';

    return Array.from({ length: count }, (_, i) => {
      let status: 'normal' | 'warning' | 'critical' = 'normal';
      const isLast = i === count - 1;
      const isSecondToLast = i === count - 2;

      if (severity === 'critical') {
        if (isLast) status = 'critical';
        else if (isSecondToLast) status = 'warning';
      } else if (severity === 'warning') {
        if (isLast) status = 'warning';
      }

      return {
        id: `sensor-${i + 1}`,
        name: i % 2 === 0 ? `Flow Sensor S${i + 1}` : `Pressure Sensor S${i + 1}`,
        type: (i % 2 === 0 ? 'flow' : 'pressure') as 'flow' | 'pressure',
        unit: i % 2 === 0 ? 'L/min' : 'bar',
        status,
      };
    });
  }, [district]);

  if (!city || !district) {
    return (
      <Card className="content-placeholder-card">
        <h2>District Not Found</h2>
        <p className="placeholder-text">The requested district could not be found.</p>
      </Card>
    );
  }

  const severity = getEffectiveSeverity(district);
  const statusLabel = severity.charAt(0).toUpperCase() + severity.slice(1);

  return (
    <div className="entity-details-page">
      <header className="entity-header">
        <h1 className="entity-title">{district.name}</h1>
        <span className="entity-subtitle">
          {city.name} &middot; {district.sensorCount || 0} sensors
        </span>
        <span className={`status-pill status-pill-${severity} entity-status-pill`}>
           {severity === 'warning' && <span className="entity-status-pill-icon">⚠️</span>}
           {severity === 'critical' && <span className="entity-status-pill-icon">🚨</span>}
           {statusLabel}
        </span>
      </header>

      <section className="leak-history-section">
        <Card className="panel-card panel-card-flush">
          <div className="panel-header-row">
            <h3 className="panel-title">Leak History &mdash; Last 30 Days</h3>
            <Link to={`/leak-history?city=${city.id}&district=${district.id}`} className="view-dashboard-link">
              View full dashboard &rarr;
            </Link>
          </div>
          {district.id === 'marconi' ? (
            <GrafanaPlaceholder>
              <img
                src={districtLeakHistoryPlaceholderImg}
                alt="District Leak History Dashboard Static Placeholder"
                className="grafana-placeholder-image"
              />
            </GrafanaPlaceholder>
          ) : (
            <div className="issues-empty-state entity-empty-state">
              <div className="empty-state-icon entity-empty-state-icon">ℹ️</div>
              <h4 className="empty-state-title">Leak History Not Available</h4>
              <p className="empty-state-text">
                Telemetry data for {district.name} has not been integrated yet.
              </p>
            </div>
          )}
        </Card>
        {district.id === 'marconi' && (
          <p className="leak-history-source-caption">
            Source: Grafana &middot; {city.name} SCADA &middot; 15-min intervals
          </p>
        )}
      </section>

      <div className="details-two-col-layout">
        <section className="details-column">
          <h3 className="subsection-title">Sensor Data &ndash; Real-time & Historical</h3>
          <div className="sensor-charts-grid">
            {sensors.slice(0, 2).map(sensor => (
              <SensorChart key={sensor.id} sensor={sensor} />
            ))}
          </div>
        </section>

        <section className="details-column">
          <h3 className="subsection-title">Leakage Probability &ndash; Status History</h3>
          <Card className="panel-card leakage-probability-card">
            <h4>Status History Not Available</h4>
            <p>Leakage probability trend data has not been integrated yet.</p>
          </Card>
        </section>
      </div>

      <section className="sensor-status-section">
        <h3 className="subsection-title">Sensor Status</h3>
        <Card className="panel-card sensor-status-panel">
          <div className="sensor-status-grid">
            {sensors.map(sensor => (
              <SensorStatusCard key={sensor.id} sensor={sensor} />
            ))}
          </div>
        </Card>
      </section>
    </div>
  );
};

export default DistrictDetails;
