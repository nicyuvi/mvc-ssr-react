import { Routes, Route } from 'react-router-dom';
import DashboardPage from './DashboardPage';
import SettingsPage from './settings/SettingsPage';

export const DashboardRoutes = () => {
  return (
    <Routes>
      <Route index element={<DashboardPage />} />
      <Route path="settings" element={<SettingsPage />} />
    </Routes>
  );
};
