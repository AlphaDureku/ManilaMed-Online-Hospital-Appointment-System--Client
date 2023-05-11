import { useNavigate } from "react-router-dom";
import {Button} from "@mantine/core"
import Card from "./ViewAppointments--Card";
export default function Appointments() {
  const navigate = useNavigate();

  return (
    <div className="Appointment_Container">
      <Card />
      <Button
      
        onClick={() => {
          navigate(-1);
        }}
        style={{
          width: 'max(5%, 100px)',
          backgroundColor: 'red',
          border: 'none',
          borderRadius: '20px',
          color: 'white',
          marginLeft: 'auto',
          marginTop: '5%',
          fontSize: 'min(1rem, 3.5vw)',
          boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)'

        }}
        
      >
        Back
      </Button>
    </div>
  );
}
