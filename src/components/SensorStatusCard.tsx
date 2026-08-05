import React from 'react';

export interface SensorStatusCardProps {
  sensor: {
    id: string;
    name: string;
    type: string;
    status: 'normal' | 'warning' | 'critical';
  };
}

const severityColors = {
  normal: '#10b981', // emerald-500
  warning: '#f59e0b', // amber-500
  critical: '#ef4444', // red-500
};

export const SensorStatusCard: React.FC<SensorStatusCardProps> = ({ sensor }) => {
  const accentColor = severityColors[sensor.status] || severityColors.normal;
  const statusLabel = sensor.status.charAt(0).toUpperCase() + sensor.status.slice(1);

  return (
    <div 
      className="sensor-status-card"
      style={{
        backgroundColor: '#f8fafc',
        borderRadius: '8px',
        padding: '16px',
        display: 'flex',
        flexDirection: 'column',
        borderLeft: `4px solid ${accentColor}`,
        minWidth: '160px',
        flex: '1 1 0',
      }}
    >
      <div style={{ fontWeight: 600, color: '#334155', fontSize: '15px', marginBottom: '4px' }}>
        {sensor.name.split(' ')[2] || sensor.name} {/* Extracting "S1" or just using name */}
      </div>
      <div style={{ color: '#94a3b8', fontSize: '13px', marginBottom: '12px' }}>
        {sensor.type.charAt(0).toUpperCase() + sensor.type.slice(1)}
      </div>
      <div style={{ width: '16px', height: '2px', backgroundColor: accentColor, marginBottom: '16px' }} />
      <div style={{ marginTop: 'auto' }}>
        <span className={`status-pill status-pill-${sensor.status}`} style={{ fontSize: '12px', padding: '4px 10px', backgroundColor: `${accentColor}15`, color: accentColor }}>
          {statusLabel}
        </span>
      </div>
    </div>
  );
};

export default SensorStatusCard;
