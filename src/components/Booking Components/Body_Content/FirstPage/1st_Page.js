import { Button } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import axios from "axios";
import { createContext, useContext, useMemo, useState } from "react";
import { CloseButton, Modal } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import FirstPage_Modal from "./1st_Page_Modal";
export const userContext = createContext();

export default function FirstPage(props) {
  const navigate = useNavigate();
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
  const breakPointMobile = useMediaQuery("(max-width: 1000px)");
  const [email, setEmail] = useState({ email: "", isChecked: false });
  const [isValid, setIsValid] = useState(null);
  const [showTermsModal, setShowTermsModal] = useState(false);
  const [showModal, setShowModal] = useState({
    verification: false,
    history: false,
  });
  const [userState, setUserState] = useState({
    otp: "",
    verified: false,
    hasHistory: null,
    historyPatients: null,
  });

  const handleOpenTerms = () => {
    setShowTermsModal(true);
  };

  const handleCloseTerms = () => {
    setShowTermsModal(false);
  };
  //Check valid email
  function isValidEmail(email) {
    return /\S+@\S+\.\S+/.test(email);
  }
  //Handler Funcions
  function OnchangeHandler(event) {
    setIsValid(null);
    const { name, value, type, checked } = event.target;
    setEmail((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  }
  async function OnSubmitHandler(event) {
    event.preventDefault();
    if (!isValidEmail(email.email)) {
      setIsValid(false);
    } else {
      const res = await axios.get("/booking/send-otp", {
        params: {
          email: email.email,
        },
      });
      const { data } = res.data.data;
      setUserState((prev) => ({
        ...prev,
        otp: data.OTP,
        hasHistory: data.hasHistory,
        historyPatients: data.patient_List,
      }));
      setShowModal((prev) => ({ ...prev, verification: true }));
    }
  }
  // Render Modals
  const modalElement = useMemo(() => {
    return (
      <>
        <userContext.Provider value={userState}>
          <FirstPage_Modal
            showModal={showModal}
            setuserState={setUserState}
            setShowModal={setShowModal}
            email={email.email}
            setCurrentPage={props.setCurrentPage}
          />
        </userContext.Provider>
      </>
    );
  }, [showModal]);

  return (
    <>
      <div className="FirstPage--body-wrapper">
        {breakPointMobile ? <h3>General Services</h3> : ""}
        <div className="Banner-wrapper">
          <picture>
            <source
              media="(max-width:1000px)"
              srcSet="/images/1st_Page_Banner-SM.png"
            ></source>
            <img
              src="/images/1st_Page_Banner.png"
              className="Booking-banner"
            ></img>
          </picture>
        </div>
        <div className="First_Page_Content">
          <h3>Set an Appointment</h3>
          <h5>Email Address</h5>
          <p>
            If you have previously made an online reservation, please supply
            your registered email address.
          </p>
          <form onSubmit={OnSubmitHandler}>
            <input
              className="form-control First-page_input"
              placeholder="Enter your email address"
              value={email.email}
              name="email"
              onChange={OnchangeHandler}
            ></input>

            {isValid === false ? (
              <p className="FirstPage_error ">
                Please enter a valid Email Address
              </p>
            ) : (
              ""
            )}
            <div className="terms">
              <input
                type="checkbox"
                id="terms"
                name="isChecked"
                checked={email.isChecked}
                onChange={OnchangeHandler}
                required
              ></input>
              <label htmlFor="terms">
                I agree to the{" "}
                <span className="termsandcond" onClick={handleOpenTerms}>
                  Terms & Conditions.
                </span>
              </label>
            </div>
            <div className="FirstPage--buttonRow">
              <Button
                onClick={() => {
                  navigate(-1);
                }}
                radius={smallScreen ? "md" : "xl" | isMobile ? "md" : "xl"}
                size={isMobile ? "xs" : "sm"}
                style={{
                  boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
                  backgroundColor: "#FF0000",
                  minWidth: buttonwidthS,
                }}
              >
                Back
              </Button>
              <Button
                type="submit"
                onSubmit={OnSubmitHandler}
                radius={smallScreen ? "md" : "xl" | isMobile ? "md" : "xl"}
                size={isMobile ? "xs" : "sm"}
                style={{
                  boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
                  backgroundColor: "#24B7E9",
                  minWidth: buttonwidthS,
                }}
              >
                Proceed
              </Button>
            </div>
          </form>
        </div>
      </div>
      <div>{modalElement}</div>
      <Modal show={showTermsModal} centered>
        <Modal.Header>
          <Modal.Title>Terms & Condition</Modal.Title>
          <CloseButton onClick={handleCloseTerms}></CloseButton>
        </Modal.Header>
        <Modal.Body>No Record Associated with this Email</Modal.Body>
        <Modal.Footer>
          <Button
            radius={smallScreen ? "md" : "xl" | isMobile ? "md" : "xl"}
            size={isMobile ? "xs" : "sm"}
            style={{
              boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
              backgroundColor: "#FF0000",
              minWidth: buttonwidthS,
            }}
            onClick={handleCloseTerms}
          >
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
