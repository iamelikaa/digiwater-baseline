import React from 'react';
import { districts } from '../data/mockData';
import type { District } from '../data/mockData';
import { getEffectiveStatus } from '../utils/statusHelpers';

export interface IssuesTableProps {
  onSelectDistrict?: (district: District) => void;
}

export const IssuesTable: React.FC<IssuesTableProps> = ({ onSelectDistrict }) => {
  const anomalyDistricts = districts.filter((d) => getEffectiveStatus(d) === 'anomaly');
  const totalDistricts = districts.length;
  const issuesCount = anomalyDistricts.length;

  const getParentName = (d: District): string => {
    if (d.parentId) {
      const parent = districts.find((p) => p.id === d.parentId);
      return parent ? parent.name : d.parentId;
    }
    return d.name;
  };

  return (
    <div className="panel-card issues-table-panel">
      <div className="panel-header">
        <h3 className="panel-title">Districts with Issues</h3>
        <p className="panel-subtitle">Only districts with active warnings or anomalies are shown</p>
      </div>

      {issuesCount === 0 ? (
        <div className="issues-empty-state">
          <div className="empty-state-icon">✓</div>
          <h4 className="empty-state-title">All Systems Normal</h4>
          <p className="empty-state-text">
            No active anomalies or telemetry warnings detected across all monitored districts.
          </p>
        </div>
      ) : (
        <>
          <div className="table-responsive-wrapper">
            <table className="issues-table">
              <thead>
                <tr>
                  <th>MUNICIPALITY</th>
                  <th>ISSUE TYPE</th>
                  <th>DISTRICT</th>
                  <th>STATUS</th>
                </tr>
              </thead>
              <tbody>
                {anomalyDistricts.map((d) => (
                  <tr
                    key={d.id}
                    className="issue-row issue-row-warning"
                    onClick={() => onSelectDistrict && onSelectDistrict(d)}
                    tabIndex={0}
                    role="button"
                    aria-label={`Inspect anomaly in ${d.name}`}
                  >
                    <td className="cell-municipality">
                      <span className="issue-row-accent" aria-hidden="true" />
                      <span className="municipality-name">{getParentName(d)}</span>
                    </td>
                    <td className="cell-issue-type">Sensor Anomaly</td>
                    <td className="cell-district">{d.parentId ? d.name : '—'}</td>
                    <td className="cell-status">
                      <span className="status-pill status-pill-warning">Anomaly</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="issues-footer">
            <span className="info-badge-icon" aria-hidden="true">
              i
            </span>
            <span className="footer-summary-text">
              {issuesCount} out of {totalDistricts} districts have active issues
            </span>
          </div>
        </>
      )}
    </div>
  );
};

export default IssuesTable;
