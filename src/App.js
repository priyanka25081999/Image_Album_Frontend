import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { LANDING_PAGE_URL } from "./contants/Urls";
import DashboardPage from "./pages/DashboardPage";
import ImagesPage from "./pages/ImagesPage";

import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Dashboard Pages */}
        <Route path={LANDING_PAGE_URL} element={<DashboardPage />} />

        {/* Dashboard Pages */}
        <Route path={"/album/:id"} element={<ImagesPage />} />

        <Route path="*" element={<Navigate to={LANDING_PAGE_URL} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
