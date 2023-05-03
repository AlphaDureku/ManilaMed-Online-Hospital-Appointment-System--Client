import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import FirstPage from "../../components/Booking Components/Body_Content/FirstPage/1st_Page";
import Footer from "../../components/Booking Components/Footer/Footer";
import NavBar from "../../components/Booking Components/NavBar/NavBar";
export default function Booking(props) {
  useEffect(() => {
    document.title = "Booking";
  }, []);

  return (
    <>
      <div className="Booking--wrapper">
        <NavBar />
        <FirstPage
          appointmentDetails={props.appointmentDetals}
          setAppointmentDetails={props.setAppointmentDetails}
        />
        <Footer />
      </div>
    </>
  );
}
