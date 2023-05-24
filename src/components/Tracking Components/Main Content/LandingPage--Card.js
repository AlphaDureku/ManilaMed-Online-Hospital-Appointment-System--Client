import { useNavigate } from "react-router-dom";
import Loading from "./LandingPage--Card--Loading";

export default function Card(props) {
  const navigate = useNavigate();
  if (props.loading) {
    return <Loading />;
  }

  const navToView = (patient_ID) => {
    localStorage.setItem("patient_ID", patient_ID);
    navigate("/user/view-appointments");
  };

  const navToEdit = (patient_ID) => {
    localStorage.setItem("patient_ID", patient_ID);
    navigate("/user/edit-info");
  };
  const mapPatientElements = props.patientList.map((item, index) => {
    return (
      <div className="patient-card" key={index}>
        <div className="patient-name">
          {item.patient_first_name} {item.patient_last_name}
        </div>
        <div className="patient-gender">Patient ({item.patient_gender})</div>
        <div className="card-button">
          <button
            className="btn View-btn"
            onClick={() => navToView(item.patient_ID)}
          >
            View Appointments
          </button>
          <button
            className="btn Edit-btn"
            onClick={() => navToEdit(item.patient_ID)}
          >
            Edit Personal Info
          </button>
        </div>
      </div>
    );
  });

  return <>{mapPatientElements}</>;
}
