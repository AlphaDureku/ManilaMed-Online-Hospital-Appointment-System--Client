import { useEffect } from "react";
import Footer from "../../components/Booking Components/Footer/Footer";
import SecondPage from "../../components/Booking Components/Main_Content/SecondPage/2ndPage";
import NavBar from "../../components/Booking Components/NavBar/NavBar";

export default function CollectInfo(props) {
  useEffect(() => {
    document.title = "Patient Information";
  }, []);

  return (
    <>
      <div className="Booking--wrapper">
        <NavBar />
        <SecondPage
          setAppointmentDetails={props.setAppointmentDetails}
          appointmentDetails={props.appointmentDetails}
        />
        <Footer />
      </div>
    </>
  );
}
