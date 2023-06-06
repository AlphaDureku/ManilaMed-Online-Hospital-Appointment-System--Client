import { notifications } from "@mantine/notifications";
import axios from "axios";
import moment from "moment";
import { useEffect, useState } from "react";
import { CloseButton } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import BackProceed from "../Buttons--BackProceed";
export default function VerificationModal(props) {
  const [resendDisabled, setResend] = useState(false);
  const [resendTimer, setResendTimer] = useState(0);
  const [expireTime, setExpireTime] = useState(180);
  const [enteredOTP, setEnteredOTP] = useState("");
  const [OTPhasExpired, setOTPhasExpired] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setExpireTime((prev) => prev - 1);
      console.log("hi");
    }, 1000);
    if (expireTime <= 0) {
      setOTPhasExpired(true);
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

  const onChangeHandler = (event) => {
    const { value } = event.target;
    setError(false);
    setEnteredOTP(value);
  };

  const resendOTP = async (role) => {
    setResendTimer(60);
    setExpireTime(180);
    setOTPhasExpired(false);
    setResend(true);
    setError(false);
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_ONLINE}/${role}/resend-otp`,
        {
          inputOTP: enteredOTP,
          ID: props.ID,
          hasExpired: OTPhasExpired,
        },
        {
          withCredentials: true,
        }
      );
      console.log(res);
      OTPNotif();
    } catch (error) {
      console.log(error);
    }
  };

  const validateOTP = async (role) => {
    const res = await axios.post(
      `${process.env.REACT_APP_ONLINE}/${role}/verify-otp`,
      {
        inputOTP: enteredOTP,
        ID: props.ID,
        hasExpired: OTPhasExpired,
      },
      {
        withCredentials: true,
      }
    );
    const { data } = res.data;
    if (data.isVerified) {
      localStorage.setItem(
        props.role === "admin" ? "nurseToken" : "headToken",
        data.token
      );
      props.setIsVerified(data.isVerified);
    } else {
      setError(true);
    }
  };

  const modalOnCloseHandler = () => {
    setExpireTime(180);
    setEnteredOTP("");
    setOTPhasExpired(false);
    props.setShow(false);
    props.setHeadAdmin({});
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
          <CloseButton className="customCloseB" onClick={modalOnCloseHandler} />
        </Modal.Header>
        <Modal.Body>
          <div className="modal-body text-center verificationModalB">
            <label className="modal-form">
              (<b>OTP</b>) One Time Password has been sent to a<br></br>
              <b>
                {props.role === "admin" ? " Secretary" : " Head Admin"}
              </b>{" "}
              Email Account
            </label>
            <br></br>
            <p>
              Please Enter (<b>6</b>) digit code to complete your verification.
            </p>
            <div className=" otp-form">
              <input
                type="text"
                className="form-control otp-input"
                name="enteredOTP"
                onChange={onChangeHandler}
                value={enteredOTP}
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
            <hr></hr>
            {expireTime > 0 ? (
              "OTP is valid for "
            ) : (
              <>
                <span>OTP has </span>
                <span style={{ color: "red", fontWeight: "600" }}>Expired</span>
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
              leftButton={() => resendOTP(props.role)}
              rightButton={() => validateOTP(props.role)}
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
