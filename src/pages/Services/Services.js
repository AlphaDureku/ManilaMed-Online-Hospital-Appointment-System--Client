import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import Booking from "./Booking";
import CollectInfo from "./CollectInfo";
export default function Services() {
  const [appointmentDetails, setAppointmentDetails] = useState({
    email: "",
    schedule_date: "",
    schedule_ID: "",
    doctor_ID: "",
    patient_ID: "",
    queue: "",
    patient_info: {
      patient_first_name: "",
      patient_last_name: "",
      middle_name: "",
      age: "",
      address: "",
      birthDate: "",
      gender: "",
    },
  });

  return (
    <Routes>
      <Route
        path="/Booking"
        element={
          <Booking
            appointmentDetails={appointmentDetails}
            setAppointmentDetails={setAppointmentDetails}
          />
        }
      />
      <Route
        path="/Collect-Info"
        element={
          <CollectInfo
            appointmentDetails={appointmentDetails}
            setAppointmentDetails={setAppointmentDetails}
          />
        }
      />
    </Routes>
  );
}
