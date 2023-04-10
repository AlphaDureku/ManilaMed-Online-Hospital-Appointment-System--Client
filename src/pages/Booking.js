import { useEffect } from "react";
import NavBar from "../components/Booking Components/NavBar/NavBar";
import Footer from "../components/Booking Components/Footer/Footer";
import { Route, Routes } from "react-router-dom";
import FirstPage from "../components/Booking Components/Body_Content/FirstPage/1st_Page";

export default function Services() {
  useEffect(() => {
    document.title = "Booking";
  }, []);
  return (
    <>
      <div className="Booking--wrapper">
        <NavBar />
        <Routes>
          <Route index element={<FirstPage />} />
        </Routes>
        <Footer />
      </div>
    </>
  );
}
