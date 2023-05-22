import { Route, Routes } from "react-router-dom";
import Dashboard from "../components/HeadAdmin_Components/Main_Content/Dashboard";
import LoginPage from "../components/HeadAdmin_Components/Main_Content/Login";
export default function HeadAdmin() {
  return (
    <>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route
          path="/dashboard"
          element={<Dashboard style={{ maxWidth: "1200px" }} />}
        />
      </Routes>
    </>
  );
}
