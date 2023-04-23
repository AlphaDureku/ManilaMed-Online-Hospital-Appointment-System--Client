import { Button } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import axios from "axios";
import { useState } from "react";
import { CloseButton } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import { useNavigate } from "react-router-dom";
import VerificationModal from "../../Reusable_Components/Verification_Modal";

export default function HomeModal(props) {
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
  const OnchangeHandler = (event) => {
    const { value } = event.target;
    setEnteredOTP(value);
    setError(false);
  };

  const OnCloseHandler = () => {
    props.setShow(false);
    setEnteredOTP("");
    setError(false);
    setTimeout(() => {
      props.setVerify((prev) => ({ ...prev, exist: false }));
    }, 500);
  };

  const OnSubmitHandler = async () => {
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
        <VerificationModal
          show={props.show}
          OnCloseHandler={OnCloseHandler}
          email={props.user.email}
          OnchangeHandler={OnchangeHandler}
          entered_OTP={enteredOTP}
          error={error}
          OnSubmitHandler={OnSubmitHandler}
        />
      );
    } else {
      return (
        <>
          <Modal
            show={props.show}
            aria-labelledby="contained-modal-title-vcenter"
            centered
          >
            <Modal.Header>
              <Modal.Title>No Record</Modal.Title>
              <CloseButton onClick={OnCloseHandler}></CloseButton>
            </Modal.Header>
            <Modal.Body>No Record Associated with this Email</Modal.Body>
            <Modal.Footer>
              <Button
                radius={smallScreen ? "md" : "xl" | isMobile ? "md" : "xl"}
                size={isMobile ? "xs" : "sm"}
                onClick={OnCloseHandler}
                style={{
                  boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
                  backgroundColor: "rgba(255, 0, 0, 1)",
                  minWidth: buttonwidthS,
                }}
              >
                Close
              </Button>
            </Modal.Footer>
          </Modal>
        </>
      );
    }
  }

  if (props.loading) {
    return (
      <>
        <Modal
          show={props.show}
          onHide={props.OnCloseHandler}
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <img src="/images/manilamed-loading.gif" alt=""></img>
        </Modal>
      </>
    );
  } else {
    return <>{check(props.exist)}</>;
  }
}
