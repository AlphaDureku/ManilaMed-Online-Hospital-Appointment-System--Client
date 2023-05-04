import { Button } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { notifications } from "@mantine/notifications";
import axios from "axios";
import { createContext, useMemo, useState } from "react";
import { CloseButton, Modal } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import BackProceed from "../../../Reusable_Components/Buttons--BackProceed";
import FirstPageModal from "./1st_Page_Modal";

export const userContext = createContext();

export default function FirstPage(props) {
  // for responsiveness
  const smallScreen = useMediaQuery(
    "(min-width: 701px) and (max-width: 1255px)"
  );
  const isMobile = useMediaQuery("(max-width:700px");
  const buttonwidthS = smallScreen
    ? "120px"
    : "100px" | isMobile
    ? "100px"
    : "100px";

  const breakPointMobile = useMediaQuery("(max-width: 1000px)");
  const breakPoint = useMediaQuery("(max-width: 800px)");

  const OTPNotif = () => {
    notifications.show({
      title: "OTP Sent",
      color: "teal",
      autoClose: 2000,
    });
  };

  const navigate = useNavigate();
  const [email, setEmail] = useState({ email: "", isChecked: false });
  const [loading, setLoading] = useState(false);
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

  const handleTerms = () => {
    setEmail((prev) => ({
      ...prev,
      isChecked: true,
    }));
    setShowTermsModal(false);
  };

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
    setLoading(true);
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
      setTimeout(() => {
        setLoading(false);
      }, 500);
      setUserState((prev) => ({
        ...prev,
        otp: data.OTP,
        hasHistory: data.hasHistory,
        historyPatients: data.patient_List,
      }));
      setShowModal((prev) => ({ ...prev, verification: true }));
      setTimeout(() => {
        OTPNotif();
      }, 600);
    }
  }

  // Render Modals
  const modalElement = useMemo(() => {
    return (
      <>
        <userContext.Provider value={userState}>
          <FirstPageModal
            showModal={showModal}
            loading={loading}
            setuserState={setUserState}
            setShowModal={setShowModal}
            email={email.email}
            setAppointmentDetails={props.setAppointmentDetails}
          />
        </userContext.Provider>
      </>
    );
  }, [showModal, loading]);

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
              <label htmlFor="terms">I agree to the </label>
              <span className="termsandcond ms-1" onClick={handleOpenTerms}>
                Terms & Conditions.
              </span>
            </div>
            <div className="FirstPage--buttonRow">
              <BackProceed
                leftButton={() => {
                  navigate(-1);
                }}
                OnchangeHandler={OnSubmitHandler}
                redButtonText={"Cancel"}
                blueButtonText={"Proceed"}
              />
            </div>
          </form>
        </div>
      </div>
      <div>{modalElement}</div>
      <Modal show={showTermsModal} centered>
        <Modal.Header>
          <Modal.Title className="modalCalendarHeader">
            Terms & Condition
          </Modal.Title>
          <CloseButton onClick={handleCloseTerms}></CloseButton>
        </Modal.Header>
        <Modal.Body>
          <div className="greetingTerms">
            Welcome to our hospital appointment system. By using our system, you
            agree to comply with and be bound by the following terms and
            conditions of use, which together with our privacy policy govern our
            relationship with you in relation to this system. If you disagree
            with any part of these terms and conditions, please do not use our
            system.
          </div>
          <div className="termscontent mt-4">
            <div className="wordlistterms">
              <label className="numberlistedTerms">1. </label>
              Use of the system is subject to acceptance of these terms and
              conditions.
            </div>
            <div className="wordlistterms">
              <label className="numberlistedTerms">2. </label>
              The system is for booking hospital appointments only and any other
              use is prohibited.
            </div>
            <div className="wordlistterms">
              <label className="numberlistedTerms">3. </label>
              The accuracy of the information provided is the responsibility of
              the user.
            </div>
            <div className="wordlistterms">
              <label className="numberlistedTerms">4. </label>
              Users must not share their login details with others.
            </div>
            <div className="wordlistterms">
              <label className="numberlistedTerms">5. </label>
              The hospital reserves the right to cancel appointments or limit
              access to the system without notice.
            </div>
            <div className="wordlistterms">
              <label className="numberlistedTerms">6. </label>
              Users must not use the system for any unlawful or malicious
              purposes.
            </div>
            <div className="wordlistterms">
              <label className="numberlistedTerms">7. </label>
              The hospital is not responsible for any loss or damage caused by
              the use of the system.
            </div>
            <div className="wordlistterms">
              <label className="numberlistedTerms">8. </label>
              The hospital may update or modify the system and these terms and
              conditions at any time.
            </div>
            <div className="wordlistterms">
              <label className="numberlistedTerms">9. </label>
              Any disputes will be subject to the laws of the relevant
              jurisdiction.
            </div>{" "}
            <div className="wordlistterms">
              <label className="numberlistedTerms">10. </label>
              By using the system, users agree to these terms and conditions.
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button
            radius="xl"
            size="sm"
            style={{
              boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
              backgroundColor: "#2F9D44",
              minWidth: buttonwidthS,
            }}
            onClick={handleTerms}
          >
            Accept
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
