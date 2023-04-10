import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { useState } from "react";
import axios from "axios";
export default function FirstPage_Modal(props) {
  const [error, setError] = useState(false);

  function closeHandler() {
    props.setShowModal(false);
  }

  function onSubmitHandler() {
    console.log(props.OTP);
  }
  return (
    <>
      <Modal
        show={props.showModal}
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
            <div className=" otp-form  container-fluid text-center">
              <input
                type="text"
                className="form-control otp-input"
                name="enteredOTP"
                //onChange={handleOnChange}
                //value={enteredOTP}
              />
            </div>
            <label className="label pt-3">OTP is valid for 3 minutes</label>
            <br></br>
            {error && (
              <label className="shake-error" style={{ color: "red" }}>
                Wrong OTP
              </label>
            )}
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
    </>
  );
}
