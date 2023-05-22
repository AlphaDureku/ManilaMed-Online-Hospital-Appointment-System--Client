import { Route, Routes } from "react-router-dom";
import Dashboard from "../components/HeadAdmin_Components/Main_Content/Dashboard";
import Log from "../components/HeadAdmin_Components/Main_Content/Login";
export default function HeadAdmin() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Log />} />
        <Route
          path="/dashboard"
          element={<Dashboard style={{ maxWidth: "1200px" }} />}
        />
      </Routes>
    </>
  );
}
