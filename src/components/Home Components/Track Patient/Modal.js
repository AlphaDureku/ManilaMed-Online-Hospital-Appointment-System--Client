import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import mamedLoading from  '../../../images/manilamed-loading.gif'



export default function VerificationModal(props) {
  const [enteredOTP, setEnteredOTP] = useState("");
  const [error, setError] = useState(false);
  let navigate = useNavigate();
  const handleOnChange = (event) => {
    const { value } = event.target;
    setEnteredOTP(value);
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
    if (enteredOTP == /*props.OTP*/ 1) {
      props.setVerify((prev) => ({ ...prev, verified: true }));
      //Send request that a user is verified create a session for that patient
      await axios.post("/user/set-userSession", {
        user_ID: props.user_ID,
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
          <Modal.Header closeButton onClick={handleClose}>
            <Modal.Title>Email Verification</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="modal-body text-center">
              <label className="modal-form">
                (OTP) One Time Password has been sent to
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
            <Button className="Search" onClick={handleVerification}>
              Verify
            </Button>
            <Button className="Clear" type="submit" onClick={handleClose}>
              Cancel
            </Button>
          </Modal.Footer>
        </>
      );
    }

    return (
      <>
        <Modal.Header closeButton>
          <Modal.Title>No Record</Modal.Title>
        </Modal.Header>
        <Modal.Body>No Record Associated with this Email</Modal.Body>
        <Modal.Footer>
          <Button className="Search" onClick={handleClose}>
            Close
          </Button>
          <Button className="Clear" type="submit" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </>
    );
  }

  if (props.loading) {
    return (
      <>
        <button type="submit" className=" btn-success btn Search-track">
          Search
        </button>
        <Modal
          show={props.show}
          onHide={props.handleClose}
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <img
            src= {mamedLoading}
            alt=""
          ></img>
        </Modal>
      </>
    );
  } else {
    return (
      <>
        <button type="submit" className=" btn-success btn Search-track">
          Search
        </button>
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
