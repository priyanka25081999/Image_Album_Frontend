import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { DASHBOARD_PAGE_URL, LANDING_PAGE_URL } from "./contants/Urls";
import LandingPage from "./pages/LandingPage";
import DashboardPage from "./pages/dashboardpages/DashboardPage";

import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Landing Page */}
        <Route path={LANDING_PAGE_URL} element={<LandingPage />} />

        {/* Dashboard Pages */}
        <Route path={DASHBOARD_PAGE_URL} element={<DashboardPage />} />

        <Route path="*" element={<Navigate to={LANDING_PAGE_URL} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
