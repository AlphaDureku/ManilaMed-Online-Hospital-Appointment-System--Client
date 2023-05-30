import { useMediaQuery } from "@mantine/hooks";
import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { ErrorHandler } from "../../../utils/errorHandler";


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
  const [doctorList, setDoctorList] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState("");
  const [calendarData, setCalendarData] = useState([]);
  const [updateSettings, setUpdateSettings] = useState(false);
  const [nurseData, setNurseData] = useState("");

  const AdminValues = {
    selectedDoctor: selectedDoctor,
    setSelectedDoctor: setSelectedDoctor,
    doctorList: doctorList,
    setDoctorList: setDoctorList,
    calendarData: calendarData,
    setCalendarData: setCalendarData,
  };

  useEffect(() => {
    const token = localStorage.getItem("nurseToken");

    async function getData() {
      try {
        const res = await axios.get(
          process.env.REACT_APP_ONLINE + "/admin/nurse-dashboard",
          {
            withCredentials: true,
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const { data } = res.data;


        setNurseData(data.NurseData);
      } catch (error) {
        ErrorHandler(error);
      }
    }
    getData();
    // eslint-disable-next-line
  }, [updateSettings]);


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
            <Settings nurseData={nurseData} setUpdate={setUpdateSettings} 
           />
          )}
        </div>
      </AdminContext.Provider>
    </>
  );
}
