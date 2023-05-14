import Appointments from "./ViewAppointment--Appointments_Container";

export default function ViewAppointments(props) {
  return (
    <>
      <div className="View-appointment_Main-Container">
        <div className="ViewAppointments-header">My Appointments</div>
        <Appointments patient_ID={props.patient_ID} />
      </div>
    </>
  );
}
