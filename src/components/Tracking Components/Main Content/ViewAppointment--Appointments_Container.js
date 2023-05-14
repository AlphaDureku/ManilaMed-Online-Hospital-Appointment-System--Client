import { Button } from "@mantine/core";
import { useNavigate } from "react-router-dom";
import Card from "./ViewAppointments--Card";
export default function Appointments(props) {
  const navigate = useNavigate();

  return (
    <div className="Appointment_Container">
      <Card patient_ID={props.patient_ID} />
      <Button
        onClick={() => {
          navigate(-1);
        }}
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
        Back
      </Button>
    </div>
  );
}
