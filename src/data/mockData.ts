export interface District {
  id: string;
  name: string;
  status: "normal" | "anomaly";
  issueType?: "sensor" | "leakage";
  severity?: "warning" | "critical";
  lat: number;
  lng: number;
  parentId?: string; // present for districts nested under a comune group (e.g. Marene's frazioni)
  sensorCount?: number;
  leakageProbability?: number;
  lastSensorUpdate?: string;
}

// Illustrative, approximate coordinates for the Marene aqueduct area (Cuneo province, Piedmont) --
// not sourced from an official geographic dataset, consistent with districtBoundaries.ts.
// Marene groups its 7 frazioni (Marconi, Sperina, Pellaverne, Ponte, Salza, Rame, Concentrico);
// Cavallermaggiore, Fossano, and Savigliano are separate top-level comuni with no sub-districts.
export const districts: District[] = [
  { id: "marene", name: "Marene", status: "normal", lat: 44.6906, lng: 7.6947, leakageProbability: 74, lastSensorUpdate: "15 min ago" },
  { id: "marconi", name: "Marconi", status: "anomaly", issueType: "leakage", severity: "critical", lat: 44.694, lng: 7.7, parentId: "marene", sensorCount: 6, leakageProbability: 74, lastSensorUpdate: "15 min ago" },
  { id: "pellaverne", name: "Pellaverne", status: "anomaly", issueType: "sensor", severity: "warning", lat: 44.693, lng: 7.686, parentId: "marene", sensorCount: 5, leakageProbability: 12, lastSensorUpdate: "15 min ago" },
  { id: "ponte", name: "Ponte", status: "normal", lat: 44.688, lng: 7.699, parentId: "marene", sensorCount: 5, leakageProbability: 8, lastSensorUpdate: "15 min ago" },
  { id: "sperina", name: "Sperina", status: "normal", lat: 44.687, lng: 7.69, parentId: "marene", sensorCount: 4, leakageProbability: 6, lastSensorUpdate: "15 min ago" },
  { id: "salza", name: "Salza", status: "normal", lat: 44.684, lng: 7.694, parentId: "marene", sensorCount: 4, leakageProbability: 3, lastSensorUpdate: "15 min ago" },
  { id: "concentrico", name: "Concentrico", status: "normal", lat: 44.6906, lng: 7.6947, parentId: "marene", sensorCount: 8, leakageProbability: 2, lastSensorUpdate: "15 min ago" },
  { id: "rame", name: "Rame", status: "normal", lat: 44.695, lng: 7.692, parentId: "marene", sensorCount: 5, leakageProbability: 1, lastSensorUpdate: "15 min ago" },
  { id: "cavallermaggiore", name: "Cavallermaggiore", status: "anomaly", issueType: "leakage", severity: "warning", lat: 44.7737, lng: 7.6494, sensorCount: 24, leakageProbability: 35, lastSensorUpdate: "20 min ago" },
  { id: "fossano", name: "Fossano", status: "normal", lat: 44.5495, lng: 7.7233, sensorCount: 56, leakageProbability: 4, lastSensorUpdate: "5 min ago" },
  { id: "savigliano", name: "Savigliano", status: "normal", lat: 44.6425, lng: 7.6595, sensorCount: 38, leakageProbability: 7, lastSensorUpdate: "10 min ago" },
];

export interface LeakReport {
  id: string;
  city: string;
  district: string;
  address: string;
  date: string;
  type: "INTERNAL" | "EXTERNAL";
  material?: string;
  diameter?: string;
  reportedBy: string;
  notes?: string;
}

export const leakReports: LeakReport[] = [];
