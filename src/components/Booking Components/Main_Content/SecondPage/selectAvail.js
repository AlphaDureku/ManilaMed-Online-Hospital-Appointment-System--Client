import { Button, Tooltip } from "@mantine/core";
import { DatePicker } from "@mantine/dates";
import { useMediaQuery } from "@mantine/hooks";
import { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";

export default function SelectAvail(props) {
  const isMobile = useMediaQuery("(max-width: 509px)");
  const [selectedDate, setSelectedDate] = useState();
 




  useEffect(() => {
    setAppointmentDate();
  }, []);

 
  function setAppointmentDate() {
    const appointmentDate = new Date(props.appointmentDetails.schedule_date);
    setSelectedDate(appointmentDate);
  }

  function getDayProps(date) {
   // Disable dates in the past and today
    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0); // set time to midnight
    if (date < currentDate) {
      return { disabled: true };
    }
  
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



  const details = () => {
    console.table(props.appointmentDetails);
    console.log(props.scheduleStepTwo);
    
    
  };
  function getDoctorSched() {
    // Convert and Filter schedule
      const dateInPh = selectedDate ? new Date(selectedDate.getTime() - (selectedDate.getTimezoneOffset() * 60000) + (8 * 60 * 60000)).toISOString().substring(0, 10) : null;
      const filteredSchedule = props.scheduleStepTwo
        ? props.scheduleStepTwo.filter((schedule) => schedule.date === dateInPh)
        : [];
    
      // Filter start and end time
      const getSched = filteredSchedule.filter((schedule) => schedule.start && schedule.end && schedule.queue && schedule.time_interval);
    
      const moment = require('moment-timezone');
    
      const doctorSched = getSched.map((schedule) => {
      const startTime = moment(`${schedule.date}T${schedule.start}`);
      const endTime = moment(`${schedule.date}T${schedule.end}`);
      const queueNumber = `${schedule.queue}`;
      const timeInterval = `${schedule.time_interval}`;
  
      const startTimePH = startTime.tz('Asia/Manila').format('h:mm A');
      const endTimePH = endTime.tz('Asia/Manila').format('h:mm A');
  
      const recomTime = [];
        let timeStart = moment(startTimePH, 'HH:mm');
        for (let i = 2; i <= queueNumber; i++) {
          timeStart = timeStart.add(timeInterval, 'minutes');
        }
        recomTime.push({
          start: timeStart.format('h:mm A')
        });
      
      
      return {
        timeSlot: `${startTimePH} - ${endTimePH}`,
        queueNumber: queueNumber,
        timeInterval: timeInterval,
        recomTime: recomTime.map((time) => time.start.toString()), 
      };
    });
  
    return doctorSched;
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
      <div className="stepTwoBorder">
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
              <td>{getDoctorSched().map(schedule => schedule.timeSlot).join(", ")}</td>
            </tr>
          </tbody>
        </table>
        
        
          </Row>
            

          <Row className="queuContainer">
            <span>Hi!</span>
            <span>
              You are number <label>
              {getDoctorSched().map(schedule => schedule.queueNumber).join(", ")}
              </label> in Queue
            </span>
            <span>
              You should be in the hospital at <label>
              {getDoctorSched().map(schedule => schedule.recomTime)}
              </label>
            </span>
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
     
      <Button onClick={details}>Console</Button>
  
      </div>
        
    </div>
    
  );
}
