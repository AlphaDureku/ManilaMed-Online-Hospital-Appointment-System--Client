import BookingForm from "../../../../Home Components/Search Doctor/BookingForm";
import Card from "../../../../Home Components/Search Doctor/Card";

export default function StepOne(props) {
  return (
    <>
      <BookingForm
        query={props.query}
        setQuery={props.setQuery}
        selectValues={props.selectValues}
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
      />
      <div className="stepFinstruc">View doctor schedule to proceed</div>
    </>
  );
}
