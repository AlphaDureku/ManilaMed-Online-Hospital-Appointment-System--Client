import { createContext, useState } from "react";
import { Route, Routes } from "react-router-dom";
import Dashboard from "../components/HeadAdmin_Components/Main_Content/Dashboard";
import LoginPage from "../components/HeadAdmin_Components/Main_Content/Login";

export const HeadAdminPageContext = createContext();

export default function HeadAdmin() {
  const [currentPage, setCurrentPage] = useState(1);

  const HeadAdminPageContextObject = {
    currentPage: currentPage,
    setCurrentPage: setCurrentPage,
  };

  return (
    <>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route
          path="/dashboard"
          element={
            <HeadAdminPageContext.Provider value={HeadAdminPageContextObject}>
              <Dashboard />
            </HeadAdminPageContext.Provider>
          }
        />
      </Routes>
    </>
  );
}
