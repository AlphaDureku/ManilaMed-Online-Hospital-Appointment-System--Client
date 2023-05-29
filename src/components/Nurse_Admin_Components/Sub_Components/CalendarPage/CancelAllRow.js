import { Button } from "@mantine/core";
import { useNavigate } from "react-router-dom";
export default function CancelAllRow({ selectedDateChecker }) {
  const navigate = useNavigate();
  return (
    <>
      <div className="CancelAll">
        <div>
          <div>Manually Set an Appointment</div>
          <Button onClick={() => navigate("/services/booking")}>
            Set Appointment
          </Button>
        </div>
        <div>
          {" "}
          <div>Notify patients on Cancellation </div>
          <Button onClick={() => selectedDateChecker("CancelAll")}>
            Cancel Appointments
          </Button>
        </div>
      </div>
    </>
  );
}
