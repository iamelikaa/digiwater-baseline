import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { districts } from '../data/mockData';
import { getEffectiveSeverity } from '../utils/statusHelpers';
import GrafanaPlaceholder from '../components/GrafanaPlaceholder';
import Card from '../components/Card';
import DistrictsTable from '../components/DistrictsTable';

export interface AqueductProps {
  cityId: string;
}

export const Aqueduct: React.FC<AqueductProps> = ({ cityId }) => {
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
    <div className="aqueduct-dashboard" style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <header className="page-header" style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        <h1 className="page-title" style={{ margin: 0, fontSize: '28px', fontWeight: 700, color: '#0f172a' }}>{city.name}</h1>
        <span className="page-subtitle" style={{ color: '#64748b', fontSize: '15px', fontWeight: 600 }}>
          {districtCount} districts &middot; {sensorCount} sensors
        </span>
        <span className={`status-pill status-pill-${severity}`} style={{ marginLeft: '12px', fontSize: '13px', padding: '6px 14px' }}>
           {severity === 'warning' && <span style={{marginRight: '6px'}}>⚠️</span>}
           {severity === 'critical' && <span style={{marginRight: '6px'}}>🚨</span>}
           {statusLabel}
        </span>
      </header>

      <section className="network-map-section">
        <Card className="panel-card" style={{ padding: 0, overflow: 'hidden' }}>
          <div className="panel-header" style={{ padding: '24px 24px 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h3 className="panel-title">Network Map &mdash; {city.name}</h3>
            <Link to="/leak-history" className="view-dashboard-link">
              View full dashboard &rarr;
            </Link>
          </div>
          {cityId === 'marene' ? (
            <GrafanaPlaceholder />
          ) : (
            <div className="issues-empty-state" style={{ padding: '60px 20px' }}>
              <div className="empty-state-icon" style={{ backgroundColor: '#f1f5f9', color: '#64748b' }}>ℹ️</div>
              <h4 className="empty-state-title">Network Map Not Available</h4>
              <p className="empty-state-text">
                Telemetry data for {city.name} has not been integrated yet.
              </p>
            </div>
          )}
        </Card>
      </section>

      <DistrictsTable cityId={cityId} />
    </div>
  );
};

export default Aqueduct;
