import SelectAvail from "../selectAvail";
export default function StepTwo(props) {
  return (
    <SelectAvail
      schedule={props.schedule}
      appointmentDetails={props.appointmentDetails}
      setAppointmentDetails={props.setAppointmentDetails}
    />
  );
}
