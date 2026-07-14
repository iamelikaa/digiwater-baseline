export interface District {
  id: string;
  name: string;
  status: "normal" | "anomaly";
  lat: number;
  lng: number;
}

export const districts: District[] = [
  { id: "d1", name: "Sperina", status: "anomaly", lat: 45.0703, lng: 7.6869 },
  { id: "d2", name: "Centro", status: "normal", lat: 45.0722, lng: 7.685 },
  { id: "d3", name: "Mirafiori", status: "normal", lat: 45.035, lng: 7.658 },
];
