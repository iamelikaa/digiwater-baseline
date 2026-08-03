import React from 'react';
import { districts } from '../data/mockData';
import StatusCard from './StatusCard';
import { getEffectiveStatus } from '../utils/statusHelpers';

export const OverviewStatusCards: React.FC = () => {
  const topLevelCities = districts.filter((d) => !d.parentId);
  const monitoredCitiesCount = topLevelCities.length;

  const normalCities = topLevelCities.filter((d) => getEffectiveStatus(d) === 'normal');
  const normalCitiesCount = normalCities.length;

  const sensorIssues = districts.filter((d) => d.status === 'anomaly' && d.issueType === 'sensor');
  const sensorCount = sensorIssues.length;

  const leakageIssues = districts.filter((d) => d.status === 'anomaly' && d.issueType === 'leakage');
  const leakageCount = leakageIssues.length;

  const getLeakageLabel = (): string => {
    if (leakageCount === 0) {
      return 'No leakage warnings';
    }
    const firstIssue = leakageIssues[0];
    let cityName = firstIssue.name;
    if (firstIssue.parentId) {
      const parent = districts.find((d) => d.id === firstIssue.parentId);
      if (parent) {
        cityName = parent.name;
      }
    }
    return `High probability in ${cityName}`;
  };

  return (
    <section className="status-cards-grid" aria-label="Network Status Summary">
      <StatusCard
        caption="Monitored Cities"
        headline={monitoredCitiesCount}
        label="Cities actively monitored"
        variant="normal"
      />
      <StatusCard
        caption="Cities with no Issues"
        headline={normalCitiesCount}
        label="Fully operational"
        variant="normal"
      />
      <StatusCard
        caption="Sensor Data Warnings"
        headline={sensorCount}
        label="Sensor anomalies"
        variant="warning"
      />
      <StatusCard
        caption="Leakage Algorithm Warnings"
        headline={leakageCount}
        label={getLeakageLabel()}
        variant="alert"
      />
    </section>
  );
};

export default OverviewStatusCards;
