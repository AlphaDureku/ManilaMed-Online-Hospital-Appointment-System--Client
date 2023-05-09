import GetPatientInfo from "./Steps_SubComponents/getPatientInfo";

export default function FinalStep(props) {


  return (
    <div>
      <GetPatientInfo
        handleFormSubmit={props.handleFormSubmit}
        handleInputChange={props.handleInputChange}
        patientFirstName={props.patientFirstName}
        patientLastName={props.patientLastName}
        patientMiddleName={props.patientMiddleName}
        patientPhone={props.patientPhone}
        patientAddress={props.patientAddress}
        patientGender={props.patientGender}
        patientDOB={props.patientDOB}


      />
    </div>
  );
}
