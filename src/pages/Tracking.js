import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import Footer from "../components/Tracking Components/Footer/Footer";
import EditInfo from "../components/Tracking Components/Main Content/EditInfo";
import LandingPage from "../components/Tracking Components/Main Content/LandingPage";
import ViewAppointments from "../components/Tracking Components/Main Content/ViewAppointments";
import NavBar from "../components/Tracking Components/NavBar/NavBar";

export default function Track() {
  useEffect(() => {
    document.title = "Track Me";
  }, []);

  return (
    <>
      <div className="wrapper">
        <NavBar />
        <Routes>
          <Route index element={<LandingPage />} />
          <Route path="/Edit-Info" element={<EditInfo />} />
          <Route path="/View-Appointments" element={<ViewAppointments />} />
        </Routes>
        <Footer />
      </div>
    </>
  );
}
