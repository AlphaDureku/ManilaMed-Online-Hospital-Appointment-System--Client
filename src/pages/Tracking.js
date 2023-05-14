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
  const [patient_ID, setPatient_ID] = useState("");
  return (
    <>
      <div className="wrapper">
        <NavBar />
        <Routes>
          <Route
            index
            element={
              <LandingPage
                patient_ID={patient_ID}
                setPatient_ID={setPatient_ID}
              />
            }
          />
          <Route
            path="/Edit-Info"
            element={
              <EditInfo patient_ID={patient_ID} setPatient_ID={setPatient_ID} />
            }
          />
          <Route
            path="/View-Appointments"
            element={
              <ViewAppointments
                patient_ID={patient_ID}
                setPatient_ID={setPatient_ID}
              />
            }
          />
        </Routes>
        <Footer />
      </div>
    </>
  );
}
