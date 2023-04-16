import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { useState } from "react";
import PatientCard from "./Patient--Card";

export default function FirstPage_Modal(props) {
  const [error, setError] = useState(false);
  const [input, setInput] = useState({ enteredOTP: "" });
  const [showHistory, setShowHistory] = useState(false);

  function closeHandler() {
    props.setShowModal((prev) => ({ ...prev, verification: false }));
  }
  function closeHandler_History() {
    setShowHistory(false);
  }

  function OnchangeHandler(event) {
    setError(false);
    const { name, value } = event.target;
    setInput(() => ({ [name]: value }));
  }
  function onSubmitHandler() {
    //Verification change to server side
    if (props.userState.otp == input.enteredOTP || 1) {
      props.setShowModal((prev) => ({ ...prev, verification: false }));
      setShowHistory(true);
      // props.setCurrentPage(2);
    } else {
      setError(true);
    }
  }

  const VerificationModal = (
    <Modal
      show={props.showModal.verification}
      // onHide={props.handleClose}
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton onClick={closeHandler}>
        <Modal.Title>Email Verification</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="modal-body text-center">
          <label className="modal-form">
            (OTP) One Time Password has been sent to
          </label>
          <br></br>
          <p>Please Enter (6) digit code to complete your verification.</p>
          <div className=" otp-form">
            <input
              type="text"
              className="form-control otp-input"
              name="enteredOTP"
              onChange={OnchangeHandler}
              //onChange={handleOnChange}
              //value={enteredOTP}
            />
          </div>
          {error && (
            <label
              className="shake-error pt-3"
              style={{ color: "red", fontWeight: "600" }}
            >
              Incorrect OTP PIN, please try again.
            </label>
          )}
          <br></br>
          <label className="label pt-2">OTP is valid for 3 minutes</label>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button className="Search" onClick={onSubmitHandler}>
          Verify
        </Button>
        <Button className="Clear" onClick={closeHandler}>
          Cancel
        </Button>
      </Modal.Footer>
    </Modal>
  );

  // Start of User Patient History Modal
  const HistoryModal = (
    <Modal show={showHistory} centered size="lg">
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
          <PatientCard historyPatients={props.userState.historyPatients} />
          <label className="radioLabel">
            <input type="radio" name="patientName"></input>
            <div>Booking for others</div>
          </label>
        </form>
      </Modal.Body>
      <Modal.Footer>
        {" "}
        <div className="Options_buttonRow">
          <Button
            onClick={closeHandler_History}
            style={{
              boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
              backgroundColor: "#FF0000",
              fontFamily: "Inter",
            }}
          >
            Back
          </Button>
          <Button
            type="submit"
            //onSubmit={OnSubmitHandler}
            style={{
              boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
              backgroundColor: "#24B7E9",
              fontFamily: "Inter",
            }}
          >
            Proceed
          </Button>
        </div>
      </Modal.Footer>
    </Modal>
  );

  return (
    <>
      {VerificationModal}
      {HistoryModal}
    </>
  );
}
