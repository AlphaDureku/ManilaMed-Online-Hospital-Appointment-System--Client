import { useMediaQuery } from "@mantine/hooks";
import { useContext } from "react";
import { AdminPageContext } from "../../../pages/Admin";
import Navbar from "../NavBar/NavBar";
import LandingPage from "../Sub_Components/LandingPage";
import SideBar from "../Sub_Components/SideBar";
import Calendar from "./Calendar";
import Settings from "./Settings";

export default function Content() {
  const breakPointMobile = useMediaQuery("(max-width: 800px)");
  const { currentPage } = useContext(AdminPageContext);
  return (
    <>
      {breakPointMobile ? "" : <Navbar />}
      <div className="adminMainContainer">
        <SideBar />
        {currentPage === 1 ? (
          <LandingPage />
        ) : currentPage === 2 ? (
          <Calendar />
        ) : (
          <Settings />
        )}
      </div>
    </>
  );
}
