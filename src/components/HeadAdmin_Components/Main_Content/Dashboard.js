import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { HeadAdminPageContext } from "../../../pages/HeadAdmin";
import Navbar from "../NavBar/NavBar";
import Content from "../Sub_Components/Content";
import HeadAdminNavbar from "../Sub_Components/headAdminNav";
import HeadSettings from "./HeadSettings";

export const DashboardContext = createContext();

export default function Dashboard() {
  const [dashboardData, setDashboardData] = useState(null);
  const [update, setUpdate] = useState(false);
  const { currentPage } = useContext(HeadAdminPageContext);
  const [loading, setLoading] = useState(false);

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
    }
  };

console.log(dashboardData);

  return (
    <>
      <Navbar />
      <div className="adminMainContainer1">
        <DashboardContext.Provider value={{ dashboardData }}>
          <HeadAdminNavbar />
          {currentPage === 1 ? (
            <Content setUpdate={setUpdate} loading={loading} />
          ) : (
            <HeadSettings  setUpdate={setUpdate} />
          )}
        </DashboardContext.Provider>
      </div>
    </>
  );
}
