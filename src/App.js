import { createContext, useState } from "react";
import { Route, Routes } from "react-router-dom";
import Admin from "./pages/Admin";
import HeadAdmin from "./pages/HeadAdmin";
import Home from "./pages/Home";
import Services from "./pages/Services/Services";
import Track from "./pages/Tracking";
import ServerDown from "./pages/serverDown";
export const AppointmentDetailsContext = createContext();

export default function App() {
  const [appointmentDetails, setAppointmentDetails] = useState({
    schedule_date: "",
    schedule_ID: "",
    doctor_ID: "",
    recom_Time: "",
    end_Time: "",
    patient_ID: "",
    appointment_ID: "",
    email: "",
    doctor_info: {
      doctor_first_name: "",
      doctor_last_name: "",
      doctor_specialization: "",
      doctor_HMO: "",
    },
    patient_info: {
      patient_first_name: "",
      patient_last_name: "",
      middle_name: "",
      contact_number: "+63",
      address: "",
      dateOfBirth: "",
      gender: "",
    },
  });

  return (
    <AppointmentDetailsContext.Provider
      value={{ appointmentDetails, setAppointmentDetails }}
    >
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Services/*" element={<Services />} />
        <Route path="/User/*" element={<Track />} />
        <Route path="/Admin/*" element={<Admin />} />
        <Route path="/Head/*" element={<HeadAdmin />} />
        <Route path="/ServerDown" element={<ServerDown />} />
      </Routes>
    </AppointmentDetailsContext.Provider>
  );
}
