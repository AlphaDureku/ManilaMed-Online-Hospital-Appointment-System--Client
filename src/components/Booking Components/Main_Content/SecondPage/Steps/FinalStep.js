import GetPatientInfo from "./Steps_SubComponents/getPatientInfo";

export default function FinalStep(props) {
  return (
    <div>
      <GetPatientInfo
        patientformData={props.patientformData}
        handleInputChange={props.handleInputChange}
        handleSubmit={props.handleSubmit}
        validateForm={props.validateForm}
        errors={props.errors}
      />
    </div>
  );
}
