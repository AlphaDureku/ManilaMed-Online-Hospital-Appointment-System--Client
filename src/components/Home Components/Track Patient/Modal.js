import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Modal from "react-bootstrap/Modal";
import BackProceed from "../../Reusable_Components/Buttons--BackProceed";
import axios from "axios";
import { Button } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";

export default function VerificationModal(props) {

    // for responsiveness
    const smallScreen = useMediaQuery(
      "(min-width: 701px) and (max-width: 1255px)"
    );
    const isMobile = useMediaQuery("(max-width:700px");
    const buttonwidthS = smallScreen
      ? "150px"
      : "100px" | isMobile
      ? "120px"
      : "100px";
      

      
  const [enteredOTP, setEnteredOTP] = useState("");
  const [error, setError] = useState(false);
  let navigate = useNavigate();
  const handleOnChange = (event) => {
    const { value } = event.target;
    setEnteredOTP(value);
    setError(false);
  };



  const handleClose = () => {
    props.setShow(false);
    setEnteredOTP("");
    setError(false);
    setTimeout(() => {
      props.setVerify((prev) => ({ ...prev, exist: false }));
    }, 500);
  };

  const handleVerification = async () => {
    const res = await axios.get("/verifyOTP", {
      params: {
        inputOTP: enteredOTP,
      },
    });
    const { isVerified } = res.data.data;
    console.log(isVerified);
    if (isVerified) {
      props.setVerify((prev) => ({ ...prev, verified: true }));
      //Send request that a user is verified create a session for that patient
      await axios.post("/user/set-userSession", {
        user_ID: props.user.user_ID,
      });
      navigate("/User");
      return;
    }
    setError(true);
    return;
  };
  function check(exist) {
    if (exist) {
      return (
        <>
          <Modal.Header  >
            <Modal.Title>Email Verification</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="modal-body text-center">
              <label className="modal-form">
                (OTP) One Time Password has been sent to{" "}
                <b>{props.user.email}</b>
              </label>
              <br></br>
              <p>Please Enter (6) digit code to complete your verification.</p>
              <div className=" otp-form  container-fluid text-center">
                <input
                  type="text"
                  className="form-control otp-input"
                  name="enteredOTP"
                  onChange={handleOnChange}
                  value={enteredOTP}
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
            <div className="TrackAtHome--buttonRow">
              <BackProceed
                OnCloseHandler={handleClose}
                OnSubmitHandler={handleVerification}
                redButtonText={"Cancel"}
                blueButtonText={"Verify"}
              />
            </div>
          </Modal.Footer>
        </>
      );
    }

    return (
      <>
        <Modal.Header>
          <Modal.Title>No Record</Modal.Title>
        </Modal.Header>
        <Modal.Body>No Record Associated with this Email</Modal.Body>
        <Modal.Footer>
        <Button
              radius={smallScreen ? "md" : "xl" | isMobile ? "md" : "xl"}
              size={isMobile ? "xs" : "sm"}
            onClick={handleClose}
            style={{
              boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
              backgroundColor: "rgba(255, 0, 0, 1)",
              minWidth: buttonwidthS,


            }}
          >
            Close
          </Button>
        </Modal.Footer>
      </>
    );
  }

  if (props.loading) {
    return (
      <>
        <div className="mt-4"></div>
        <Button
              radius={smallScreen ? "md" : "xl" | isMobile ? "md" : "xl"}
              size={isMobile ? "xs" : "sm"}
            type="submit"
            style={{
              boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
              backgroundColor: "#24B7E9",
              minWidth: buttonwidthS,


            }}
          >
            Search
          </Button>
          <div className="mt-3"></div>

        <Modal
          show={props.show}
          onHide={props.handleClose}
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <img src="/images/manilamed-loading.gif" alt=""></img>
        </Modal>
      </>
    );
  } else {
    return (
      <>
        <div className="mt-4"></div>
        <Button
             radius={smallScreen ? "md" : "xl" | isMobile ? "md" : "xl"}
             size={isMobile ? "xs" : "sm"}
            type="submit"
            style={{
              boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
              backgroundColor: "#24B7E9",
              minWidth: buttonwidthS,


            }}
          >
            Search
          </Button>
          <div className="mt-3"></div>


        
        <Modal
          show={props.show}
          onHide={props.handleClose}
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          {check(props.exist)}
        </Modal>
      </>
    );
  }
}
