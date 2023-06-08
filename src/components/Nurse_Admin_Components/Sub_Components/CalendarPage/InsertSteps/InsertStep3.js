import moment from "moment";
import { useContext } from "react";
import { Container, Row } from "react-bootstrap";
import { InsertAppointmentContext } from "../InsertAppointmentModal";
export default function InsertStep3() {
  const { insertAppointmentDetails } = useContext(InsertAppointmentContext);
  return (
    <>
      <Container className="bookingConfirmationCard mt-3 text-center">
        <Row className="mt-3">
          <div className="reqheader mt-4 ">Requested Appointment Date:</div>
          <div className="reqscheddate mt-3">
            {/* {moment(schedule_date).format("MMMM D, YYYY")} */}
            {moment(insertAppointmentDetails.schedule_Date).format(
              "MMMM D, YYYY"
            )}
          </div>
          <div className="reqscheddate mb-3">
            {/* {recom_Time} - {end_Time} */}
            {insertAppointmentDetails.start_Time}-{" "}
            {insertAppointmentDetails.endTime}
          </div>
          {insertAppointmentDetails.start_Time ===
          insertAppointmentDetails.recom_Time ? (
            ""
          ) : (
            <p style={{ fontWeight: "600" }}>
              Recommended Time: {insertAppointmentDetails.recom_Time}
            </p>
          )}
          <hr className="reqline"></hr>
        </Row>
        <Row className="mb-5">
          <div className="reqheader mt-3 ">Doctor:</div>
          <div className="reqdoctorname">
            {/* {doctor_info.doctor_first_name} {doctor_info.doctor_last_name} */}
            {insertAppointmentDetails.doctor_Name}
          </div>
          <div className="reqdoctorspec mb-3">
            {/* {doctor_info.doctor_specialization} */}
            {insertAppointmentDetails.doctor_Specialization}
          </div>
          <hr className="mb-3 reqline"></hr>
        </Row>
      </Container>
    </>
  );
}
