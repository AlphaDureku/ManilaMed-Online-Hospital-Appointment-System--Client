import Card from "./ViewAppointments--Card";
import { useNavigate } from "react-router-dom";
export default function Appointments(props) {
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
