import { Button, Tooltip } from "@mantine/core";
import { DatePicker } from "@mantine/dates";
import { useMediaQuery } from "@mantine/hooks";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { AppointmentDetailsContext } from "../../../../../../App";
import { conflictContext } from "../../StepsHandler";
const moment = require("moment");

export default function SelectAvail(props) {
  const isMobile = useMediaQuery("(max-width: 509px)");
  const [selectedDate, setSelectedDate] = useState("");
  const [activeSchedule, setActiveSchedule] = useState([]);
  const { appointmentDetails, setAppointmentDetails } = useContext(
    AppointmentDetailsContext
  );
  const [DisplayDateAndTime, setDisplayDateAndTime] = useState({
    date: "",
    day: "",
    start: "",
    end: "",
    recom_time: "",
    queue: "",
  });
  const { schedule } = props;
  const { conflicts, setConflicts } = useContext(conflictContext);

  useEffect(() => {
    const getVacantSlots = async () => {
      const result = await axios.get(
        process.env.REACT_APP_ONLINE + "/booking/getVacantSlots",
        {
          params: {
            doctor_ID: appointmentDetails.doctor_ID,
          },
        }
      );
      const { data } = result.data;
      setSelectedDate(appointmentDetails.schedule_date);
      setActiveSchedule(
        schedule.map((index) => {
          if (appointmentDetails.doctor_ID === index.doctor_ID) {
            let queue = index.queue;
            if (
              data.length !== 0 &&
              data[0].doctor_schedule_ID === index.schedule_ID
            ) {
              queue = data[0].queque_vacancy_number;
            }
            console.log(data);
            let time = moment(index.start, "hh:mmA");
            let interval = moment.duration(index.time_interval);
            for (let i = 1; i < queue; i++) {
              time.add(interval.hours(), "hours");
              time.add(interval.minutes(), "minutes");
            }
            return {
              date: moment(index.date, "MMMM D, YYYY").format("YYYY-MM-DD"),
              start: index.start,
              recom_time: time.format("h:mm A"),
              day: index.day,
              end: index.end,
              queue: queue,
              interval: index.time_interval,
            };
          }
          return null;
        })
      );
    };
    getVacantSlots();
  }, []);

  useEffect(() => {
    async function checkConflict() {
      if (appointmentDetails.patient_ID) {
        const res = await axios.get(
          process.env.REACT_APP_ONLINE + "/booking/booking-conflict",
          {
            params: {
              date: appointmentDetails.schedule_date,
              patient_ID: appointmentDetails.patient_ID,
            },
          }
        );
        const { data } = res.data;
        if (data.length > 0) {
          setConflicts(true);
        } else {
          setConflicts(false);
        }
      }
    }
    checkConflict();
    setDisplayDateAndTime(
      activeSchedule.find((index) => {
        if (index != null && index.date === selectedDate) {
          setAppointmentDetails((prev) => ({
            ...prev,
            schedule_date: selectedDate,
            recom_Time: index.recom_time,
            end_Time: index.end,
          }));
          return {
            start: index.recom_time,
            end: index.end,
            queue: index.queue,
            day: index.day,
            date: index.date,
          };
        }
        return null;
      })
    );
  }, [selectedDate]);

  const DateFoDisplay = (date) => {
    return moment(date).format("MMMM D, YYYY");
  };

  const getDayProps = (date) => {
    const formattedDate = moment(date).format("YYYY-MM-DD");
    if (selectedDate === formattedDate) {
      return {
        style: {
          backgroundColor: "rgba(34, 208, 52, 1)",
          color: "black",
        },
      };
    } else if (
      activeSchedule.some(
        (item) => item !== null && item.date === formattedDate
      )
    ) {
      return {
        style: {
          backgroundColor: "rgba(34, 208, 52, 0.5)",
          color: "black",
        },
      };
    }
    return {
      disabled: true,
    };
  };

  const handleDateSelect = async (date) => {
    const formattedDate = moment(date).format("YYYY-MM-DD");
    const formattedDateforDB = moment(date).format("MMM D, YYYY");
    const selectedDoctor_ID = schedule.filter((item) => {
      if (formattedDateforDB === item.date) {
        return item;
      }
      return null;
    });

    setAppointmentDetails((prev) => ({
      ...prev,
      schedule_ID: selectedDoctor_ID[0].schedule_ID,
      schedule_date: formattedDate,
      recom_Time: DisplayDateAndTime ? DisplayDateAndTime.recom_time : "",
      end_Time: DisplayDateAndTime ? DisplayDateAndTime.end : "",
    }));
    setSelectedDate(formattedDate);
  };
  // let timeStart = moment(startTimePH, "HH:mm");
  // for (let i = 2; i <= queueNumber; i++) {
  //   timeStart = timeStart.add(timeInterval, "minutes");
  // }

  // console.log(props.scheduleStepTwo);
  // useEffect(() => {
  //   const appointmentDate = new Date(appointmentDetails.schedule_date);
  //   setSelectedDate(appointmentDate);
  //   getSchedID();
  // }, []);

  // function getSchedID() {
  //   getDoctorSched().map((schedule) => {
  //     setAppointmentDetails((prev) => ({
  //       ...prev,
  //       schedule_ID: schedule.schedule_ID,
  //       recom_Time: moment(schedule.recomTime[0], "h:mm A").format("HH:mm"),
  //     }));
  //   });
  // }

  // function getDayProps(date) {
  //   // Disable dates in the past and today
  //   const currentDate = new Date();
  //   currentDate.setHours(0, 0, 0, 0); // set time to midnight
  //   if (date < currentDate) {
  //     return { disabled: true };
  //   }

  //   const isScheduled = props.schedule.some(
  //     (sched) =>
  //       date.toDateString() === new Date(sched.date).toDateString() &&
  //       sched.doctor_ID === appointmentDetails.doctor_ID
  //   );

  //   if (date.toDateString() === selectedDate?.toDateString()) {
  //     return {
  //       style: {
  //         backgroundColor: "rgba(34, 208, 52, 1)",
  //         color: "black",
  //       },
  //     };
  //   } else if (isScheduled) {
  //     return {
  //       style: {
  //         backgroundColor: "rgba(34, 208, 52, 0.5)",
  //         color: "black",
  //       },
  //     };
  //   } else {
  //     return { disabled: true };
  //   }
  // }

  // const handleDateSelect = async (date) => {
  //   if (appointmentDetails.patient_ID) {
  //     const res = await axios.get("/booking/booking-conflict", {
  //       params: {
  //         date: appointmentDetails.schedule_date,
  //         patient_ID: appointmentDetails.patient_ID,
  //       },
  //     });

  //     if (res.data.data.length > 0) {
  //       setConflicts(true);
  //     } else {
  //       setConflicts(false);
  //     }
  //   }

  //   setSelectedDate(date);
  //   setAppointmentDetails((prev) => ({ ...prev, schedule_date: date }));
  //   getSchedID();
  // };

  // const getDoctorSched = () => {
  //   // Convert and Filter schedule
  //   const dateInPh = selectedDate
  //     ? new Date(
  //         selectedDate.getTime() -
  //           selectedDate.getTimezoneOffset() * 60000 +
  //           8 * 60 * 60000
  //       )
  //         .toISOString()
  //         .substring(0, 10)
  //     : null;
  //   const filteredSchedule = props.scheduleStepTwo
  //     ? props.scheduleStepTwo.filter((schedule) => schedule.date === dateInPh)
  //     : [];
  //   // Filter start and end time
  //   const getSched = filteredSchedule.filter(
  //     (schedule) =>
  //       schedule.start &&
  //       schedule.end &&
  //       schedule.queue &&
  //       schedule.time_interval &&
  //       schedule.schedule_ID
  //   );
  //   const moment = require("moment-timezone");

  //   const doctorSched = getSched.map((schedule) => {
  //     const startTime = moment(`${schedule.date}T${schedule.start}`);
  //     const endTime = moment(`${schedule.date}T${schedule.end}`);
  //     const queueNumber = `${schedule.queue}`;
  //     const timeInterval = `${schedule.time_interval}`;
  //     const schedule_ID = `${schedule.schedule_ID}`;

  //     const startTimePH = startTime.tz("Asia/Manila").format("h:mm A");
  //     const endTimePH = endTime.tz("Asia/Manila").format("h:mm A");

  //     const recomTime = [];
  //     let timeStart = moment(startTimePH, "HH:mm");
  //     for (let i = 2; i <= queueNumber; i++) {
  //       timeStart = timeStart.add(timeInterval, "minutes");
  //     }
  //     recomTime.push({
  //       start: timeStart.format("h:mm A"),
  //     });
  //     return {
  //       timeSlot: `${startTimePH} - ${endTimePH}`,
  //       queueNumber: queueNumber,
  //       timeInterval: timeInterval,
  //       recomTime: recomTime.map((time) => time.start.toString()),
  //       schedule_ID: schedule_ID,
  //     };
  //   });

  //   return doctorSched;
  // };

  return (
    <div>
      <div className="bookingtagtitle">
        Select Schedule
        <Tooltip
          label="Select Schedule to proceed"
          position="bottom"
          className="ms-2 "
        >
          <Button compact variant="outline" size="xs" radius="xl" color="gray">
            ?{" "}
          </Button>
        </Tooltip>
      </div>
      <div className="stepTwoBorder">
        <Row>
          <div className="container mt-3 Availnote">
            <div className="row mt-3 text-center">
              <p className="leveloneNote">
                The schedule are still based on availability.
              </p>
            </div>
            <div className="row text-center">
              <p className="leveltwoNote">
                Please wait for a SMS or Email confirmation of your appointment
                up to <span className="specialNote">(1) business day.</span>
              </p>
            </div>
          </div>
        </Row>
        <Row className="mb-3">
          <Col md={6}>
            <Container fluid>
              <Row className="legendRowleft mt-3">
                <label className="headerlegend ">Time</label>
                <label className="subheaderlegend ">
                  Doctor's Available Time
                </label>

                <table className="table table-striped table-hover text-center mt-4 ">
                  <thead>
                    <tr>
                      <td>Date</td>
                      <td>Day</td>
                      <td>Time</td>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        {DisplayDateAndTime
                          ? DateFoDisplay(DisplayDateAndTime.date)
                          : "---"}
                      </td>
                      <td>
                        {" "}
                        {DisplayDateAndTime ? DisplayDateAndTime.day : "---"}
                      </td>
                      <td>
                        {DisplayDateAndTime ? DisplayDateAndTime.start : "---"}{" "}
                        - {DisplayDateAndTime ? DisplayDateAndTime.end : "---"}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </Row>

              <Row className="queuContainer ">
                <span>
                  Hi!
                  <span>
                    {" "}
                    You are number{" "}
                    <label className="queueNumber">
                      {DisplayDateAndTime ? DisplayDateAndTime.queue : "---"}
                    </label>{" "}
                    in queue
                  </span>
                  <span>
                    <br />
                    <br />
                    You should be in the hospital on
                    <span className="recomGo">
                      {" "}
                      {DisplayDateAndTime
                        ? DateFoDisplay(DisplayDateAndTime.date)
                        : "---"}{" "}
                      {DisplayDateAndTime ? DisplayDateAndTime.day : "---"}{" "}
                      {DisplayDateAndTime
                        ? DisplayDateAndTime.recom_time
                        : "---"}
                      {/* <label>{DisplayDateAndTime.queue}</label> */}
                    </span>
                  </span>
                </span>
              </Row>
            </Container>
            <p className="conflict">
              {" "}
              {conflicts
                ? "You have an existing schedule with the same date!"
                : ""}
            </p>
          </Col>

          <Col md={6}>
            <Row className="legendRowright mt-3">
              <label className="headerlegend ">Date</label>
              <label className="subheaderlegend ">
                Choose your preferred date
              </label>
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
            <Row className="datepickerRow center">
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
      </div>
    </div>
  );
}
