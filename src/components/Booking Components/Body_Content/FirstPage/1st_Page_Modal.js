import axios from "axios";
import { useContext, useState } from "react";
import Modal from "react-bootstrap/Modal";
import BackProceed from "../../../Reusable_Components/Buttons--BackProceed";
import VerificationModal from "../../../Reusable_Components/Verification_Modal";
import { userContext } from "./1st_Page";
import PatientCard from "./Patient--Card";

export default function FirstPage_Modal(props) {
  const userState = useContext(userContext);
  const [error, setError] = useState(false);
  const [input, setInput] = useState({ enteredOTP: "" });
  const [showHistory, setShowHistory] = useState(false);
  const { setShowModal, showModal } = props;

  function OnCloseHandler() {
    setInput(() => ({ enteredOTP: "" }));
    setShowModal((prev) => ({ ...prev, verification: false }));
  }
  function OnCloseHandler_History() {
    setInput(() => ({ enteredOTP: "" }));
    setShowHistory(false);
  }
  function OnSubmitHandler_History() {
    props.setCurrentPage(2);
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
      if (userState.hasHistory) {
        setShowHistory(true);
      } else {
        console.log("No History, go to fill up page");
        return;
      }
      // props.setCurrentPage(2);
    } else {
      setError(true);
    }
  };

  // Start of User Patient History Modal
  const HistoryModal = (
    <Modal show={showHistory} centered size="lg">
      <Modal.Header>
        {" "}
        <Modal.Title>
          <h2 className="Options_H2">Options</h2>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p className="Options_P">
          We discovered a record associated to the email address you provided.
          Please indicate whose reservation is this for.
        </p>
        <form className="radio-form">
          <PatientCard />
          <label className="radioLabel">
            <input type="radio" name="patientName" value={0}></input>
            <div>Booking for others</div>
          </label>
        </form>
      </Modal.Body>
      <Modal.Footer>
        {" "}
        <div className="Options_buttonRow">
          <BackProceed
            leftButton={OnCloseHandler_History}
            rightButton={OnSubmitHandler_History}
            redButtonText={"Cancel"}
            blueButtonText={"Proceed"}
          />
        </div>
      </Modal.Footer>
    </Modal>
  );

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
      alert("Success");
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
      {HistoryModal}
    </>
  );
}
