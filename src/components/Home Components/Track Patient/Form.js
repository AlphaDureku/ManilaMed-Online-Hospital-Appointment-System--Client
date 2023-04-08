import axios from "axios";
import { useState, useEffect, useMemo } from "react";
import VerificationModal from "./Modal";
export default function TrackMe() {
  const [user, setUser] = useState({ email: "", user_ID: "" });
  const [show, setShow] = useState(false);
  const [submit, setSubmit] = useState(false);
  const [verify, setVerify] = useState({
    exist: false,
    otp: "",
    verified: false,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    async function get() {
      const res = await axios.post("/trackMe", { email: user.email });
      if (res.data.data.exist) {
        setVerify((prev) => ({ ...prev, exist: true, otp: res.data.data.OTP }));
        setUser((prev) => ({ ...prev, user_ID: res.data.data.user_ID }));
      }
      setTimeout(() => {
        setLoading(false);
      }, 500);
    }
    get();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [submit]);

  function OnChangeHandler(event) {
    const { name, value } = event.target;
    setUser((prev) => ({ ...prev, [name]: value }));
  }

  function OnSubmitHandler(event) {
    event.preventDefault();
    setShow(true);
    setSubmit(!submit);
  }
  const modalElement = useMemo(() => {
    return (
      <VerificationModal
        show={show}
        setShow={setShow}
        OnSubmitHandler={OnSubmitHandler}
        exist={verify.exist}
        setVerify={setVerify}
        loading={loading}
        OTP={verify.otp}
        user_ID={user.user_ID}
      />
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [show, loading]);
  return (
    <div className="searchForm-container">
      <div className="tagtitle ">Tracker</div>
      <p className="tagtitle--p">
        Manage and Track your appointment using your Registered Email Address
      </p>
      <p className="tagtitle--p">
        <b>Email Address</b>
      </p>
      <form className="form-track" onSubmit={OnSubmitHandler}>
        <input
          className="form-control"
          placeholder="Enter your registered email address"
          name="email"
          value={user.email}
          onChange={OnChangeHandler}
          required
        ></input>
        <div>{modalElement}</div>
      </form>
    </div>
  );
}
