import { notifications } from "@mantine/notifications";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import BackProceed from "../../../Reusable_Components/Buttons--BackProceed";

export default function FirstPageForms(props) {
  const {
    setLoading,
    setEmail,
    email,
    setUserState,
    setShowModal,
    handleOpenTerms,
  } = props;
  const navigate = useNavigate();
  const [isValid, setIsValid] = useState(null);

  const OTPNotif = () => {
    notifications.show({
      title: "OTP Sent",
      color: "teal",
      autoClose: 2000,
    });
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
      const res = await axios.got(
        process.env.REACT_APP_ONLINE + "/booking/send-otp",
        {
          params: {
            email: email.email,
          },
        }
      );
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
  return (
    <form onSubmit={OnSubmitHandler}>
      <input
        className="form-control First-page_input"
        placeholder="Enter your email address"
        value={email.email}
        name="email"
        onChange={OnchangeHandler}
      ></input>

      {isValid === false ? (
        <p className="FirstPage_error ">Please enter a valid Email Address</p>
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
  );
}
