import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import DashboardLayout from './components/DashboardLayout';
import Overview from './pages/Overview';
import Aqueduct from './pages/Aqueduct';
import DistrictDetails from './pages/DistrictDetails';
import ReportLeak from './pages/ReportLeak';
import LeakHistory from './pages/LeakHistory';
import Settings from './pages/Settings';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />

        {/* DashboardLayout renders the sidebar/topbar/chat shell once and
            hands the matched child route to <Outlet /> — each page below
            is now a real, independently routed page instead of a branch
            inside one big component. */}
        <Route element={<DashboardLayout />}>
          <Route path="/overview" element={<Overview />} />
          <Route path="/aqueduct/:cityId" element={<Aqueduct />} />
          <Route path="/aqueduct/:cityId/:districtId" element={<DistrictDetails />} />
          <Route path="/report-leak" element={<ReportLeak />} />
          <Route path="/leak-history" element={<LeakHistory />} />
          <Route path="/settings" element={<Settings />} />
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
