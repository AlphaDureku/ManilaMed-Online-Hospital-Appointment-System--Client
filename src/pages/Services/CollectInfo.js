import { useEffect } from "react";
import SecondPage from "../../components/Booking Components/Body_Content/SecondPage/2ndPage";
import Footer from "../../components/Booking Components/Footer/Footer";
import NavBar from "../../components/Booking Components/NavBar/NavBar";

export default function CollectInfo(props) {
  useEffect(() => {
    document.title = "Patient Information";
  }, []);

  return (
    <>
      <div className="Booking--wrapper">
        <NavBar />
        <SecondPage />
        <Footer />
      </div>
    </>
  );
}
