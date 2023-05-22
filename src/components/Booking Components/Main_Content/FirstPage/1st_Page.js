import { useMediaQuery } from "@mantine/hooks";
import { createContext, useEffect, useMemo, useState } from "react";
import FirstPageForms from "./1st_Page--Forms";
import FirstPageModal from "./Modals/1st_Page_Modal";
import TermsAndConditionsModal from "./Modals/Terms&Conditions_Modal";
export const userContext = createContext();
export default function FirstPage() {
  const breakPointMobile = useMediaQuery("(max-width: 1000px)");
  const [email, setEmail] = useState({ email: "", isChecked: false });
  const [loading, setLoading] = useState(false);
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

  const acceptTermsHandler = () => {
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

  // Render Modals
  const VerfificationModal = useMemo(() => {
    return (
      <>
        <userContext.Provider value={userState}>
          <FirstPageModal
            showModal={showModal}
            loading={loading}
            setuserState={setUserState}
            setShowModal={setShowModal}
            email={email.email}
          />
        </userContext.Provider>
      </>
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
              alt="banner"
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
          <FirstPageForms
            setLoading={setLoading}
            setEmail={setEmail}
            email={email}
            setUserState={setUserState}
            setShowModal={setShowModal}
            handleOpenTerms={handleOpenTerms}
          />
        </div>
      </div>
      {VerfificationModal}
      <TermsAndConditionsModal
        showTermsModal={showTermsModal}
        handleCloseTerms={handleCloseTerms}
        acceptTermsHandler={acceptTermsHandler}
      />
    </>
  );
}
