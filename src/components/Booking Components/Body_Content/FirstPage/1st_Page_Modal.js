import { useContext, useState } from "react";
import { userContext } from "./1st_Page";
import BackProceed from "../../../Reusable_Components/Buttons--BackProceed";
import PatientCard from "./Patient--Card";
import Modal from "react-bootstrap/Modal";
import axios from "axios";

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
    console.log("");
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
  // Start of User OTP verification
  const VerificationModal = (
    <Modal
      show={showModal.verification}
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton onClick={OnCloseHandler}>
        <Modal.Title>Email Verification</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="modal-body text-center">
          <label className="modal-form">
            (OTP) One Time Password has been sent to
          </label>
          <br></br>
          <p>Please Enter (6) digit code to complete your verification.</p>
          <div className=" otp-form">
            <input
              type="text"
              className="form-control otp-input"
              name="enteredOTP"
              onChange={OnchangeHandler}
              value={input.enteredOTP}
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
          <label className="label pt-2">OTP is valid for 3 minutes</label>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <div className="OTP_buttonRow">
          <BackProceed
            OnCloseHandler={OnCloseHandler}
            OnSubmitHandler={OnSubmitHandler}
            redButtonText={"Cancel"}
            blueButtonText={"Proceed"}
          />
        </div>
      </Modal.Footer>
    </Modal>
  );

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
            <input type="radio" name="patientName"></input>
            <div>Booking for others</div>
          </label>
        </form>
      </Modal.Body>
      <Modal.Footer>
        {" "}
        <div className="Options_buttonRow">
          <BackProceed
            OnCloseHandler={OnCloseHandler_History}
            OnSubmitHandler={OnSubmitHandler_History}
            redButtonText={"Cancel"}
            blueButtonText={"Proceed"}
          />
        </div>
      </Modal.Footer>
    </Modal>
  );

  return (
    <>
      {VerificationModal}
      {HistoryModal}
    </>
  );
}
