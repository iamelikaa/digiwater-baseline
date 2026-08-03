import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import TopBar from '../components/TopBar';
import Card from '../components/Card';
import OverviewStatusCards from '../components/OverviewStatusCards';

export const Overview: React.FC = () => {
  const [activeItemId, setActiveItemId] = useState<string>('overview');
  const [activeTitle, setActiveTitle] = useState<string>('Overview');

  const handleSelectItem = (id: string, title: string) => {
    setActiveItemId(id);
    setActiveTitle(title);
  };

  return (
    <div className="dashboard-shell">
      <Sidebar activeItemId={activeItemId} onSelectItem={handleSelectItem} />
      <div className="dashboard-main">
        <TopBar title={activeTitle} />
        <main className="dashboard-content">
          {activeItemId === 'overview' ? (
            <div className="overview-dashboard">
              <OverviewStatusCards />
              <Card className="overview-welcome-card">
                <h2>Network Overview</h2>
                <p className="placeholder-text">
                  Welcome to the control room dashboard. Select a municipality or district from the
                  left navigation to inspect telemetry, sensor statuses, and hydraulic models.
                </p>
              </Card>
            </div>
          ) : (
            <Card className="content-placeholder-card">
              <h2>{activeTitle}</h2>
              <p className="placeholder-text">
                Monitoring dashboard prototype — select an item from the navigation menu.
              </p>
            </Card>
          )}
        </main>
      </div>
    </div>
  );
};

export default Overview;
