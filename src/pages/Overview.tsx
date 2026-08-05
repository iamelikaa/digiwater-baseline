import React, { useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import TopBar from '../components/TopBar';
import Card from '../components/Card';
import OverviewStatusCards from '../components/OverviewStatusCards';
import NetworkOverviewPanel from '../components/NetworkOverviewPanel';
import RecentLeakEventsSection from '../components/RecentLeakEventsSection';
import Aqueduct from './Aqueduct';
import DistrictDetails from './DistrictDetails';
import ReportLeak from './ReportLeak';
import { districts, type District } from '../data/mockData';

export const Overview: React.FC = () => {
  const { cityId, districtId } = useParams<{ cityId: string; districtId: string }>();
  const location = useLocation();
  const [activeItemId, setActiveItemId] = useState<string>(districtId || cityId || 'overview');
  const [activeTitle, setActiveTitle] = useState<string>('Overview');

  useEffect(() => {
    if (location.pathname === '/report-leak') {
      setActiveItemId('report-leak');
      setActiveTitle('Report Leak');
    } else if (districtId) {
      const district = districts.find(d => d.id === districtId);
      if (district) {
        setActiveItemId(districtId);
        setActiveTitle(district.name);
      }
    } else if (cityId) {
      const city = districts.find(d => d.id === cityId);
      if (city) {
        setActiveItemId(cityId);
        setActiveTitle(city.name);
      }
    } else {
      setActiveItemId('overview');
      setActiveTitle('Overview');
    }
  }, [cityId, districtId, location.pathname]);

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
          ) : districtId && activeItemId === districtId ? (
            <DistrictDetails cityId={cityId!} districtId={districtId} />
          ) : cityId && activeItemId === cityId ? (
            <Aqueduct cityId={cityId} />
          ) : activeItemId === 'report-leak' ? (
            <ReportLeak />
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
