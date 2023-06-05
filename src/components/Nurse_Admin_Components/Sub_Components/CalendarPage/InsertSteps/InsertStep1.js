import { filterProps } from "@mantine/core";
import { DatePicker } from "@mantine/dates";
import { useMediaQuery } from "@mantine/hooks";
import axios from "axios";
import moment from "moment";
import { useContext, useEffect, useState } from "react";
import { Row } from "react-bootstrap";
import { ErrorHandler } from "../../../../../utils/errorHandler";
import { InsertAppointmentContext } from "../InsertAppointmentModal";
export default function InsertStep1() {
  const breakPointMobile = useMediaQuery("(max-width: 1000px)");
  const [selectedDate, setSelectedDate] = useState("");
  const [calendarData, setCalendarData] = useState([]);
  const [selecteDetails, setSelectedDetails] = useState({});
  const { setInsertAppointmentDetails } = useContext(InsertAppointmentContext);
  axios.defaults.withCredentials = true;
  const token = localStorage.getItem("nurseToken");

  useEffect(() => {
    const getScheduleInfo = async () => {
      try {
        const { data } = await axios.get(
          process.env.REACT_APP_ONLINE +
            "/admin/doctorScheduleForInsertAppointment",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setCalendarData(data.data);
        setInsertAppointmentDetails((prev) => ({
          ...prev,
          doctor_Name:
            data.data[0].doctorFname + " " + data.data[0].doctorLname,
          doctor_Specialization: data.data[0].specialization,
          doctor_ID: data.data[0].doctor_ID,
        }));
      } catch (error) {
        // ErrorHandler(error);
        console.log(error);
      }
    };
    getScheduleInfo();
  }, [token]);

  console.log(calendarData);
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
      calendarData.some((item) => item !== null && item.date2 === formattedDate)
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
    setSelectedDate(formattedDate);
    const filteredDetails = calendarData.filter((item) => {
      if (item.date2 === formattedDate) {
        return item;
      }
      return null;
    });
    console.log(filteredDetails);
    let time = moment(filteredDetails[0].start, "hh:mmA");
    let interval = moment.duration(filteredDetails[0].time_interval);
    for (let i = 1; i < filteredDetails[0].queue; i++) {
      time.add(interval.hours(), "hours");
      time.add(interval.minutes(), "minutes");
    }
    setSelectedDetails({
      date: filteredDetails[0].date2,
      start: filteredDetails[0].start,
      recom_time: time.format("h:mm A"),
      day: filteredDetails[0].day,
      end: filteredDetails[0].end,
      queue: filteredDetails[0].queue,
      interval: filteredDetails[0].time_interval,
    });
    setInsertAppointmentDetails((prev) => ({
      ...prev,
      schedule_ID: filteredDetails[0].schedule_ID,
      schedule_Date: filteredDetails[0].date2,
      recom_Time: time.format("h:mm A"),
      endTime: filteredDetails[0].end,
    }));
  };

  return (
    <>
      <div className="insertAppointment-Content">
        <div className="mt-2">
          <DatePicker
            getDayProps={getDayProps}
            onChange={handleDateSelect}
            value={selectedDate}
            size={breakPointMobile ? "xs" : "lg"}
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          ></DatePicker>
        </div>
        <div>
          <Row className="legendRowleftInsert mt-3">
            <label className="headerlegendInsert ">Time</label>
            <label className="subheaderlegendInsert ">
              Doctor's Available Time
            </label>

            <table className="table table-striped table-hover text-center mt-4 tableinsertapp">
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
                    {selecteDetails.date
                      ? moment(selecteDetails.date).format("MMMM D, YYYY")
                      : "---"}
                  </td>
                  <td>{selecteDetails.day ? selecteDetails.day : "---"}</td>
                  <td>
                    {/* Time */}
                    {selecteDetails.start
                      ? selecteDetails.start + " - " + selecteDetails.end
                      : "--- - ---"}
                  </td>
                </tr>
              </tbody>
            </table>
          </Row>
          <Row className="queuContainerInsert ">
            {selectedDate ? (
              <span>
                <span>
                  {" "}
                  Patient is number{" "}
                  <label className="queueNumber">
                    {selecteDetails.queue}
                  </label>{" "}
                  in queue
                </span>
                <span>
                  <br />
                  <br />
                  Patient should be in the hospital on{" "}
                  <span className="recomGo">
                    {/* Sample */}
                    {moment(selecteDetails.date).format("MMMM D, YYYY")}{" "}
                    {selecteDetails.day} {selecteDetails.recom_time}
                  </span>
                </span>
              </span>
            ) : (
              <span style={{ textAlign: "center" }}>
                Please Select a date from the calendar
              </span>
            )}
          </Row>
        </div>
      </div>
    </>
  );
}
