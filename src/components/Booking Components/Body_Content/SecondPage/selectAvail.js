import { Button,Tooltip } from "@mantine/core";
import { DatePicker } from "@mantine/dates";
import { useMediaQuery } from "@mantine/hooks";
import { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import axios from "axios";

export default function SelectAvail(props) {
  const isMobile = useMediaQuery("(max-width: 509px)");
  const [selectedDate, setSelectedDate] = useState(null);

  useEffect(() => {
    setAppointmentDate();
  }, []);

  const details = () => {
    console.table(props.appointmentDetails);
  };

  function setAppointmentDate() {
    const appointmentDate = new Date(props.appointmentDetails.schedule_date);
    setSelectedDate(appointmentDate);
  }

  function getDayProps(date) {
    const isScheduled = props.schedule.some(
      (sched) =>
        date.toDateString() === new Date(sched.date).toDateString() &&
        sched.doctor_ID === props.appointmentDetails.doctor_ID
    );

    if (date.toDateString() === selectedDate?.toDateString()) {
      return {
        style: {
          backgroundColor: "rgba(34, 208, 52, 1)",
          color: "black",
        },
      };
    } else if (isScheduled) {
      return {
        style: {
          backgroundColor: "rgba(34, 208, 52, 0.5)",
          color: "black",
        },
      };
    } else {
      return { disabled: true };
    }
  }

  function handleDateSelect(date) {
    setSelectedDate(date);
    props.setAppointmentDetails((prev) => ({ ...prev, schedule_date: date }));
  }


  async function fetchDoctorCalendar(doctor_ID) {
      const response = await axios.get("/booking/doctor-calendar", {
        params: {
          doctor_ID: props.appointmentDetails.doctor_ID
        }
      });
      const data = response.data
      console.log(data.data[0].start);
      console.log(data.data[0].end);
   
   
    }

  
  
  
  

  return (
    <div>
      <div className="bookingtagtitle">Select Schedule
      <Tooltip label="Select Schedule to proceed" position="bottom" className="ms-2 ">
      <Button compact variant="outline"
        size="xs"
        radius="xl"
        color="gray"
      >
        ?  </Button>
      </Tooltip>
      </div>
    
      <Container className="stepTwoBorder">
      <Row>
      <div className="container mt-3 Availnote">
                    <div className="row mt-3 text-center">
                        <p className="leveloneNote">The schedule are still based on availability.</p>
                    </div>
                    <div className="row text-center">
                        <p className="leveltwoNote">Please wait for a SMS or Email confirmation of your appointment within one <span className="specialNote" >(1) business day.</span></p>
                    </div>
        </div>
      </Row>
      <Row>
        <Col>
          <Row className="legendRow mt-3">
          <label className="headerlegend ">Time</label>
          <label className="subheaderlegend ">Doctor's Available Time</label>
          <table className="table table-striped table-hover text-center mt-4">
          <thead>
            <tr>
              <td>Date</td>
              <td>Day</td>
              <td>Time</td>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{selectedDate ? selectedDate.toLocaleString('en-us', { month: 'short' }) + ' ' + selectedDate.getDate() + ', ' + selectedDate.getFullYear() : '-'}</td>
              <td>{selectedDate ? selectedDate.toLocaleString('en-us', { weekday: 'long' }) : '-'}</td>
              <td>Time</td>
            </tr>
          </tbody>
        </table>

          </Row>
          <Row className="queuContainer">

        </Row>
        </Col>
        
        <Col>
          
          <Row className="legendRow mt-3">
          <label className="headerlegend ">Date</label>
          <label className="subheaderlegend ">Choose your preferred date</label>
            <Col className=" mt-2 ">
              <img
                src={"/images/lightgreenLegend.png"}
                alt=""
                className="img-fluid "
              ></img>
              <label className="legendlabelC ms-2">Available</label>
              </Col>
                <Col className=" mt-2  ">
                <img
                src={"/images/greyLegend.png"}
                alt=""
                className="img-fluid "
                ></img>
                <label className=" legendlabelC ms-2">Not Available</label>
              </Col>
            </Row>      
          <Row>
          <DatePicker
          getDayProps={getDayProps}
          onChange={handleDateSelect}
          value={selectedDate}
          size={isMobile ? "md" : "lg"}
          style={{
            margin: "0 auto",
            marginTop: "15px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        ></DatePicker>
        </Row>
        </Col>
      </Row>
     
      <Button onClick={fetchDoctorCalendar}>Console</Button>
      </Container>
    </div>
    
  );
}
