import { Button } from "@mantine/core";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { AppointmentDetailsContext } from "./App";
import Footer from "./components/Booking Components/Footer/Footer";
import NavBar from "./components/Booking Components/NavBar/NavBar";

export default function BookingCompletedPage() {
  const [doctor, setDoctor] = useState({});
  const { appointmentDetails } = useContext(AppointmentDetailsContext);
  const { appointment_ID } = appointmentDetails;
  let navigate = useNavigate();

  useEffect(() => {
    async function fetchDoctor() {
      const response = await axios.get(
        process.env.REACT_APP_ONLINE + "/booking/get-appointment",
        {
          params: {
            appointment_ID: appointment_ID,
          },
        }
      );
      console.log(response);
      setDoctor(response.data.data[0]);
    }
    fetchDoctor();
  }, []);

  return (
    <>
      <div className="Booking--wrapper">
        {<NavBar />}

        <Container className="mt-5">
          <div className="text-center bookingtagtitle">
            Appointment Request Successful!
          </div>
          <div className="text-center leveltwoNote mt-3 mb-5">
            Please wait for a SMS or Email confirmation of your appointment up
            to (1) business day.
          </div>

          <section
            id="pending"
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <div
              className=" card mt-3 pb-2 "
              style={{
                border: "1px solid grey",
                boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
                borderRadius: "15px",
              }}
            >
              <div className="card-body container-fluid ps-5 pe-5 pt-4 pb-4">
                <div
                  className="card-title"
                  style={{ fontSize: "25px", fontWeight: 800 }}
                >
                  {appointmentDetails.patient_info.patient_first_name}{" "}
                  {appointmentDetails.patient_info.middle_name}{" "}
                  {appointmentDetails.patient_info.patient_last_name}
                </div>
                <p className="card-subtitle gender ">
                  {" "}
                  {appointmentDetails.patient_info.gender === "F"
                    ? "Female"
                    : "Male"}
                </p>
                <p className="card-subtitle">
                  {" "}
                  {appointmentDetails.patient_info.age}
                </p>
                <label htmlFor="card-text">Track via Email address: </label>
                <span htmlFor="card-text" style={{ fontWeight: 600 }}>
                  {appointmentDetails.email}
                </span>
                <div className="row pt-1">
                  <div className="col pt-5">
                    <p className="card-subtitle" style={{ fontWeight: 600 }}>
                      Dr. {doctor.Fname} {doctor.Lname}
                    </p>
                    <p className="card-subtitle pt-2">
                      {doctor.specialization}
                    </p>
                  </div>
                  <div className="col pt-5">
                    <p className="card-subtitle" style={{ fontWeight: 600 }}>
                      Appointment Date
                    </p>
                    <p
                      className="card-subtitle pt-2"
                      style={{ color: "#388440", fontWeight: "bold" }}
                    >
                      {doctor.date} - {doctor.start}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <div className="text-center ">
            <Button
              onClick={() => navigate("/")}
              style={{
                width: "max(5%, 100px)",
                backgroundColor: "red",
                border: "none",
                borderRadius: "20px",
                color: "white",
                marginLeft: "auto",
                marginTop: "5%",
                fontSize: "min(1rem, 3.5vw)",
                boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
              }}
            >
              Home
            </Button>
          </div>
        </Container>

        {<Footer />}
      </div>
    </>
  );
}
