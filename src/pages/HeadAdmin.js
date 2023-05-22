import { Route, Routes } from "react-router-dom";
import Dashboard from "../components/HeadAdmin_Components/Main_Content/Dashboard";
import Login from "../components/HeadAdmin_Components/Main_Content/Log";

export default function HeadAdmin() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route
          path="/dashboard"
          element={<Dashboard style={{ maxWidth: "1200px" }} />}
        />
      </Routes>
    </>
  );
}
