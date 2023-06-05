import { Button } from "@mantine/core";
import moment from "moment";
import { useContext } from "react";
import { Container } from "react-bootstrap";
import { InsertAppointmentContext } from "../InsertAppointmentModal";
export default function InsertFinalStep() {
  const { insertAppointmentDetails } = useContext(InsertAppointmentContext);
  return (
    <Container className="mt-5">
      <div className="text-center bookingtagtitle">
        Appointment Request Successful!
      </div>
      <div className="text-center leveltwoNote mt-3 mb-5">
        Please wait for a SMS or Email confirmation of your appointment up to
        (1) business day.
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
              style={{ fontSize: "25px", fontWeight: 600 }}
            >
              {insertAppointmentDetails.patient_info.patient_first_name}{" "}
              {insertAppointmentDetails.patient_info.middle_name}{" "}
              {insertAppointmentDetails.patient_info.patient_last_name}
            </div>
            <p className="card-subtitle gender ">
              {" "}
              {insertAppointmentDetails.patient_info.gender === "F"
                ? "Female"
                : "Male"}
            </p>
            <label htmlFor="card-text">Track via Email address: </label>
            <span htmlFor="card-text" style={{ fontWeight: 600 }}>
              {" "}
              {insertAppointmentDetails.patient_info.email}
            </span>
            <div className="row pt-1">
              <div className="col pt-5">
                <p className="card-subtitle" style={{ fontWeight: 600 }}>
                  Dr. {insertAppointmentDetails.doctor_Name}
                </p>
                <p className="card-subtitle pt-2">
                  {insertAppointmentDetails.doctor_Specialization}
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
                  {moment(insertAppointmentDetails.schedule_Date).format(
                    "MMMM D, YYYY"
                  )}{" "}
                  -{" "}
                  {moment(
                    insertAppointmentDetails.recom_Time,
                    "HH:mm:ss"
                  ).format("hh:mm A")}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Container>
  );
}
