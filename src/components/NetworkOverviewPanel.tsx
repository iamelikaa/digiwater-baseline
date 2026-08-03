import React from 'react';
import OverviewMap from './OverviewMap';
import IssuesTable from './IssuesTable';
import type { District } from '../data/mockData';

export interface NetworkOverviewPanelProps {
  onSelectDistrict?: (district: District) => void;
}

export const NetworkOverviewPanel: React.FC<NetworkOverviewPanelProps> = ({
  onSelectDistrict,
}) => {
  return (
    <section className="network-overview-panel" aria-label="Network Map and Issues Overview">
      <OverviewMap onSelectDistrict={onSelectDistrict} />
      <IssuesTable onSelectDistrict={onSelectDistrict} />
    </section>
  );
};

export default NetworkOverviewPanel;
