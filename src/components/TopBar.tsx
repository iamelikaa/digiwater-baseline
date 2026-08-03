import React from 'react';

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
            OP
          </div>
          <div className="user-info">
            <span className="user-email">operator@digiwater.it</span>
            <span className="user-role">Operator</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default TopBar;
