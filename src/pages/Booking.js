import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import Content from "../components/Booking Components/Body_Content/PageController";
import Footer from "../components/Booking Components/Footer/Footer";
import NavBar from "../components/Booking Components/NavBar/NavBar";

export default function Services() {
  const [currentPage, setCurrentPage] = useState(1);
  useEffect(() => {
    document.title = "Booking";
  }, []);
  return (
    <>
      <div className="Booking--wrapper">
        <NavBar />
        <Content currentPage={currentPage} setCurrentPage={setCurrentPage} />
        <Footer />
      </div>
    </>
  );
}
