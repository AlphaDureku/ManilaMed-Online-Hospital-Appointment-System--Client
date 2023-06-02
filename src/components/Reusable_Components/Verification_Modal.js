import { notifications } from "@mantine/notifications";
import axios from "axios";
import moment from "moment";
import { useEffect, useState } from "react";
import { CloseButton } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import BackProceed from "./Buttons--BackProceed";
export default function VerificationModal(props) {
  const [resendDisabled, setResend] = useState(false);
  const [resendTimer, setResendTimer] = useState(0);
  const [expireTime, setExpireTime] = useState(180);
  useEffect(() => {
    const interval = setInterval(() => {
      setExpireTime((prev) => prev - 1);
    }, 1000);
    if (expireTime <= 0) {
      props.setOTPhasExpired(true);
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [expireTime]);

  useEffect(() => {
    let interval = null;
    if (resendDisabled) {
      interval = setInterval(() => {
        setResendTimer((prevTimer) => prevTimer - 1);
      }, 1000); // 1 second interval

      if (resendTimer <= 0) {
        setResend(false);
        clearInterval(interval);
      }
    }

    return () => clearInterval(interval);
  }, [resendDisabled, resendTimer]);

  async function BookingReSendOTP() {
    props.setOTPhasExpired(false);
    setResend(true);
    setResendTimer(60);
    setExpireTime(180);
    const res = await axios.get(
      process.env.REACT_APP_ONLINE + "/booking/send-otp",
      {
        params: {
          email: props.email,
        },
      }
    );
    if (res.data) {
      OTPNotif();
    }
  }

  async function TrackingReSendOTP() {
    props.setOTPhasExpired(false);
    setResend(true);
    setResendTimer(60);
    setExpireTime(180);
    const res = await axios.post(process.env.REACT_APP_ONLINE + "/trackMe", {
      email: props.user.email,
    });
    if (res.data) {
      OTPNotif();
    }
  }

  const formatTime = (totalSeconds) => {
    const duration = moment.duration(totalSeconds, "seconds");
    const minutes = duration.minutes();
    const seconds = duration.seconds();

    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  };

  const OTPNotif = () => {
    notifications.show({
      title: "OTP Sent",
      color: "teal",
      autoClose: 2000,
    });
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
            <hr></hr>
            {expireTime > 0 ? (
              "OTP is valid for "
            ) : (
              <>
                <span>OTP has </span>
                <span style={{ color: "red" }}>Expired</span>
              </>
            )}
            <span
              className="label pt-2"
              style={{ color: "#2f9d44", fontWeight: 600 }}
            >
              {expireTime > 0 ? formatTime(expireTime) : ""}
            </span>

            {resendTimer > 0 ? (
              <div>
                {" "}
                Resend again after{" "}
                <span style={{ color: "#2f9d44", fontWeight: 600 }}>
                  {formatTime(resendTimer)}
                </span>{" "}
              </div>
            ) : (
              ""
            )}
          </div>
        </Modal.Body>
        <Modal.Footer>
          <div className="OTP_buttonRow">
            <BackProceed
              isDisabledRed={resendDisabled}
              leftButton={
                props.purse === "track" ? TrackingReSendOTP : BookingReSendOTP
              }
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
