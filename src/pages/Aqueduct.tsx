import React, { useMemo } from 'react';
import { Link, useParams } from 'react-router-dom';
import { districts } from '../data/mockData';
import { getEffectiveSeverity } from '../utils/statusHelpers';
import GrafanaPlaceholder from '../components/GrafanaPlaceholder';
import networkMapPlaceholderImg from '../assets/network-map-placeholder.png';
import Card from '../components/Card';
import DistrictsTable from '../components/DistrictsTable';

export const Aqueduct: React.FC = () => {
  const { cityId } = useParams<{ cityId: string }>();
  const city = useMemo(() => districts.find(d => d.id === cityId), [cityId]);
  
  const childDistricts = useMemo(() => districts.filter(d => d.parentId === cityId), [cityId]);
  const districtCount = childDistricts.length;
  
  const sensorCount = useMemo(() => {
    if (districtCount === 0) {
      return city?.sensorCount || 0;
    }
    return childDistricts.reduce((total, d) => total + (d.sensorCount || 0), 0);
  }, [city, childDistricts, districtCount]);

  if (!city) {
    return (
      <Card className="content-placeholder-card">
        <h2>City Not Found</h2>
        <p className="placeholder-text">The requested municipality could not be found.</p>
      </Card>
    );
  }

  const severity = getEffectiveSeverity(city);
  const statusLabel = severity.charAt(0).toUpperCase() + severity.slice(1);

  return (
    <div className="entity-details-page">
      <header className="entity-header">
        <h1 className="entity-title">{city.name}</h1>
        <span className="entity-subtitle">
          {districtCount} districts &middot; {sensorCount} sensors
        </span>
        <span className={`status-pill status-pill-${severity} entity-status-pill`}>
           {severity === 'warning' && <span className="entity-status-pill-icon">⚠️</span>}
           {severity === 'critical' && <span className="entity-status-pill-icon">🚨</span>}
           {statusLabel}
        </span>
      </header>

      <section className="network-map-section">
        <Card className="panel-card panel-card-flush">
          <div className="panel-header-row">
            <h3 className="panel-title">Network Map &mdash; {city.name}</h3>
            <Link to={`/leak-history?city=${city.id}`} className="view-dashboard-link">
              View full dashboard &rarr;
            </Link>
          </div>
          {city.id === 'marene' ? (
            <GrafanaPlaceholder>
              <img
                src={networkMapPlaceholderImg}
                alt="Marene Network Map Static Placeholder"
                className="grafana-placeholder-image"
              />
            </GrafanaPlaceholder>
          ) : (
            <div className="issues-empty-state entity-empty-state">
              <div className="empty-state-icon entity-empty-state-icon">ℹ️</div>
              <h4 className="empty-state-title">Network Map Not Available</h4>
              <p className="empty-state-text">
                Telemetry data for {city.name} has not been integrated yet.
              </p>
            </div>
          )}
        </Card>
      </section>

      <DistrictsTable cityId={city.id} />
    </div>
  );
};

export default Aqueduct;
