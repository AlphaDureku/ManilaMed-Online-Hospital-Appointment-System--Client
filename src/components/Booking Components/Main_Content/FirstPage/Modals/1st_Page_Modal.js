import { notifications } from "@mantine/notifications";
import axios from "axios";
import { useContext, useMemo, useState } from "react";
import Modal from "react-bootstrap/Modal";
import { useNavigate } from "react-router-dom";
import { AppointmentDetailsContext } from "../../../../../App";
import VerificationModal from "../../../../Reusable_Components/Verification_Modal";
import { userContext } from "../1st_Page";
import HistoryModal from "./History_Modal";

export default function FirstPage_Modal(props) {
  const { setAppointmentDetails } = useContext(AppointmentDetailsContext);
  const userState = useContext(userContext);
  const [error, setError] = useState(false);
  const [input, setInput] = useState({ enteredOTP: "" });
  const [showHistory, setShowHistory] = useState(false);
  const { setShowModal, showModal } = props;
  const [OTPhasExpired, setOTPhasExpired] = useState(false);
  const navigate = useNavigate();
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
    const res = await axios.get(
      process.env.REACT_APP_ONLINE + "/booking/verifyOTP",
      {
        params: {
          inputOTP: input.enteredOTP,
          hasExpired: OTPhasExpired,
        },
      }
    );
    const { isVerified } = res.data.data;
    if (isVerified) {
      setShowModal((prev) => ({ ...prev, verification: false }));
      setAppointmentDetails((prev) => ({ ...prev, email: props.email }));
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

  // Render Modals
  const FirstPageModals = useMemo(() => {
    return (
      <>
        <VerificationModal
          show={showModal.verification}
          OnCloseHandler={OnCloseHandler}
          email={props.email}
          OnchangeHandler={OnchangeHandler}
          entered_OTP={input.enteredOTP}
          error={error}
          rightButton={OnSubmitHandler}
          setOTPhasExpired={setOTPhasExpired}
        />
        <HistoryModal
          show={showHistory}
          setShowHistory={setShowHistory}
          setInput={setInput}
        />
      </>
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.loading, showHistory, input, error]);

  const FirstPageModals_Loading = (
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

  return <>{props.loading ? FirstPageModals_Loading : FirstPageModals}</>;
}
