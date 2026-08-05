import React, { useMemo } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Filler,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import Card from './Card';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Filler
);

export interface SensorInfo {
  id: string;
  name: string;
  type: 'flow' | 'pressure';
  unit: string;
}

export interface SensorChartProps {
  sensor: SensorInfo;
}

const generateMockData = (type: 'flow' | 'pressure') => {
  const base = type === 'flow' ? 70 : 10;
  const variance = type === 'flow' ? 10 : 2;
  const real: number[] = [];
  const predicted: number[] = [];
  
  // Create a somewhat continuous stepped look
  let currentReal = base;
  for (let i = 0; i < 24; i++) {
    currentReal = currentReal + (Math.random() * variance - variance / 2);
    real.push(currentReal);
    // Predicted is slightly offset
    predicted.push(currentReal + (Math.random() * (variance / 2) - variance / 4));
  }
  
  return { real, predicted };
};

export const SensorChart: React.FC<SensorChartProps> = ({ sensor }) => {
  const data = useMemo(() => generateMockData(sensor.type), [sensor.type]);
  const labels = useMemo(() => Array.from({ length: 24 }, (_, i) => `${i}:00`), []);
  
  const isFlow = sensor.type === 'flow';
  const colorMain = isFlow ? '#3b82f6' : '#22c55e'; // blue or green
  const colorPred = '#94a3b8'; // slate-400

  const latestReal = data.real[data.real.length - 1].toFixed(0);

  const chartData = {
    labels,
    datasets: [
      {
        label: 'Real value',
        data: data.real,
        borderColor: colorMain,
        backgroundColor: colorMain,
        stepped: 'middle' as const,
        borderWidth: 4,
        pointRadius: 0,
        pointHoverRadius: 0,
        tension: 0,
      },
      {
        label: 'Predicted',
        data: data.predicted,
        borderColor: colorPred,
        backgroundColor: colorPred,
        stepped: 'middle' as const,
        borderWidth: 4,
        pointRadius: 0,
        pointHoverRadius: 0,
        tension: 0,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false, // We'll build a custom HTML legend below
      },
      tooltip: {
        enabled: false,
      },
    },
    scales: {
      x: {
        display: false,
      },
      y: {
        display: false,
        min: Math.min(...data.real, ...data.predicted) - 5,
        max: Math.max(...data.real, ...data.predicted) + 5,
      },
    },
    layout: {
      padding: 0
    },
    animation: {
      duration: 0
    }
  };

  return (
    <Card className="sensor-chart-card" style={{ padding: '20px' }}>
      <div className="sensor-header" style={{ marginBottom: '16px' }}>
        <h4 style={{ margin: 0, fontSize: '16px', fontWeight: 700, color: '#0f172a' }}>{sensor.name}</h4>
        <div style={{ color: '#94a3b8', fontSize: '13px', marginTop: '4px' }}>
          Unit: {sensor.unit} &middot; Last 24h
        </div>
      </div>
      
      <div className="sensor-chart-wrapper" style={{ height: '140px', backgroundColor: '#f8fafc', borderRadius: '8px', padding: '16px 0', marginBottom: '16px' }}>
        <Line data={chartData} options={options as any} />
      </div>

      <div className="sensor-footer">
        <div style={{ color: colorMain, fontSize: '15px', fontWeight: 700, marginBottom: '4px' }}>
          Latest: {latestReal} {sensor.unit}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', fontSize: '12px', color: '#94a3b8', fontWeight: 500 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <div style={{ width: '12px', height: '4px', backgroundColor: colorMain, borderRadius: '2px' }}></div>
            Real value
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <div style={{ width: '12px', height: '4px', backgroundColor: colorPred, borderRadius: '2px' }}></div>
            Predicted
          </div>
        </div>
      </div>
    </Card>
  );
};

export default SensorChart;
