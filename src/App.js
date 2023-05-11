import { createContext, useState } from "react";
import { Route, Routes } from "react-router-dom";
import Admin from "./pages/Admin";
import HeadAdmin from "./pages/HeadAdmin/HeadAdmin";
import Home from "./pages/Home";
import Services from "./pages/Services/Services";
import Track from "./pages/Tracking";

export const AppointmentDetailsContext = createContext();
export default function App() {
  const [appointmentDetails, setAppointmentDetails] = useState({
    email: "mark",
    schedule_date: "",
    schedule_ID: "",
    doctor_ID: "",
    recom_Time: "",
    patient_ID: "",
    appointment_ID: "",
    patient_info: {
      patient_first_name: "",
      patient_last_name: "",
      middle_name: "",
      contact_number: "",
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
      </Routes>
    </AppointmentDetailsContext.Provider>
  );
}
