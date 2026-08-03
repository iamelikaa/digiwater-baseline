import React from 'react';
import { MapContainer, TileLayer, Polygon, Tooltip, Popup } from 'react-leaflet';
import { districts } from '../data/mockData';
import type { District } from '../data/mockData';
import { getEffectiveStatus, isParentMunicipality } from '../utils/statusHelpers';

export interface OverviewMapProps {
  onSelectDistrict?: (district: District) => void;
}

function generateHexagonPolygon(lat: number, lng: number, radiusDeg: number): [number, number][] {
  const points: [number, number][] = [];
  for (let i = 0; i < 6; i++) {
    const angleRad = (i * Math.PI) / 3;
    const dLat = radiusDeg * Math.sin(angleRad);
    const dLng = (radiusDeg * Math.cos(angleRad)) / 0.71;
    points.push([lat + dLat, lng + dLng]);
  }
  return points;
}

export const OverviewMap: React.FC<OverviewMapProps> = ({ onSelectDistrict }) => {
  const getRadiusForDistrict = (d: District): number => {
    if (isParentMunicipality(d)) {
      return 0.016; // Parent municipality (e.g. Marene boundary)
    }
    if (d.parentId) {
      return 0.0035; // Nested child DMA district
    }
    return 0.012; // Standalone municipality (e.g. Cavallermaggiore, Fossano, Savigliano)
  };

  const getPathOptions = (d: District) => {
    const status = getEffectiveStatus(d);
    const isParent = isParentMunicipality(d);

    if (status === 'anomaly') {
      return {
        fillColor: '#ef4444',
        color: '#dc2626',
        weight: isParent ? 1.5 : 2.5,
        fillOpacity: isParent ? 0.2 : 0.65,
        dashArray: isParent ? '5, 5' : undefined,
      };
    }

    return {
      fillColor: '#10b981',
      color: '#059669',
      weight: isParent ? 1.5 : 2,
      fillOpacity: isParent ? 0.15 : 0.45,
      dashArray: isParent ? '5, 5' : undefined,
    };
  };

  return (
    <div className="panel-card overview-map-panel">
      <div className="panel-header">
        <h3 className="panel-title">Districts Overview Map</h3>
        <p className="panel-subtitle">District shapes colored by health status</p>
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
          {districts.map((d) => {
            const positions = generateHexagonPolygon(d.lat, d.lng, getRadiusForDistrict(d));
            const status = getEffectiveStatus(d);
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
                    <span className={`map-tooltip-status status-pill-${status}`}>
                      {status === 'anomaly' ? 'Anomaly' : 'Normal'}
                    </span>
                  </div>
                </Tooltip>
                <Popup>
                  <div className="map-popup-content">
                    <h4>{d.name}</h4>
                    <p className="popup-status-row">
                      Status:{' '}
                      <strong className={`status-text-${status}`}>
                        {status === 'anomaly' ? 'Anomaly Detected' : 'Normal Operational'}
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
