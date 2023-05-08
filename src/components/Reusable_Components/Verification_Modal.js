import { CloseButton } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import BackProceed from "./Buttons--BackProceed";

export default function VerificationModal(props) {
  console.log("rendered");
  return (
    <>
      <Modal
        show={props.show}
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header>
          <Modal.Title>Email Verification</Modal.Title>
          <CloseButton
            className="customCloseB"
            onClick={props.OnCloseHandler}
          />
        </Modal.Header>
        <Modal.Body>
          <div className="modal-body text-center verificationModalB">
            <label className="modal-form">
              (OTP) One Time Password has been sent to{" "}
              <strong>{props.email}</strong>
            </label>
            <br></br>
            <p>Please Enter (6) digit code to complete your verification.</p>
            <div className=" otp-form">
              <input
                type="text"
                className="form-control otp-input"
                name="enteredOTP"
                onChange={props.OnchangeHandler}
                value={props.entered_OTP}
              />
            </div>
            {props.error && (
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
          <div className="OTP_buttonRow">
            <BackProceed
              leftButton={props.leftButton}
              rightButton={props.rightButton}
              redButtonText={"Resend"}
              blueButtonText={"Proceed"}
              backColor="green"
            />
          </div>
        </Modal.Footer>
      </Modal>
    </>
  );
}
