import Modal from "react-bootstrap/Modal";

import BackProceed from "./Buttons--BackProceed";

const SessionExpiredModal = (props) => {
  const { show, handleClose, handleSubmit } = props;
  return (
    <Modal show={show} onHide={handleClose} centered size="md" keyboard={false}>
      <Modal.Header>
        <Modal.Title>Session Expired</Modal.Title>
      </Modal.Header>
      <Modal.Body
        style={{
          textAlign: "center",
          margin: "5%",
          fontWeight: "600",
        }}
      >
        Your session has expired. Please re-login
      </Modal.Body>
      <Modal.Footer>
        <div className="confirmbuttonrow">
          <BackProceed
            rightButton={handleSubmit}
            blueButtonText={"Login"}
            disableRed={true}
          />
        </div>
      </Modal.Footer>
    </Modal>
  );
};

export default SessionExpiredModal;
