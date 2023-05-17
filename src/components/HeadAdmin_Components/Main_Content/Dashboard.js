import Content from "../Sub_Components/Content";
import HeadAdminNavbar from "../Sub_Components/headAdminNav";
import Navbar from "../NavBar/NavBar";
import AddDoctorModal from "../Sub_Components/addDocModal";
import AddSecModal from "../Sub_Components/AddSecModal";
import React, { useEffect, useState,  createContext } from 'react';
import axios from 'axios';

export const DashboardContext = createContext();

export default function Dashboard() {

  const [dashboardData, setDashboardData] = useState(null);

  useEffect(() => {
    
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        console.log(`token: ${token}`);

        const response = await axios.get('/head-admin/dashboard', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setDashboardData(response.data);
        console.log(response.data);
        
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);



  return (
    <>   


      <Navbar/>  
      
     <div style={{ display: 'grid', gridTemplateColumns: 'auto 1fr' }}>
     <DashboardContext.Provider value={{dashboardData, setDashboardData}}>
      <HeadAdminNavbar />
      <Content />
      <AddDoctorModal />
      <AddSecModal/>
      </DashboardContext.Provider >
    </div>
    </>
  );
}
