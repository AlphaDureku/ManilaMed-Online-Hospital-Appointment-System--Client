import { Button } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { notifications } from "@mantine/notifications";
import axios from "axios";
import { useEffect, useMemo, useState } from "react";
import Modal from "./Modal";

export default function TrackMe() {
  const [user, setUser] = useState({ email: "", user_ID: "" });
  const [show, setShow] = useState(false);
  const [submit, setSubmit] = useState(false);
  const [loading, setLoading] = useState(true);
  const [verify, setVerify] = useState({
    exist: false,
    otp: "",
    verified: false,
  });

  const smallScreen = useMediaQuery(
    "(min-width: 701px) and (max-width: 1255px)"
  );
  const isMobile = useMediaQuery("(max-width:700px");
  const buttonwidthS = smallScreen
    ? "150px"
    : "100px" | isMobile
    ? "120px"
    : "100px";

  const OTPNotif = () => {
    //Dito yung resend bug
    notifications.show({
      title: "OTP Sent",
      color: "teal",
      autoClose: 2000,
    });
  };

  async function sendOTP() {
    setLoading(true);
    const res = await axios.got(
      "https://server-production-e6a5.up.railway.app/trackMe",
      {
        email: user.email,
      }
    );
    console.log(res);
    if (res.data.data.exist) {
      setVerify((prev) => ({ ...prev, exist: true, otp: res.data.data.OTP }));
      setUser((prev) => ({ ...prev, user_ID: res.data.data.user_ID }));
      setTimeout(() => {
        OTPNotif();
      }, 800);
    }
    setTimeout(() => {
      setLoading(false);
    }, 500);
  }

  function OnChangeHandler(event) {
    const { name, value } = event.target;
    setUser((prev) => ({ ...prev, [name]: value }));
  }
  function OnSubmitHandler(event) {
    event.preventDefault();
    sendOTP();
    setShow(true);
    setSubmit(!submit);
  }
  const modalElement = useMemo(() => {
    return (
      <Modal
        show={show}
        setShow={setShow}
        OnSubmitHandler={OnSubmitHandler}
        exist={verify.exist}
        setVerify={setVerify}
        loading={loading}
        OTP={verify.otp}
        user={user}
      />
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [show, loading]);
  return (
    <div className="searchForm-container" id="Tracker">
      <div className="tagtitle mt-4">Tracker</div>
      <p className="tagsupport mt-2 ms-2 me-2">
        Manage and Track your appointment using your Registered Email Address
      </p>

      <form className="form-track " onSubmit={OnSubmitHandler}>
        <input
          className="form-control"
          placeholder="Enter your registered email address"
          name="email"
          value={user.email}
          onChange={OnChangeHandler}
          required
        ></input>
        <div>{modalElement}</div>
        <Button
          radius="xl"
          size={isMobile ? "xs" : "sm"}
          type="submit"
          style={{
            boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
            backgroundColor: "#24B7E9",
            minWidth: buttonwidthS,
            margin: "3%",
          }}
        >
          Search
        </Button>
      </form>
    </div>
  );
}
