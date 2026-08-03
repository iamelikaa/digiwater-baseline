import React from 'react';

export interface GrafanaPlaceholderProps {
  title?: string;
  timeRange?: string;
  height?: number | string;
  className?: string;
  children?: React.ReactNode;
}

/**
 * GRAFANA SCREENSHOT PLACEHOLDER
 * Static frontend-only placeholder representing an embedded Grafana telemetry dashboard
 * (per Task 02.4 instructions and for reuse in City/District Details pages in Tasks 03.1 & 04.1).
 */
export const GrafanaPlaceholder: React.FC<GrafanaPlaceholderProps> = ({
  title = 'Dashboards › Smart Digital Water › Main',
  timeRange = 'Last 30 days',
  height = 420,
  className = '',
  children,
}) => {
  const combinedClassName = className ? `grafana-placeholder ${className}` : 'grafana-placeholder';
  const containerStyle = typeof height === 'number' ? { minHeight: `${height}px` } : { minHeight: height };

  return (
    <div className={combinedClassName} style={containerStyle} aria-label="Grafana Dashboard Placeholder">
      {/* Top Grafana Navigation Bar */}
      <div className="grafana-top-bar">
        <div className="grafana-top-left">
          <span className="grafana-menu-icon" aria-hidden="true">
            &#9776;
          </span>
          <span className="grafana-logo-icon" aria-hidden="true">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="12" r="10" fill="#F05A28" />
              <path
                d="M12 6C8.68629 6 6 8.68629 6 12C6 15.3137 8.68629 18 12 18C15.3137 18 18 15.3137 18 12"
                stroke="#FFFFFF"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
              <circle cx="12" cy="12" r="3" fill="#FFFFFF" />
            </svg>
          </span>
          <span className="grafana-breadcrumb">
            {title} <span className="grafana-star">&#9734;</span>
          </span>
        </div>

        <div className="grafana-top-right">
          <div className="grafana-search-pill">
            <span aria-hidden="true">&#128269;</span>
            <span>Search...</span>
            <kbd>ctrl+k</kbd>
          </div>
          <div className="grafana-timerange-pill">
            <span>&#171;</span>
            <span>&#128340; {timeRange}</span>
            <span>&#187;</span>
          </div>
          <button type="button" className="grafana-btn grafana-btn-secondary">
            Refresh
          </button>
          <button type="button" className="grafana-btn grafana-btn-primary">
            Share
          </button>
        </div>
      </div>

      {/* Body Content / Mockup Preview */}
      <div className="grafana-body">
        {children ? (
          children
        ) : (
          <div className="grafana-mockup-surface">
            {/* Top KPI row imitating screenshot badges */}
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
            </div>

            {/* Visual placeholder graphic & caption */}
            <div className="grafana-placeholder-graphic">
              <div className="placeholder-icon-circle">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M3 3V21H21"
                    stroke="#5BB398"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M7 14L11 10L15 13L20 7"
                    stroke="#5BB398"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <h4 className="placeholder-heading">Grafana Telemetry &amp; Leakage View</h4>
              <p className="placeholder-description">
                Embedded SCADA monitoring dashboard surface — displaying 30-day aggregated leak
                detection telemetry across all municipalities (static prototype placeholder).
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default GrafanaPlaceholder;
