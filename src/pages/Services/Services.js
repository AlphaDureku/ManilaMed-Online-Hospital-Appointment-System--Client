import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import Booking from "./Booking";
import CollectInfo from "./CollectInfo";
export default function Services() {
  const [appointmentDetails, setAppointmentDetails] = useState({
    email: "",
    schedule_date: "",
    schedule_time: "", 
    doctor_ID: "",
    patient_Info: {
      first_name: "Mark",
      last_name: "",
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
