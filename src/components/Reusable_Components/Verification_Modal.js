import moment from "moment";
import { useEffect, useState } from "react";
import { CloseButton } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import BackProceed from "./Buttons--BackProceed";

export default function VerificationModal(props) {
  const [endTime] = useState(moment().add(3, "minutes"));

  const [remainingTime, setRemainingTime] = useState(
    endTime.diff(moment(), "seconds")
  );

  useEffect(() => {
    const interval = setInterval(() => {
      const newRemainingTime = endTime.diff(moment(), "seconds");
      setRemainingTime(newRemainingTime);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const formatTime = (totalSeconds) => {
    const duration = moment.duration(totalSeconds, "seconds");
    const minutes = duration.minutes();
    const seconds = duration.seconds();

    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  };

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
            OTP is valid for{" "}
            <span
              className="label pt-2"
              style={{ color: "#2f9d44", fontWeight: 600 }}
            >
              {formatTime(remainingTime)}
            </span>
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
