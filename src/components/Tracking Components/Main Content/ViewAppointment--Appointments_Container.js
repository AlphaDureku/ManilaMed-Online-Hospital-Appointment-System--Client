import { useNavigate } from "react-router-dom";
import Card from "./ViewAppointments--Card";
export default function Appointments() {
  const navigate = useNavigate();

  return (
    <div className="Appointment_Container">
      <Card />
      <button
        className="btn btn-success btn view-backBtn"
        onClick={() => {
          navigate(-1);
        }}
      >
        Back
      </button>
    </div>
  );
}
