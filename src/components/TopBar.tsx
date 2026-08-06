import React from 'react';
import { currentUser } from '../data/mockData';

export interface TopBarProps {
  title: string;
}

export const TopBar: React.FC<TopBarProps> = ({ title }) => {
  return (
    <header className="topbar">
      <div className="topbar-left">
        <h1 className="topbar-title">{title}</h1>
      </div>
      <div className="topbar-right">
        <div className="user-identity" aria-label="User identity">
          <div className="user-avatar" aria-hidden="true">
            {currentUser.initials}
          </div>
          <div className="user-info">
            <span className="user-email">{currentUser.email}</span>
            <span className="user-role">{currentUser.role}</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default TopBar;
