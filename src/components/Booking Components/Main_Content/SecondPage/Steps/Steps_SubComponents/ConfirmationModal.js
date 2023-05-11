import Modal from "react-bootstrap/Modal";
import BackProceed from "../../../../../Reusable_Components/Buttons--BackProceed";
import BookingConfirmation from "./confirmation";

const BookingConfirmModal = (props) => {
  return (
    <Modal
      show={props.show}
      onHide={props.handleClose}
      centered
      size="md"
      keyboard={false}
    >
    <Modal.Header>
      <Modal.Title>Confirm Appointment? </Modal.Title>
    </Modal.Header>
    <Modal.Body>
    <BookingConfirmation
        doctors={props.doctors}
        />
    </Modal.Body>
      <Modal.Footer>

       <div className="confirmbuttonrow">
          <BackProceed
            leftButton={props.handleClose}
            rightButton={props.handleSubmit}
            redButtonText={"Cancel"}
            blueButtonText={"Confirm"}
          />
        </div>
        </Modal.Footer>
       
    </Modal>
  );
};

export default BookingConfirmModal;
