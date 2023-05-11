import { Alert, DEFAULT_THEME, LoadingOverlay } from "@mantine/core";
import axios from "axios";
import { useContext, useEffect, useMemo, useState } from "react";
import { Container } from "react-bootstrap";
import { AppointmentDetailsContext } from "../../../../../App";
import SelectAvail from "./Steps_SubComponents/selectAvail";
export default function StepTwo(props) {
  const [scheduleStepTwo, setScheduleStepTwo] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const { appointmentDetails } = useContext(AppointmentDetailsContext);

  useEffect(() => {
    async function fetchDoctorCalendar() {
      try {
        const response = await axios.get(
          "https://server-production-e6a5.up.railway.app/booking/doctor-calendar",
          {
            params: {
              doctor_ID: appointmentDetails.doctor_ID,
            },
          }
        );
        const data = response.data;
        setScheduleStepTwo(data.data);
      } catch (error) {
        console.error(error);
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    }
    fetchDoctorCalendar();
  }, []);
  console.log(scheduleStepTwo);
  const customLoader = (
    <svg
      width="54"
      height="54"
      viewBox="0 0 38 38"
      xmlns="http://www.w3.org/2000/svg"
      stroke={DEFAULT_THEME.colors.blue[6]}
    >
      <g fill="none" fillRule="evenodd">
        <g transform="translate(1 1)" strokeWidth="2">
          <circle strokeOpacity=".5" cx="18" cy="18" r="18" />
          <path d="M36 18c0-9.94-8.06-18-18-18">
            <animateTransform
              attributeName="transform"
              type="rotate"
              from="0 18 18"
              to="360 18 18"
              dur="1s"
              repeatCount="indefinite"
            />
          </path>
        </g>
      </g>
    </svg>
  );
  const calendar = useMemo(() => {
    return (
      <SelectAvail
        schedule={props.schedule}
        scheduleStepTwo={scheduleStepTwo}
        isLoading={isLoading}
        error={error}
        selectedDate={props.selectedDate}
        setSelectedDate={props.setSelectedDate}
      />
    );
  }, [scheduleStepTwo]);
  console.log(scheduleStepTwo);
  return (
    <>
      {isLoading && (
        <LoadingOverlay
          visible
          zIndex={999} // Set a higher value for z-index
          style={{
            position: "fixed",
            top: 0,
            right: 0,
            bottom: 0,
            left: 0,
          }}
          overlayColor="rgba(255, 255, 255, 0.8)" // Adjust the overlay color and opacity as needed
          loader={customLoader}
        />
      )}
      {error && (
        <Container>
          <Alert color="red" title="Error" onClose={() => setError(null)}>
            {error}
          </Alert>
        </Container>
      )}
      {calendar}
    </>
  );
}
