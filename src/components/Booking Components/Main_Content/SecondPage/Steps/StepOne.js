import Card from "../../../../Home Components/Search Doctor/Card";
import BookingForm from "./Steps_SubComponents/BookingForm";

export default function StepOne(props) {
  return (
    <>
      <BookingForm
        query={props.query}
        setQuery={props.setQuery}
        selectValues={props.selectValues}
        setCurrentPage={props.setCurrentPage}
      />
      ;
      <Card
        doctors={props.doctors}
        currentPage={props.currentPage}
        setCurrentPage={props.setCurrentPage}
        schedule={props.schedule}
        loading={props.loading}
        appointmentDetails={props.appointmentDetails}
        setAppointmentDetails={props.setAppointmentDetails}
        nextStep={props.nextStep}
      />
      <div className="stepFinstruc">View doctor schedule to proceed</div>
    </>
  );
}
