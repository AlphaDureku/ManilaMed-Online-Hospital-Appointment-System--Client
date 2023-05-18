import Content from "../Sub_Components/Content";
import HeadAdminNavbar from "../Sub_Components/headAdminNav";
import Navbar from "../NavBar/NavBar";
import AddDoctorModal from "../Sub_Components/addDocModal";
import React, { useEffect, useState,  createContext } from 'react';
import axios from 'axios';

export const DashboardContext = createContext();

export default function Dashboard() {

  const [dashboardData, setDashboardData] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);
    
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');

        const response = await axios.get('/head-admin/dashboard', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setDashboardData(response.data);
        
      } catch (error) {
        console.error(error);
      }
    };



 const handleAddDoctor = () => {
    fetchData();
  };


  return (
    <>   


      <Navbar/>  
      
     <div style={{ display: 'grid', gridTemplateColumns: 'auto 1fr' }}>
     <DashboardContext.Provider value={{dashboardData}}>
      <HeadAdminNavbar />
      <Content/>
      <AddDoctorModal
      handleAddDoctor={handleAddDoctor}
      />
  
      </DashboardContext.Provider >
    </div>
    </>
  );
}
