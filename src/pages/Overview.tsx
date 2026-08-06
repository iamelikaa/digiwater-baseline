import React from 'react';
import { useNavigate } from 'react-router-dom';
import OverviewStatusCards from '../components/OverviewStatusCards';
import NetworkOverviewPanel from '../components/NetworkOverviewPanel';
import RecentLeakEventsSection from '../components/RecentLeakEventsSection';
import type { District } from '../data/mockData';

export const Overview: React.FC = () => {
  const navigate = useNavigate();

  const handleSelectDistrict = (district: District) => {
    if (district.parentId) {
      navigate(`/aqueduct/${district.parentId}/${district.id}`);
    } else {
      navigate(`/aqueduct/${district.id}`);
    }
  };

  return (
    <div className="overview-dashboard">
      <OverviewStatusCards />
      <NetworkOverviewPanel onSelectDistrict={handleSelectDistrict} />
      <RecentLeakEventsSection />
    </div>
  );
};

export default Overview;
