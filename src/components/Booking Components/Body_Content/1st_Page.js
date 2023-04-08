export default function FirstPage() {
  return (
    <>
      <div className="FirstPage--body-wrapper">
        <div className="Banner-wrapper">
          <img
            src="/images/1st_Page_Banner.png"
            className="Booking-banner"
          ></img>
        </div>
        <div className="First_Page_Content">
          <h3>Set an Appointment</h3>
          <h5>Email Address</h5>
          <p>
            If you have previously made an online reservation, please supply
            your registered email address.
          </p>
          <input
            className="form-control First-page_input"
            placeholder="Enter your email address"
          ></input>
          <div>
            <input type="checkbox" id="terms"></input>
            <label for="terms">
              {" "}
              I agree to the{" "}
              <span style={{ color: "#2F9D44" }}>Terms & Conditions.</span>
            </label>
          </div>
          <div className="FirstPage--buttonRow">
            <button>Back</button>
            <button>Proceed</button>
          </div>
        </div>
      </div>
    </>
  );
}
