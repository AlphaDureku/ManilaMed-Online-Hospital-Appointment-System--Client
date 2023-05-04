import { notifications } from "@mantine/notifications";
import axios from "axios";
import { useContext, useState } from "react";
import Modal from "react-bootstrap/Modal";
import { useNavigate } from "react-router-dom";
import VerificationModal from "../../../../Reusable_Components/Verification_Modal";
import { userContext } from "../1st_Page";
import HistoryModal from "./History_Modal";

export default function FirstPage_Modal(props) {
  const userState = useContext(userContext);
  const [error, setError] = useState(false);
  const [input, setInput] = useState({ enteredOTP: "" });
  const [showHistory, setShowHistory] = useState(false);
  const { setShowModal, showModal } = props;

  const navigate = useNavigate();
  const OTPNotif = () => {
    notifications.show({
      title: "OTP Sent",
      color: "teal",
      autoClose: 2000,
    });
  };
  function OnCloseHandler() {
    setInput(() => ({ enteredOTP: "" }));
    setShowModal((prev) => ({ ...prev, verification: false }));
  }

  function OnchangeHandler(event) {
    setError(false);
    const { name, value } = event.target;
    setInput(() => ({ [name]: value }));
  }
  const OnSubmitHandler = async () => {
    const res = await axios.get("/booking/verifyOTP", {
      params: {
        inputOTP: input.enteredOTP,
      },
    });

    const { isVerified } = res.data.data;
    if (isVerified) {
      setShowModal((prev) => ({ ...prev, verification: false }));
      props.setAppointmentDetails((prev) => ({ ...prev, email: props.email }));
      if (userState.hasHistory) {
        setShowHistory(true);
      } else {
        navigate("/services/collect-info");
        return;
      }
    } else {
      setError(true);
    }
  };

  if (props.loading) {
    return (
      <>
        <Modal
          show={showModal.verification}
          onHide={OnCloseHandler}
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <img src="/images/manilamed-loading.gif" alt=""></img>
        </Modal>
      </>
    );
  }

  async function reSendOTP() {
    const res = await axios.get("/booking/send-otp", {
      params: {
        email: props.email,
      },
    });
    if (res.data) {
      OTPNotif();
    }
  }

  return (
    <>
      <VerificationModal
        show={showModal.verification}
        OnCloseHandler={OnCloseHandler}
        leftButton={reSendOTP}
        email={props.email}
        OnchangeHandler={OnchangeHandler}
        entered_OTP={input.enteredOTP}
        error={error}
        rightButton={OnSubmitHandler}
      />
      <HistoryModal
        show={showHistory}
        setShow={setShowHistory}
        setInput={setInput}
        setAppointmentDetails={props.setAppointmentDetails}
      />
    </>
  );
}
