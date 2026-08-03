export interface District {
  id: string;
  name: string;
  status: "normal" | "anomaly";
  issueType?: "sensor" | "leakage";
  severity?: "warning" | "critical";
  lat: number;
  lng: number;
  parentId?: string; // present for districts nested under a comune group (e.g. Marene's frazioni)
}

// Illustrative, approximate coordinates for the Marene aqueduct area (Cuneo province, Piedmont) --
// not sourced from an official geographic dataset, consistent with districtBoundaries.ts.
// Marene groups its 7 frazioni (Marconi, Sperina, Pellaverne, Ponte, Salza, Rame, Concentrico);
// Cavallermaggiore, Fossano, and Savigliano are separate top-level comuni with no sub-districts.
export const districts: District[] = [
  { id: "marene", name: "Marene", status: "normal", lat: 44.6906, lng: 7.6947 },
  { id: "marconi", name: "Marconi", status: "normal", lat: 44.694, lng: 7.7, parentId: "marene" },
  { id: "sperina", name: "Sperina", status: "anomaly", issueType: "sensor", severity: "warning", lat: 44.687, lng: 7.69, parentId: "marene" },
  { id: "pellaverne", name: "Pellaverne", status: "normal", lat: 44.693, lng: 7.686, parentId: "marene" },
  { id: "ponte", name: "Ponte", status: "normal", lat: 44.688, lng: 7.699, parentId: "marene" },
  { id: "salza", name: "Salza", status: "normal", lat: 44.684, lng: 7.694, parentId: "marene" },
  { id: "rame", name: "Rame", status: "normal", lat: 44.695, lng: 7.692, parentId: "marene" },
  { id: "concentrico", name: "Concentrico", status: "normal", lat: 44.6906, lng: 7.6947, parentId: "marene" },
  { id: "cavallermaggiore", name: "Cavallermaggiore", status: "anomaly", issueType: "leakage", severity: "critical", lat: 44.7737, lng: 7.6494 },
  { id: "fossano", name: "Fossano", status: "normal", lat: 44.5495, lng: 7.7233 },
  { id: "savigliano", name: "Savigliano", status: "normal", lat: 44.6425, lng: 7.6595 },
];
