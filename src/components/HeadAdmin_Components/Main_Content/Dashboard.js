import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { HeadAdminPageContext } from "../../../pages/HeadAdmin";
import { ErrorHandler } from "../../../utils/errorHandler";
import SessionExpiredModal from "../../Reusable_Components/sessionExpriredModal";
import Navbar from "../NavBar/NavBar";
import Content from "../Sub_Components/Content";
import HeadAdminNavbar from "../Sub_Components/headAdminNav";
import HeadSettings from "./HeadSettings";

export const DashboardContext = createContext();
export const ShowExpireContext = createContext();
export default function Dashboard() {
  const [dashboardData, setDashboardData] = useState(null);
  const [update, setUpdate] = useState(false);
  const { currentPage } = useContext(HeadAdminPageContext);
  const [loading, setLoading] = useState(false);
  const [showExpire, setShowExpire] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    fetchData();
  }, [update]);

  const fetchData = async () => {
    setLoading(true);

    try {
      const token = localStorage.getItem("headToken");

      const response = await axios.get(
        process.env.REACT_APP_ONLINE + "/head-admin/dashboard",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setLoading(false);
      setDashboardData(response.data);
    } catch (error) {
      console.error(error);
      ErrorHandler(error, setShowExpire);
    }
  };
  const HandleSubmitError401 = () => {
    localStorage.removeItem("headToken");
    navigate("/head");
  };
  return (
    <>
      <Navbar />
      <div className="adminMainContainer1">
        <DashboardContext.Provider value={{ dashboardData }}>
          <HeadAdminNavbar />
          <ShowExpireContext.Provider value={setShowExpire}>
            {currentPage === 1 ? (
              <Content setUpdate={setUpdate} loading={loading} />
            ) : (
              <HeadSettings setUpdate={setUpdate} />
            )}
          </ShowExpireContext.Provider>
        </DashboardContext.Provider>
      </div>
      <SessionExpiredModal
        show={showExpire}
        handleSubmit={HandleSubmitError401}
      />
    </>
  );
}
