import { notifications } from "@mantine/notifications";
import axios from "axios";
import { useState } from "react";
import { CloseButton } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import { useNavigate } from "react-router-dom";
import VerificationModal from "../../Reusable_Components/Verification_Modal";

export default function HomeModal(props) {
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
    const res = await axios.post(
      process.env.REACT_APP_ONLINE + "/verifyOTP",
      {
        inputOTP: enteredOTP,
        user_ID: props.user.user_ID,
      },
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        withCredentials: true,
      }
    );
    const { isVerified, userToken } = res.data.data;
    if (isVerified) {
      props.setVerify((prev) => ({ ...prev, verified: true }));
      //Send request that a user is verified create a session for that patient
      localStorage.setItem("userToken", userToken);
      navigate("/User");
      return;
    }
    setError(true);
    return;
  };

  const OTPNotif = () => {
    notifications.show({
      title: "OTP Sent",
      color: "teal",
      autoClose: 2000,
    });
  };

  async function reSendOTP() {
    const res = await axios.post(process.env.REACT_APP_ONLINE + "/trackMe", {
      email: props.user.email,
    });
    if (res.data) {
      OTPNotif();
    }
  }
  function check(exist) {
    if (exist) {
      return (
        <VerificationModal
          show={props.show}
          OnCloseHandler={OnCloseHandler}
          leftButton={reSendOTP}
          rightButton={OnSubmitHandler}
          email={props.user.email}
          OnchangeHandler={OnchangeHandler}
          entered_OTP={enteredOTP}
          error={error}
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
