import React, { useMemo } from 'react';
import { districts } from '../data/mockData';
import { getEffectiveSeverity } from '../utils/statusHelpers';
import GrafanaPlaceholder from '../components/GrafanaPlaceholder';
import Card from '../components/Card';
import SensorChart from '../components/SensorChart';
import SensorStatusCard from '../components/SensorStatusCard';

export interface DistrictDetailsProps {
  cityId: string;
  districtId: string;
}

export const DistrictDetails: React.FC<DistrictDetailsProps> = ({ cityId, districtId }) => {
  const city = useMemo(() => districts.find(d => d.id === cityId), [cityId]);
  const district = useMemo(() => districts.find(d => d.id === districtId), [districtId]);

  const sensors = useMemo(() => {
    const count = district?.sensorCount || 2;
    return Array.from({ length: count }, (_, i) => {
      let status: 'normal' | 'warning' | 'critical' = 'normal';
      if (i % 5 === 1) status = 'warning';
      if (i % 7 === 2) status = 'critical';

      return {
        id: `sensor-${i + 1}`,
        name: i % 2 === 0 ? `Flow Sensor S${i + 1}` : `Pressure Sensor S${i + 1}`,
        type: (i % 2 === 0 ? 'flow' : 'pressure') as 'flow' | 'pressure',
        unit: i % 2 === 0 ? 'L/min' : 'bar',
        status,
      };
    });
  }, [district?.sensorCount]);

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
    <div className="district-details-dashboard" style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <header className="page-header" style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        <h1 className="page-title" style={{ margin: 0, fontSize: '28px', fontWeight: 700, color: '#0f172a' }}>{district.name}</h1>
        <span className="page-subtitle" style={{ color: '#64748b', fontSize: '15px', fontWeight: 600 }}>
          {city.name} &middot; {district.sensorCount || 0} sensors
        </span>
        <span className={`status-pill status-pill-${severity}`} style={{ marginLeft: '12px', fontSize: '13px', padding: '6px 14px' }}>
           {severity === 'warning' && <span style={{marginRight: '6px'}}>⚠️</span>}
           {severity === 'critical' && <span style={{marginRight: '6px'}}>🚨</span>}
           {statusLabel}
        </span>
      </header>

      <section className="leak-history-section">
        <Card className="panel-card" style={{ padding: 0, overflow: 'hidden' }}>
          <div className="panel-header" style={{ padding: '24px 24px 16px' }}>
            <h3 className="panel-title">Leak History &mdash; Last 30 Days</h3>
          </div>
          <GrafanaPlaceholder />
        </Card>
        <p style={{ marginTop: '12px', fontSize: '13px', color: '#64748b' }}>
          Source: Grafana &middot; {city.name} SCADA &middot; 15-min intervals
        </p>
      </section>

      <div className="district-details-layout" style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1fr)', gap: '24px' }}>
        <section className="sensor-data-section">
          <h3 style={{ fontSize: '18px', fontWeight: 700, color: '#0f172a', marginBottom: '16px' }}>
            Sensor Data &ndash; Real-time & Historical
          </h3>
          <div className="sensor-charts-grid" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {sensors.map(sensor => (
              <SensorChart key={sensor.id} sensor={sensor} />
            ))}
          </div>
        </section>

        <section className="leakage-probability-section">
          <h3 style={{ fontSize: '18px', fontWeight: 700, color: '#0f172a', marginBottom: '16px' }}>
            Leakage Probability &ndash; Status History
          </h3>
          <Card className="panel-card" style={{ height: 'calc(100% - 44px)', minHeight: '300px', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px', boxSizing: 'border-box' }}>
            <p style={{ color: '#cbd5e1', fontSize: '14px', textAlign: 'center' }}>
              status History Chart showing the probability of leakage
            </p>
          </Card>
        </section>
      </div>

      <section className="sensor-status-section">
        <h3 style={{ fontSize: '18px', fontWeight: 700, color: '#0f172a', marginBottom: '16px' }}>
          Sensor Status
        </h3>
        <Card className="panel-card" style={{ padding: '24px' }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', marginBottom: '16px' }}>
            {sensors.map(sensor => (
              <SensorStatusCard key={sensor.id} sensor={sensor} />
            ))}
          </div>
          <div style={{
            border: '1px dashed #cbd5e1',
            borderRadius: '8px',
            padding: '12px',
            textAlign: 'center',
            color: '#94a3b8',
            fontSize: '13px',
            backgroundColor: '#f8fafc'
          }}>
            + additional sensors render here
          </div>
        </Card>
      </section>
    </div>
  );
};

export default DistrictDetails;
