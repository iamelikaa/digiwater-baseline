import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import TopBar from '../components/TopBar';
import Card from '../components/Card';
import OverviewStatusCards from '../components/OverviewStatusCards';
import NetworkOverviewPanel from '../components/NetworkOverviewPanel';
import RecentLeakEventsSection from '../components/RecentLeakEventsSection';
import Aqueduct from './Aqueduct';
import { districts, type District } from '../data/mockData';

export const Overview: React.FC = () => {
  const { cityId } = useParams<{ cityId: string }>();
  const [activeItemId, setActiveItemId] = useState<string>(cityId || 'overview');
  const [activeTitle, setActiveTitle] = useState<string>('Overview');

  useEffect(() => {
    if (cityId) {
      const district = districts.find(d => d.id === cityId);
      if (district) {
        setActiveItemId(cityId);
        setActiveTitle(district.name);
      }
    } else {
      setActiveItemId('overview');
      setActiveTitle('Overview');
    }
  }, [cityId]);

  const handleSelectItem = (id: string, title: string) => {
    setActiveItemId(id);
    setActiveTitle(title);
  };

  const handleSelectDistrict = (district: District) => {
    setActiveItemId(district.id);
    setActiveTitle(district.name);
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
              <NetworkOverviewPanel onSelectDistrict={handleSelectDistrict} />
              <RecentLeakEventsSection />
            </div>
          ) : cityId && activeItemId === cityId ? (
            <Aqueduct cityId={cityId} />
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
