import { Alert, DEFAULT_THEME, LoadingOverlay, Skeleton } from "@mantine/core";
import axios from "axios";
import { useEffect, useState } from "react";
import SelectAvail from "./Steps_SubComponents/selectAvail";

export default function StepTwo(props) {
  const [scheduleStepTwo, setScheduleStepTwo] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchDoctorCalendar() {
      try {
        const response = await axios.get("/booking/doctor-calendar", {
          params: {
            doctor_ID: props.appointmentDetails.doctor_ID,
          },
        });
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

  return (
    <>
      {isLoading && (
        <>
          <LoadingOverlay
            loader={customLoader}
            visible
          />
          <Skeleton visible />
        </>
      )}
      {error && (
        <Alert color="red" title="Error" onClose={() => setError(null)}>
          {error}
        </Alert>
      )}
      <SelectAvail
        schedule={props.schedule}
        appointmentDetails={props.appointmentDetails}
        setAppointmentDetails={props.setAppointmentDetails}
        scheduleStepTwo={scheduleStepTwo}
        isLoading={isLoading}
        error={error}
      />
    </>
  );
}
