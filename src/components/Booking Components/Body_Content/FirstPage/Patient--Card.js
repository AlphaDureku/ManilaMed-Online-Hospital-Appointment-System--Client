export default function PatientCard(props) {
  const patients = props.historyPatients.map((item, index) => {
    return (
      <label className="radioLabel" key={index}>
        <input type="radio" name="patientName"></input>
        <div>
          {item.patient_first_name} {item.patient_last_name}
        </div>
      </label>
    );
  });
  console.log(props.historyPatients);
  return <>{patients}</>;
}
