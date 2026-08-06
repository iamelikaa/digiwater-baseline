import React, { useMemo } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Tooltip,
  Filler,
  type ChartData,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import Card from './Card';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
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
  const base = type === 'flow' ? 60 : 10;
  const amplitude = type === 'flow' ? 20 : 3;
  const noise = type === 'flow' ? 3 : 0.5;
  const real: number[] = [];
  const predicted: number[] = [];
  
  // Phase offset so trough is overnight and peak is mid-day
  const offset = Math.PI / 2;

  for (let i = 0; i < 24; i++) {
    // Diurnal cycle simulating daily usage
    const cyclicalValue = base + amplitude * Math.sin((i / 24) * Math.PI * 2 - offset);
    const valueWithNoise = cyclicalValue + (Math.random() * noise - noise / 2);
    
    real.push(valueWithNoise);
    // Predicted tracks closely to real
    predicted.push(valueWithNoise + (Math.random() * (noise * 1.5) - (noise * 0.75)));
  }
  
  return { real, predicted };
};

export const SensorChart: React.FC<SensorChartProps> = ({ sensor }) => {
  const data = useMemo(() => generateMockData(sensor.type), [sensor.type]);
  const labels = useMemo(() => Array.from({ length: 24 }, (_, i) => `${i}:00`), []);
  
  const isFlow = sensor.type === 'flow';
  const colorMain = isFlow ? '#1b65b2' : '#5bb398';
  const colorBarFill = colorMain + '99'; // ~60% opacity
  const colorPred = '#94a3b8'; // slate-400

  const latestReal = data.real[data.real.length - 1].toFixed(0);

  const chartData = {
    labels,
    datasets: [
      {
        type: 'bar' as const,
        label: 'Real value',
        data: data.real,
        backgroundColor: colorBarFill,
        borderRadius: 4,
        borderWidth: 0,
      },
      {
        type: 'line' as const,
        label: 'Predicted',
        data: data.predicted,
        borderColor: colorPred,
        backgroundColor: colorPred,
        borderWidth: 2,
        borderDash: [4, 4],
        pointRadius: 0,
        pointHoverRadius: 0,
        tension: 0.35,
        fill: false,
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
        {/* This is a mixed bar+line chart; react-chartjs-2's <Bar> type only
            describes single-type "bar" datasets, so the combined data shape
            (bar + line dataset) needs an explicit cast here. */}
        <Bar data={chartData as ChartData<'bar', number[], string>} options={options as any} />
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
