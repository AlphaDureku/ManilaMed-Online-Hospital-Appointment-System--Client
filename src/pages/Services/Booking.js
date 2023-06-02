import { Notifications } from "@mantine/notifications";
import { useEffect } from "react";
import Footer from "../../components/Booking Components/Footer/Footer";
import FirstPage from "../../components/Booking Components/Main_Content/FirstPage/1st_Page";
import NavBar from "../../components/Booking Components/NavBar/NavBar";
export default function Booking() {
  useEffect(() => {
    document.title = "Booking";
  }, []);

  return (
    <>
      <Notifications position="top-center" zIndex={3000} />
      <div className="Booking--wrapper">
        <NavBar />
        <FirstPage />
        <Footer />
      </div>
    </>
  );
}
