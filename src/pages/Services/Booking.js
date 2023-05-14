import { useEffect } from "react";
import Footer from "../../components/Booking Components/Footer/Footer";
import FirstPage from "../../components/Booking Components/Main_Content/FirstPage/1st_Page";
import NavBar from "../../components/Booking Components/NavBar/NavBar";
export default function Booking(props) {
  useEffect(() => {
    document.title = "Booking";
  }, []);

  return (
    <>
      <div className="Booking--wrapper">
        <NavBar />
        <FirstPage />
        <Footer />
      </div>
    </>
  );
}
