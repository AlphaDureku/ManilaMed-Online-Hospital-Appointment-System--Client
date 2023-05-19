import Content from "../Sub_Components/Content";
import HeadAdminNavbar from "../Sub_Components/headAdminNav";
import Navbar from "../NavBar/NavBar";
import AddDoctorModal from "../Sub_Components/addDocModal";
import React, { useEffect, useState,  createContext } from 'react';
import axios from 'axios';

export const DashboardContext = createContext();

export default function Dashboard(props) {

  const [dashboardData, setDashboardData] = useState(null);
  const [parentState, setParentState] = useState();


  useEffect(() => {
    fetchData();
  }, [parentState]);
    
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



  return (
    <>   


      <Navbar/>  
      
     <div style={{ display: 'grid', gridTemplateColumns: 'auto 1fr' }}>
     <DashboardContext.Provider value={{dashboardData}}>
      <HeadAdminNavbar />
      <Content/>
      <AddDoctorModal
      setParentState={setParentState}
      />
  
      </DashboardContext.Provider >
    </div>
    </>
  );
}
