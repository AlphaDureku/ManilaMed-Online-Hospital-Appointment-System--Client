import { useEffect, useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import SessionExpiredModal from "../components/Reusable_Components/sessionExpriredModal";
import Footer from "../components/Tracking Components/Footer/Footer";
import EditInfo from "../components/Tracking Components/Main Content/EditInfo";
import LandingPage from "../components/Tracking Components/Main Content/LandingPage";
import ViewAppointments from "../components/Tracking Components/Main Content/ViewAppointments";
import NavBar from "../components/Tracking Components/NavBar/NavBar";

export default function Track() {
  const [showExpire, setShowExpire] = useState();
  useEffect(() => {
    document.title = "Track Me";
  }, []);
  const navigate = useNavigate();
  const HandleSubmitError401 = () => {
    localStorage.removeItem("userToken");
    navigate("/");
  };
  return (
    <>
      <div className="wrapper">
        <NavBar />
        <Routes>
          <Route
            index
            element={<LandingPage setShowExpire={setShowExpire} />}
          />
          <Route
            path="/Edit-Info"
            element={<EditInfo setShowExpire={setShowExpire} />}
          />
          <Route
            path="/View-Appointments"
            element={<ViewAppointments setShowExpire={setShowExpire} />}
          />
        </Routes>
        <Footer />
      </div>
      <SessionExpiredModal
        show={showExpire}
        handleSubmit={HandleSubmitError401}
      />
    </>
  );
}
