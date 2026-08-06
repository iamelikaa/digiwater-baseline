import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import TopBar from './TopBar';
import ChatAssistant from './ChatAssistant';
import { useActiveNav } from '../hooks/useActiveNav';

/**
 * Shared shell for every authenticated page: sidebar + topbar + chat widget,
 * with the actual page content rendered by React Router into <Outlet />.
 * Replaces the old approach where a single Overview component manually
 * decided which "page" to render via an if/else chain.
 */
export const DashboardLayout: React.FC = () => {
  const { activeTitle } = useActiveNav();

  return (
    <div className="dashboard-shell">
      <Sidebar />
      <div className="dashboard-main">
        <TopBar title={activeTitle} />
        <main className="dashboard-content">
          <Outlet />
        </main>
      </div>
      <ChatAssistant />
    </div>
  );
};

export default DashboardLayout;
