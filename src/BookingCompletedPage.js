import { useContext, useEffect, } from "react";
import { Container } from "react-bootstrap";
import { AppointmentDetailsContext } from "./App";
import axios from "axios";
import NavBar from "./components/Booking Components/NavBar/NavBar";
import Footer from "./components/Booking Components/Footer/Footer";
import { Button } from "@mantine/core";



export default function BookingCompletedPage () {


    const { appointmentDetails } = useContext(AppointmentDetailsContext);
    const { appointment_ID } = appointmentDetails;
  
  useEffect(() => {
    async function fetchDoctorCalendar() {
      const response = await axios.get("/get-appointment", {
        params: {
          
        },
      });
    
    }
  }, []);

 
  return (
    <>
    <div className="Booking--wrapper">

    {<NavBar/>}

    <Container className="mt-5">
    <div className="text-center bookingtagtitle">
        Appointment Request Successful! 
    </div>
    <div className="text-center leveltwoNote mt-3 mb-5"> 
    Please wait for a SMS or Email confirmation of your appointment up to (1) business day.
    </div>
  
    <section id="pending" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center',}}>
        <div className=" card mt-3 pb-2 " style={{border: '1px solid grey', boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)', borderRadius:'15px'}}>
          <div className="card-body container-fluid ps-5 pe-5 pt-4 pb-4">
            <div className="card-title" style={{fontSize: '25px', fontWeight: 800}}>Patient Name</div>
            <p className="card-subtitle ">Gender</p>
            <p className="card-subtitle">Age</p>
            <label htmlFor="card-text">Track via Email address:  </label>
            <span htmlFor="card-text" style={{fontWeight: 600}}> {" "}UserEmail </span>
            <div className="row pt-1">
              <div className="col pt-5">
                <p className="card-subtitle" style={{fontWeight: 600}}>Doctor Name</p>
                <p className="card-subtitle pt-2">Specialty</p>
              </div>
              <div className="col pt-5">
                <p className="card-subtitle" style={{fontWeight: 600}}>Appointment Date</p>
                <p className="card-subtitle pt-2" style={{color: '#388440', fontWeight: 'bold'}}>Dec 25, 2022 - 7:00 am</p>
              </div>
   
            </div>
          </div>
        </div>
      </section>

    <div className="text-center ">
    <Button 
     style={{
        width: 'max(5%, 100px)',
        backgroundColor: 'red',
        border: 'none',
        borderRadius: '20px',
        color: 'white',
        marginLeft: 'auto',
        marginTop: '5%',
        fontSize: 'min(1rem, 3.5vw)',
        boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)'

      }}

    >
        Home
    </Button>
    </div>
   
    </Container>


    {<Footer />}
    </div>
    </>
  );
};

