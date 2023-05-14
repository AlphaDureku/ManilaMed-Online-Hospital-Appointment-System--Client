import { useContext } from "react";
import { Container, Row } from "react-bootstrap";
import { AppointmentDetailsContext } from "../../../../../../App";
const moment = require("moment");
export default function BookingConfirmation() {
  const { appointmentDetails } = useContext(AppointmentDetailsContext);
  const { schedule_date, doctor_info, recom_Time, end_Time } =
    appointmentDetails;
  return (
    <div>
      <Container>
        <Row></Row>
        <Container className="bookingConfirmationCard mt-3 text-center">
          <Row className="mt-3">
            <div className="reqheader mt-4 ">Requested Appointment Date:</div>
            <div className="reqscheddate mt-3">
              {moment(schedule_date).format("MMMM D, YYYY")}
            </div>
            <div className="reqscheddate mb-3">
              {recom_Time} - {end_Time}
            </div>
            <hr className="reqline"></hr>
          </Row>
          <Row className="mb-5">
            <div className="reqheader mt-3 ">Doctor:</div>
            <div className="reqdoctorname">
              {doctor_info.doctor_first_name} {doctor_info.doctor_last_name}
            </div>
            <div className="reqdoctorspec mb-3">
              {doctor_info.doctor_specialization}
            </div>
            <hr className="mb-3 reqline"></hr>
          </Row>
        </Container>
      </Container>
    </div>
  );
}
