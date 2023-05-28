import Modal from "react-bootstrap/Modal";
import BackProceed from "../../Reusable_Components/Buttons--BackProceed";

const ConfirmLogOutModal = (props) => {
  const { show, handleClose, title, handleSubmit, question } = props;
  return (
    <Modal show={show} onHide={handleClose} centered size="md" keyboard={false}>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body
        style={{
          textAlign: "center",
          margin: "5%",
          fontWeight: "600",
        }}
      >
        {question}
      </Modal.Body>
      <Modal.Footer>
        <div className="headconfirmbuttonrow">
          <BackProceed
            leftButton={handleClose}
            rightButton={handleSubmit}
            redButtonText={"Cancel"}
            blueButtonText={"Confirm"}
          />
        </div>
      </Modal.Footer>
    </Modal>
  );
};

export default ConfirmLogOutModal;
