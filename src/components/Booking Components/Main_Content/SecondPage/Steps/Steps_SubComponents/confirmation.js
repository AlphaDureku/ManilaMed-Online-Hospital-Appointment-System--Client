import { Button, Tooltip } from "@mantine/core";
import { useContext } from "react";
import { Container, Row } from "react-bootstrap";
import { AppointmentDetailsContext } from "../../../../../../App";

export default function BookingConfirmation(props) {
  const { appointmentDetails } = useContext(AppointmentDetailsContext);
  function getFormattedDate(dateString) {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  }

  function getBookingDetails() {
    const { recom_Time, schedule_date, doctor_ID } = appointmentDetails;

    if (recom_Time && schedule_date && doctor_ID) {
      return [
        {
          doctor_ID: doctor_ID,
          schedule_date: schedule_date,
          recom_Time: recom_Time,
        },
      ];
    }

    return [];
  }

  function getdoctorFullName() {
    const bookingdetails = props.doctors
      ? props.doctors.filter(
          (details) =>
            details.doctor_ID ===
            getBookingDetails()
              .map((details) => details.doctor_ID)
              .join(", ")
        )
      : [];

    const bookingdetailsDown = bookingdetails.filter((details) => {
      return (
        details.doctor_first_name &&
        details.doctor_last_name &&
        details.specialization
      );
    });

    const getdoctorNameandSP = bookingdetailsDown.map((details) => {
      const doctorFirstName = `${details.doctor_first_name}`;
      const doctorLastName = `${details.doctor_last_name}`;
      const specializationName = `${details.specialization}`;

      return {
        doctorFullName: `${doctorFirstName} ${doctorLastName}`,
        doctorSpecialization: specializationName,
      };
    });

    return getdoctorNameandSP;
  }

  function hehe() {
    console.log(appointmentDetails);
  }

  return (
    <div>
      <Container>
        <Row>
          <div className="bookingtagtitle">
            Requested Schedule
            <Tooltip
              label="Confirm to book appointment"
              position="bottom"
              className="ms-2"
            >
              <Button
                compact
                variant="outline"
                size="xs"
                radius="xl"
                color="gray"
              >
                ?
              </Button>
            </Tooltip>
          </div>
        </Row>
        <Container className="bookingConfirmationCard mt-3 text-center">
          <Row className="mt-3">
            <div className="reqheader mt-4 ">Requested Appointment Date:</div>
            <div className="reqscheddate mt-3">
              {getBookingDetails()
                ? getBookingDetails()
                    .map((details) => getFormattedDate(details.schedule_date))
                    .join(", ")
                : "N/A"}
            </div>
            <div className="reqscheddate mb-3">
              {getBookingDetails()
                ? getBookingDetails()
                    .map((details) => details.recom_Time)
                    .join(", ")
                : "N/A"}
            </div>
            <hr className="reqline"></hr>
          </Row>
          <Row className="mb-5">
            <div className="reqheader mt-3 ">Doctor:</div>
            <div className="reqdoctorname">
              {getdoctorFullName()
                ? getdoctorFullName()
                    .map((details) => details.doctorFullName)
                    .join(", ")
                : "N/A"}
            </div>
            <div className="reqdoctorspec mb-3">
              {getdoctorFullName()
                ? getdoctorFullName()
                    .map((details) => details.doctorSpecialization)
                    .join(", ")
                : "N/A"}
            </div>
            <hr className="mb-3 reqline"></hr>
          </Row>
        </Container>
      </Container>
      <Button onClick={hehe}>Console</Button>
    </div>
  );
}
