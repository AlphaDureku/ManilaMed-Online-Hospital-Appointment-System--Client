import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import Booking from "./Booking";
import CollectInfo from "./CollectInfo";
export default function Services() {
  const [appointmentDetails, setAppointmentDetails] = useState({
    schedule_ID: "",
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
            setAppointmentDetails={appointmentDetails}
          />
        }
      />
      <Route
        path="/Collect-Info"
        element={
          <CollectInfo
            appointmentDetails={appointmentDetails}
            setAppointmentDetails={appointmentDetails}
          />
        }
      />
    </Routes>
  );
}
