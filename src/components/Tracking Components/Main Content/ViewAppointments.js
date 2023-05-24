import Appointments from "./ViewAppointment--Appointments_Container";

export default function ViewAppointments() {
  return (
    <>
      <div className="View-appointment_Main-Container">
        <div className="ViewAppointments-header">My Appointments</div>
        <Appointments />
      </div>
    </>
  );
}
