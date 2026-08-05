import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { districts } from '../data/mockData';
import type { District } from '../data/mockData';

export interface SidebarProps {
  activeItemId: string;
  onSelectItem: (id: string, title: string) => void;
}

const OverviewIcon: React.FC = () => (
  <svg className="nav-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect x="3" y="3" width="7" height="7" rx="1" />
    <rect x="14" y="3" width="7" height="7" rx="1" />
    <rect x="14" y="14" width="7" height="7" rx="1" />
    <rect x="3" y="14" width="7" height="7" rx="1" />
  </svg>
);

const AqueductIcon: React.FC = () => (
  <svg className="nav-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M3 6l6-3 6 3 6-3v15l-6 3-6-3-6 3V6z" />
    <path d="M9 3v15" />
    <path d="M15 6v15" />
  </svg>
);

const ReportLeakIcon: React.FC = () => (
  <svg className="nav-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
    <rect x="8" y="2" width="8" height="4" rx="1" />
    <line x1="12" y1="11" x2="12" y2="15" />
    <line x1="12" y1="18" x2="12.01" y2="18" />
  </svg>
);

const LeakHistoryIcon: React.FC = () => (
  <svg className="nav-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <circle cx="12" cy="12" r="10" />
    <polyline points="12 6 12 12 16 14" />
  </svg>
);

const SettingsIcon: React.FC = () => (
  <svg className="nav-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <circle cx="12" cy="12" r="3" />
    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
  </svg>
);

const ChevronIcon: React.FC<{ expanded: boolean }> = ({ expanded }) => (
  <svg
    className={`nav-chevron ${expanded ? 'expanded' : ''}`}
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <polyline points="9 18 15 12 9 6" />
  </svg>
);

export const Sidebar: React.FC<SidebarProps> = ({ activeItemId, onSelectItem }) => {
  const navigate = useNavigate();
  const [isAqueductExpanded, setIsAqueductExpanded] = useState<boolean>(false);
  const [expandedMunicipality, setExpandedMunicipality] = useState<string | null>(null);

  const topLevelMunicipalities: District[] = districts.filter((d) => !d.parentId);
  const getChildDistricts = (parentId: string): District[] =>
    districts.filter((d) => d.parentId === parentId);

  const toggleAqueduct = () => {
    setIsAqueductExpanded((prev) => !prev);
  };

  const handleMunicipalityClick = (id: string, name: string, hasChildren: boolean) => {
    onSelectItem(id, name);
    setExpandedMunicipality((prev) => {
      if (hasChildren) {
        return prev === id ? null : id;
      }
      return null;
    });
    navigate(`/aqueduct/${id}`);
  };

  return (
    <aside className="sidebar" aria-label="Main sidebar">
      <div className="sidebar-header">
        <div className="sidebar-logo">
          <div className="app-mark" aria-hidden="true">
            DW
          </div>
          <span className="app-wordmark">DigiWater</span>
        </div>
      </div>

      <nav className="sidebar-nav" aria-label="Primary navigation">
        <ul className="nav-list">
          <li>
            <button
              type="button"
              className={`nav-item ${activeItemId === 'overview' ? 'active' : ''}`}
              onClick={() => onSelectItem('overview', 'Overview')}
            >
              <OverviewIcon />
              <span className="nav-label">Overview</span>
            </button>
          </li>

          <li>
            <button
              type="button"
              className="nav-item nav-item-expandable"
              onClick={toggleAqueduct}
              aria-expanded={isAqueductExpanded}
            >
              <AqueductIcon />
              <span className="nav-label">Aqueduct</span>
              <ChevronIcon expanded={isAqueductExpanded} />
            </button>

            <div className={`nav-expandable-container ${isAqueductExpanded ? 'expanded' : ''}`}>
              <ul className="nav-sublist">
                {topLevelMunicipalities.map((municipality) => {
                  const children = getChildDistricts(municipality.id);
                  const hasChildren = children.length > 0;
                  const isMunicipalityExpanded = expandedMunicipality === municipality.id;
                  const isMunicipalityActive = activeItemId === municipality.id;

                  return (
                    <li key={municipality.id}>
                      <button
                        type="button"
                        className={`nav-item nav-subitem ${isMunicipalityActive ? 'active' : ''}`}
                        onClick={() =>
                          handleMunicipalityClick(
                            municipality.id,
                            municipality.name,
                            hasChildren
                          )
                        }
                        aria-expanded={hasChildren ? isMunicipalityExpanded : undefined}
                      >
                        <span className="nav-label">{municipality.name}</span>
                        {hasChildren && <ChevronIcon expanded={isMunicipalityExpanded} />}
                      </button>

                      {hasChildren && (
                        <div className={`nav-expandable-container ${isMunicipalityExpanded ? 'expanded' : ''}`}>
                          <ul className="nav-sublist nav-nested-list">
                            {children.map((district) => {
                              const isDistrictActive = activeItemId === district.id;
                              return (
                                <li key={district.id}>
                                  <button
                                    type="button"
                                    className={`nav-item nav-nested-item ${
                                      isDistrictActive ? 'active' : ''
                                    }`}
                                    onClick={() => {
                                      onSelectItem(district.id, district.name);
                                      navigate(`/aqueduct/${municipality.id}/${district.id}`);
                                    }}
                                  >
                                    <span className="nav-label">{district.name}</span>
                                  </button>
                                </li>
                              );
                            })}
                          </ul>
                        </div>
                      )}
                    </li>
                  );
                })}
              </ul>
            </div>
          </li>

          <li>
            <button
              type="button"
              className={`nav-item ${activeItemId === 'report-leak' ? 'active' : ''}`}
              onClick={() => onSelectItem('report-leak', 'Report Leak')}
            >
              <ReportLeakIcon />
              <span className="nav-label">Report Leak</span>
            </button>
          </li>

          <li>
            <button
              type="button"
              className={`nav-item ${activeItemId === 'leak-history' ? 'active' : ''}`}
              onClick={() => onSelectItem('leak-history', 'Leak History')}
            >
              <LeakHistoryIcon />
              <span className="nav-label">Leak History</span>
            </button>
          </li>
        </ul>
      </nav>

      <div className="sidebar-footer">
        <hr className="sidebar-divider" />
        <button
          type="button"
          className={`nav-item ${activeItemId === 'settings' ? 'active' : ''}`}
          onClick={() => onSelectItem('settings', 'Settings')}
        >
          <SettingsIcon />
          <span className="nav-label">Settings</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
