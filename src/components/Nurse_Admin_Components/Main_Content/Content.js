import { useMediaQuery } from "@mantine/hooks";
import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { ErrorHandler } from "../../../utils/errorHandler";

import { useNavigate } from "react-router-dom";
import { AdminPageContext } from "../../../pages/Admin";
import SessionExpiredModal from "../../Reusable_Components/sessionExpriredModal";
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
  const [showExpire, setShowExpire] = useState(false);
  const navigate = useNavigate();
  const AdminValues = {
    selectedDoctor: selectedDoctor,
    setSelectedDoctor: setSelectedDoctor,
    doctorList: doctorList,
    setDoctorList: setDoctorList,
    calendarData: calendarData,
    setCalendarData: setCalendarData,
    setShowExpire,
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

  const HandleSubmitError401 = () => {
    localStorage.removeItem("nurseToken");
    navigate("/admin");
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
            <Settings nurseData={nurseData} setUpdate={setUpdateSettings} />
          )}
        </div>
        <SessionExpiredModal
          show={showExpire}
          handleSubmit={HandleSubmitError401}
        />
      </AdminContext.Provider>
    </>
  );
}
