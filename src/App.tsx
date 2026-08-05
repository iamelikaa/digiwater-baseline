import { BrowserRouter, Routes, Route, Navigate, useParams } from 'react-router-dom';
import Login from './pages/Login';
import Overview from './pages/Overview';
import './App.css';

// Temporary stand-in for District Details (Task 04, not built yet). Prevents
// clicking a district row from silently bouncing to the Login page via the
// catch-all route below.
function DistrictDetailsPlaceholder() {
  const { cityId, districtId } = useParams();
  return (
    <div style={{ padding: '48px', textAlign: 'center', color: '#64748b' }}>
      <h2 style={{ color: '#0f172a' }}>District Details — coming soon</h2>
      <p>
        {districtId} ({cityId}) will be built in Task 04.
      </p>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/overview" element={<Overview />} />
        <Route path="/aqueduct/:cityId" element={<Overview />} />
        <Route path="/aqueduct/:cityId/:districtId" element={<DistrictDetailsPlaceholder />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
