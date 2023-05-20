import axios from "axios";
import React, { createContext, useEffect, useState } from "react";
import Navbar from "../NavBar/NavBar";
import Content from "../Sub_Components/Content";
import AddDoctorModal from "../Sub_Components/addDocModal";
import HeadAdminNavbar from "../Sub_Components/headAdminNav";

export const DashboardContext = createContext();

export default function Dashboard(props) {
  const [dashboardData, setDashboardData] = useState(null);
  const [parentState, setParentState] = useState();

  useEffect(() => {
    fetchData();
  }, [parentState]);

  const fetchData = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await axios.get(
        process.env.REACT_APP_ONLINE + "/head-admin/dashboard",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setDashboardData(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Navbar />

      <div style={{ display: "grid", gridTemplateColumns: "auto 1fr" }}>
        <DashboardContext.Provider value={{ dashboardData }}>
          <HeadAdminNavbar />
          <Content />
          <AddDoctorModal setParentState={setParentState} />
        </DashboardContext.Provider>
      </div>
    </>
  );
}
