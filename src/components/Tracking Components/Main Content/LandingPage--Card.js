import Loading from "./LandingPage--Card--Loading";

export default function Card(props) {
  if (props.loading) {
    return <Loading />;
  }

  const mapPatientElements = props.patientList.map((item, index) => {
    return (
      <div className="patient-card" key={index}>
        <div className="patient-name">
          {item.patient_first_name} {item.patient_last_name}
        </div>
        <div className="patient-gender">Patient ({item.patient_gender})</div>
        <div className="card-button">
          <a href={`/User/View-Appointments/${item.patient_ID}`}>
            <button className="btn View-btn">View Appointments</button>
          </a>
          <a href={`/User/edit-Info/${item.patient_ID}`}>
            <button className="btn Edit-btn">Edit Personal Info</button>
          </a>
        </div>
      </div>
    );
  });

  return <>{mapPatientElements}</>;
}
