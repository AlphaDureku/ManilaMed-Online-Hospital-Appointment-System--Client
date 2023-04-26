import { useContext } from "react";
import { userContext } from "./1st_Page";
export default function PatientCard() {
  //Props
  const userState = useContext(userContext);
  const { historyPatients } = userState;

  const patients = historyPatients.map((item, index) => {
    return (
      <label className="radioLabel" key={index}>
        <input type="radio" name="patientName" value={item.patient_ID}></input>
        <div>
          {item.patient_first_name} {item.patient_last_name}
        </div>
      </label>
    );
  });
  console.log(historyPatients);
  return <>{patients}</>;
}
