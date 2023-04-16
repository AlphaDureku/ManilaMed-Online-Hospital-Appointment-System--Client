import { Button, em } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { useState, useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import FirstPage_Modal from "./1st_Page_Modal";

export default function FirstPage(props) {
  const navigate = useNavigate();
  const breakPoint = useMediaQuery("(max-width: 800px)");
  const breakPointMobile = useMediaQuery("(max-width: 1000px)");

  const [email, setEmail] = useState({ email: "", isChecked: false });
  const [isValid, setIsValid] = useState(null);
  const [showModal, setShowModal] = useState({
    verification: false,
    history: false,
  });
  const [loading, setLoading] = useState(true);
  const [userState, setUserState] = useState({
    otp: "",
    verified: false,
    hasHistory: null,
    historyPatients: null,
  });

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
  // Render Modal for verification
  const modalElement = useMemo(() => {
    return (
      <FirstPage_Modal
        showModal={showModal}
        setuserState={setUserState}
        setShowModal={setShowModal}
        loading={loading}
        email={email.email}
        userState={userState}
        setCurrentPage={props.setCurrentPage}
      />
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
                {" "}
                I agree to the{" "}
                <span style={{ color: "#2F9D44" }}>Terms & Conditions.</span>
              </label>
            </div>
            <div className="FirstPage--buttonRow">
              <Button
                onClick={() => {
                  navigate(-1);
                }}
                style={{
                  boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
                  backgroundColor: "#FF0000",
                  fontSize: breakPoint ? "0.7rem" : "1rem",
                  fontFamily: "Inter",
                }}
              >
                Back
              </Button>
              <Button
                type="submit"
                onSubmit={OnSubmitHandler}
                style={{
                  boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
                  backgroundColor: "#24B7E9",
                  fontSize: breakPoint ? "0.7rem" : "1rem",
                  fontFamily: "Inter",
                }}
              >
                Proceed
              </Button>
            </div>
          </form>
        </div>
      </div>
      <div>{modalElement}</div>
    </>
  );
}
