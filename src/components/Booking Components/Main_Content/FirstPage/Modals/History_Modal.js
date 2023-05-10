import Modal from "react-bootstrap/Modal";
import { useNavigate } from "react-router-dom";
import BackProceed from "../../../../Reusable_Components/Buttons--BackProceed";
import PatientCard from "./Patient--Card";
export default function HistoryModal(props) {
  const navigate = useNavigate();
  function OnCloseHandler_History() {
    props.setInput(() => ({ enteredOTP: "" }));
    props.setShowHistory(false);
  }
  function OnSubmitHandler_History() {
    navigate("/services/collect-info");
  }
  return (
    <Modal show={props.show} centered size="lg">
      <Modal.Header>
        {" "}
        <Modal.Title>
          <h2 className="Options_H2">Options</h2>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p className="Options_P">
          We discovered a record associated to the email address you provided.
          Please indicate whose reservation is this for.
        </p>
        <form className="radio-form">
          <PatientCard />
        </form>
      </Modal.Body>
      <Modal.Footer>
        {" "}
        <div className="Options_buttonRow">
          <BackProceed
            leftButton={OnCloseHandler_History}
            rightButton={OnSubmitHandler_History}
            redButtonText={"Cancel"}
            blueButtonText={"Proceed"}
          />
        </div>
      </Modal.Footer>
    </Modal>
  );
}
