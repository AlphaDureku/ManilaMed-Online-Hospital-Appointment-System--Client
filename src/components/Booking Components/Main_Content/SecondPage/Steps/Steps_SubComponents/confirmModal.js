import Modal from 'react-bootstrap/Modal';
import BackProceed from '../../../../../Reusable_Components/Buttons--BackProceed';
import { Next } from 'react-bootstrap/esm/PageItem';

const ConfirmModal = (props) => {
  return (
    <Modal show={props.show} onHide={props.handleClose} centered size="sm"
    keyboard={false}
    >
      <Modal.Header closeButton>
        <Modal.Title>Cofirmation</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        Confirm Appointment?

      </Modal.Body>
        <Modal.Footer>
        <div className="confirmbuttonrow">
        <BackProceed
          leftButton={props.handleClose}
          rightButton={props.submitAppointment}
          redButtonText={"Cancel"}
          blueButtonText={"Confirm"}
        />
        </div>
        </Modal.Footer>
    
    </Modal>
  );
};

export default ConfirmModal;
