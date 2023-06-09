import { useContext } from "react";
import { AppointmentDetailsContext } from "../../../../../App";
import { userContext } from "../1st_Page";
export default function PatientCard() {
  //Props
  const { historyPatients } = useContext(userContext);
  const { setAppointmentDetails } = useContext(AppointmentDetailsContext);
  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setAppointmentDetails((prev) => ({ ...prev, [name]: value }));
  };

  const patients = historyPatients.map((item, index) => {
    return (
      <label className="radioLabel" key={index}>
        <input
          type="radio"
          name="patient_ID"
          value={item.patient_ID}
          onChange={onChangeHandler}
        ></input>
        <div>
          {item.patient_first_name} {item.patient_last_name}
        </div>
      </label>
    );
  });
  return (
    <>
      {patients}
      <label className="radioLabel">
        <input
          type="radio"
          name="patient_ID"
          value=""
          onChange={onChangeHandler}
        ></input>
        <div>Booking for others</div>
      </label>
    </>
  );
}
