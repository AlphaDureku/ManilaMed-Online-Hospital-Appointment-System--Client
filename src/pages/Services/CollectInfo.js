import { useEffect } from "react";
import Footer from "../../components/Booking Components/Footer/Footer";
import StepsHandler from "../../components/Booking Components/Main_Content/SecondPage/StepsHandler";
import NavBar from "../../components/Booking Components/NavBar/NavBar";

export default function CollectInfo(props) {
  useEffect(() => {
    document.title = "Patient Information";
  }, []);

  return (
    <>
      <div className="Booking--wrapper">
        <NavBar />
        <StepsHandler />
        <Footer />
      </div>
    </>
  );
}
