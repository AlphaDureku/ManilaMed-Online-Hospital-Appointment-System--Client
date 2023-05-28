import { useMediaQuery } from "@mantine/hooks";
import { createContext, useContext, useState } from "react";

import { AdminPageContext } from "../../../pages/Admin";
import Navbar from "../NavBar/NavBar";
import LandingPage from "../Sub_Components/LandingPage";
import SideBar from "../Sub_Components/SideBar";
import Calendar from "./Calendar";
import Settings from "./Settings";

export const AdminContext = createContext();

export default function Content() {
  const breakPointMobile = useMediaQuery("(max-width: 800px)");
  const { currentPage } = useContext(AdminPageContext);
  const [selectedDoctor, setSelectedDoctor] = useState("");
  const [doctorList, setDoctorList] = useState([]);

  const AdminValues = {
    selectedDoctor: selectedDoctor,
    setSelectedDoctor: setSelectedDoctor,
    doctorList: doctorList,
    setDoctorList: setDoctorList,
  };

  return (
    <>
      {breakPointMobile ? "" : <Navbar />}
      <AdminContext.Provider value={AdminValues}>
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
      </AdminContext.Provider>
    </>
  );
}
