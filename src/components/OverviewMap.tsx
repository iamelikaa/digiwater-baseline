import React from 'react';
import { MapContainer, TileLayer, Polygon, Tooltip, Popup } from 'react-leaflet';
import { districts } from '../data/mockData';
import type { District } from '../data/mockData';
import { districtBoundaries } from '../data/districtBoundaries.real';
import { getEffectiveSeverity } from '../utils/statusHelpers';

export interface OverviewMapProps {
  onSelectDistrict?: (district: District) => void;
}

export const OverviewMap: React.FC<OverviewMapProps> = ({ onSelectDistrict }) => {
  const topLevelDistricts = districts.filter((d) => !d.parentId);

  const getPathOptions = (d: District) => {
    const severity = getEffectiveSeverity(d);

    if (severity === 'critical') {
      return {
        fillColor: '#ef4444',
        color: '#dc2626',
        weight: 2,
        fillOpacity: 0.5,
      };
    }

    if (severity === 'warning') {
      return {
        fillColor: '#f59e0b',
        color: '#d97706',
        weight: 2,
        fillOpacity: 0.5,
      };
    }

    return {
      fillColor: '#10b981',
      color: '#059669',
      weight: 2,
      fillOpacity: 0.45,
    };
  };

  return (
    <div className="panel-card overview-map-panel">
      <div className="panel-header">
        <h3 className="panel-title">Cities Overview Map</h3>
        <p className="panel-subtitle">City shapes colored by health status</p>
      </div>
      <div className="overview-map-container">
        <MapContainer
          center={[44.66, 7.68]}
          zoom={11}
          scrollWheelZoom={true}
          className="overview-leaflet-map"
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {topLevelDistricts.map((d) => {
            const positions = districtBoundaries[d.name];
            if (!positions || positions.length === 0) {
              return null;
            }
            const severity = getEffectiveSeverity(d);
            const pathOpts = getPathOptions(d);

            return (
              <Polygon
                key={d.id}
                positions={positions}
                pathOptions={pathOpts}
                eventHandlers={{
                  click: () => onSelectDistrict && onSelectDistrict(d),
                }}
              >
                <Tooltip direction="top" offset={[0, -10]} opacity={0.95}>
                  <div className="map-tooltip-content">
                    <strong>{d.name}</strong>
                    <span className={`map-tooltip-status status-pill-${severity}`}>
                      {severity === 'critical'
                        ? 'Critical'
                        : severity === 'warning'
                          ? 'Warning'
                          : 'Normal'}
                    </span>
                  </div>
                </Tooltip>
                <Popup>
                  <div className="map-popup-content">
                    <h4>{d.name}</h4>
                    <p className="popup-status-row">
                      Status:{' '}
                      <strong className={`status-text-${severity}`}>
                        {severity === 'critical'
                          ? 'Critical Attention'
                          : severity === 'warning'
                            ? 'Warning Detected'
                            : 'Normal Operational'}
                      </strong>
                    </p>
                    {d.parentId && <p className="popup-parent-row">Parent: {d.parentId}</p>}
                    <p className="popup-coords">
                      Coords: {d.lat.toFixed(4)}, {d.lng.toFixed(4)}
                    </p>
                  </div>
                </Popup>
              </Polygon>
            );
          })}
        </MapContainer>
      </div>
    </div>
  );
};

export default OverviewMap;
