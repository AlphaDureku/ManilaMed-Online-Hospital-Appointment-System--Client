import Modal from "react-bootstrap/Modal";
import BackProceed from "./Buttons--BackProceed";

const ConfirmModal = (props) => {
  return (
    <Modal
      show={props.show}
      onHide={props.handleClose}
      centered
      size="md"
      keyboard={false}
    >
      <Modal.Header closeButton>
        <Modal.Title>{props.title}</Modal.Title>
      </Modal.Header>
      <Modal.Body
        style={{
          textAlign: "center",
          margin: "5%",
          fontWeight: "600",
        }}
      >
        {props.question}
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

export default ConfirmModal;
