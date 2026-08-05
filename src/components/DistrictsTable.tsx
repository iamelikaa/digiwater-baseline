import React from 'react';
import { useNavigate } from 'react-router-dom';
import { districts } from '../data/mockData';
import type { District } from '../data/mockData';
import { getEffectiveSeverity } from '../utils/statusHelpers';

export interface DistrictsTableProps {
  cityId: string;
}

export const DistrictsTable: React.FC<DistrictsTableProps> = ({ cityId }) => {
  const navigate = useNavigate();
  
  const city = districts.find(d => d.id === cityId);
  const childDistricts = districts.filter(d => d.parentId === cityId);
  
  const sortedDistricts = [...childDistricts].sort((a, b) => {
    const probA = a.leakageProbability || 0;
    const probB = b.leakageProbability || 0;
    return probB - probA; // Descending
  });

  const getSeverityForProbability = (prob: number) => {
    if (prob >= 50) return 'critical';
    if (prob >= 10) return 'warning';
    return 'normal';
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return '#dc2626'; // red
      case 'warning': return '#d97706'; // orange
      case 'normal': return '#059669'; // green
      default: return '#059669';
    }
  };

  const totalSensors = childDistricts.reduce((sum, d) => sum + (d.sensorCount || 0), 0);

  if (childDistricts.length === 0) {
    return (
      <div className="panel-card" style={{ marginTop: '24px' }}>
        <div className="panel-header">
          <h3 className="panel-title">Districts</h3>
        </div>
        <div className="issues-empty-state">
          <div className="empty-state-icon">ℹ️</div>
          <h4 className="empty-state-title">No Sub-districts</h4>
          <p className="empty-state-text">
            This municipality does not have any defined sub-districts.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="panel-card" style={{ marginTop: '24px', padding: '24px 0 0 0' }}>
      <div className="panel-header" style={{ padding: '0 24px' }}>
        <h3 className="panel-title">Districts</h3>
      </div>

      <div className="table-responsive-wrapper">
        <table className="issues-table">
          <thead>
            <tr>
              <th style={{ paddingLeft: '24px' }}>DISTRICT</th>
              <th>SENSORS</th>
              <th>LEAKAGE PROBABILITY</th>
              <th>LAST STATUS</th>
              <th style={{ paddingRight: '24px' }}>LAST SENSOR UPDATE</th>
            </tr>
          </thead>
          <tbody>
            {sortedDistricts.map((d) => {
              const prob = d.leakageProbability || 0;
              const probSeverity = getSeverityForProbability(prob);
              const statusSeverity = getEffectiveSeverity(d);
              const statusLabel = statusSeverity.charAt(0).toUpperCase() + statusSeverity.slice(1);

              return (
                <tr
                  key={d.id}
                  className="issue-row"
                  onClick={() => navigate(`/aqueduct/${cityId}/${d.id}`)}
                  tabIndex={0}
                  role="button"
                  aria-label={`View details for ${d.name}`}
                >
                  <td className="cell-municipality" style={{ paddingLeft: '24px' }}>
                    <span className="municipality-name" style={{ color: 'var(--color-primary-teal, #5bb398)' }}>{d.name}</span>
                  </td>
                  <td style={{ color: '#475569', fontWeight: 500 }}>{d.sensorCount || 0}</td>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <div className="probability-bar-track">
                        <div 
                          className="probability-bar-fill" 
                          style={{ 
                            width: `${Math.min(100, prob)}%`, 
                            backgroundColor: getSeverityColor(probSeverity) 
                          }} 
                        />
                      </div>
                      <span style={{ fontWeight: 700, fontSize: '14px', color: '#0f172a', width: '36px' }}>{prob} %</span>
                    </div>
                  </td>
                  <td>
                    <span className={`status-pill status-pill-${statusSeverity}`}>
                      {statusLabel}
                    </span>
                  </td>
                  <td style={{ paddingRight: '24px', color: '#64748b', fontSize: '13px' }}>
                    {d.lastSensorUpdate || 'Unknown'}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="districts-table-footer">
        {childDistricts.length} districts &middot; {totalSensors} sensors
      </div>
    </div>
  );
};

export default DistrictsTable;
