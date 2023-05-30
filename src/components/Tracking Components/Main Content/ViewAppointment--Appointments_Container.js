import { Button } from "@mantine/core";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Card from "./ViewAppointments--Card";
export default function Appointments(props) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  return (
    <div className="Appointment_Container">
      <Card
        loading={loading}
        setLoading={setLoading}
        setShowExpire={props.setShowExpire}
      />
      {!loading ? (
        <Button
          onClick={() => {
            navigate(-1);
          }}
          style={{
            width: "max(5%, 100px)",
            backgroundColor: "red",
            border: "none",
            borderRadius: "5px",
            color: "white",
            marginLeft: "auto",
            marginTop: "5%",
            fontSize: "min(1rem, 3.5vw)",
            boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
          }}
        >
          Back
        </Button>
      ) : (
        ""
      )}
    </div>
  );
}
