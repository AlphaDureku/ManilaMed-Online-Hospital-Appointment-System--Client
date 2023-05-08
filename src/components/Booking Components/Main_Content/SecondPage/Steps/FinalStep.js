import GetPatientInfo from "./Steps_SubComponents/getPatientInfo";

export default function FinalStep(props) {


  return (
    <div>
      <GetPatientInfo
        appointmentDetails={props.appointmentDetails}
        setAppointmentDetails={props.setAppointmentDetails}
      />
    </div>
  );
}
