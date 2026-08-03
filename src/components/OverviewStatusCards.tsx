import React from 'react';
import { districts } from '../data/mockData';
import StatusCard from './StatusCard';

export const OverviewStatusCards: React.FC = () => {
  const totalMonitored = districts.length;
  const normalDistricts = districts.filter((d) => d.status === 'normal');
  const anomalyDistricts = districts.filter((d) => d.status === 'anomaly');

  const normalCount = normalDistricts.length;
  const anomalyCount = anomalyDistricts.length;

  const anomalyLabel =
    anomalyCount === 0
      ? 'No anomalies detected'
      : anomalyCount === 1
        ? `Anomaly in ${anomalyDistricts[0].name}`
        : `${anomalyCount} districts require review`;

  const overallLabel =
    anomalyCount === 0
      ? 'All systems normal'
      : anomalyCount === 1
        ? '1 anomaly requires attention'
        : `${anomalyCount} anomalies require attention`;

  return (
    <section className="status-cards-grid" aria-label="Network Status Summary">
      <StatusCard
        caption="Monitored Districts"
        headline={totalMonitored}
        label="Districts actively monitored"
        variant="normal"
      />
      <StatusCard
        caption="Districts with No Issues"
        headline={normalCount}
        label="Fully operational"
        variant="normal"
      />
      <StatusCard
        caption="Districts with Anomaly"
        headline={anomalyCount}
        label={anomalyLabel}
        variant="warning"
      />
      <StatusCard
        caption="Network Status"
        headline={anomalyCount > 0 ? 'Attention' : 'Normal'}
        label={overallLabel}
        variant={anomalyCount > 0 ? 'alert' : 'normal'}
      />
    </section>
  );
};

export default OverviewStatusCards;
