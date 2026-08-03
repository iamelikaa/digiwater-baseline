import React from 'react';
import leakEventsPlaceholderImg from '../assets/leak-events-placeholder.png';

export interface GrafanaPlaceholderProps {
  title?: string;
  timeRange?: string;
  height?: number | string;
  className?: string;
  children?: React.ReactNode;
}

/**
 * GRAFANA SCREENSHOT PLACEHOLDER
 * Genuinely static frontend-only placeholder representing an embedded Grafana telemetry dashboard
 * (per Task 02.4 instructions and for reuse in City/District Details pages in Tasks 03.1 & 04.1).
 */
export const GrafanaPlaceholder: React.FC<GrafanaPlaceholderProps> = ({
  height,
  className = '',
  children,
}) => {
  const combinedClassName = className ? `grafana-placeholder-wrapper ${className}` : 'grafana-placeholder-wrapper';
  const containerStyle = typeof height === 'number' ? { minHeight: `${height}px` } : height ? { minHeight: height } : undefined;

  return (
    <div className={combinedClassName} style={containerStyle} aria-label="Grafana Dashboard Placeholder">
      {children ? (
        children
      ) : (
        <img
          src={leakEventsPlaceholderImg}
          alt="Grafana Telemetry Dashboard Static Placeholder"
          className="grafana-placeholder-image"
        />
      )}
    </div>
  );
};

export default GrafanaPlaceholder;
