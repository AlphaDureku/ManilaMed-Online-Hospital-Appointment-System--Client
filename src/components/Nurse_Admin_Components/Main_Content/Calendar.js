import { DatePicker } from "@mantine/dates";
import { useMediaQuery } from "@mantine/hooks";
import axios from "axios";
import moment from "moment";
import { useContext, useEffect, useState } from "react";
import SelectedDoctor from "../Sub_Components/LeftContent/AdminSelectDoctor";
import Card from "../Sub_Components/LeftContent/AppointmentCard";
import SearchRowAndSelectDoctor from "../Sub_Components/LeftContent/searchRowAndSelectDoctor";
import { AdminContext } from "./Content";

export default function Calendar() {
  axios.defaults.withCredentials = true;
  const breakPointMobile = useMediaQuery("(max-width: 1200px)");
  const [thatDaysPatient, setThatDaysPatient] = useState([]);
  const [selectedDate, setSelectedDate] = useState(
    moment().format("MM-DD-YYYY")
  );
  const {
    selectedDoctor,
    setSelectedDoctor,
    doctorList,
    calendarData,
    setCalendarData,
  } = useContext(AdminContext);
  const token = localStorage.getItem("nurseToken");

  const onDoctorChangeHandler = async (event) => {
    const { value } = event.target;
    const res = await axios.get(
      process.env.REACT_APP_ONLINE + "/admin/change-doctor",
      {
        withCredentials: true,
        params: {
          doctor_ID: value,
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const { data } = res.data;
    setCalendarData(data.calendarData);
    setSelectedDoctor(value);
    setSelectedDate("");
    setThatDaysPatient([]);
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
    const formattedDate = moment(date).format("MM-DD-YYYY");
    setSelectedDate(moment(date).format("YYYY-MM-DD"));
    const appointmentThatDay = async () => {
      const { data } = await axios.get(
        process.env.REACT_APP_ONLINE + "/admin/appointments-ThatDay",
        {
          params: {
            date: formattedDate,
          },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setThatDaysPatient(data.data);
    };
    appointmentThatDay();
  };

  const renderCard = thatDaysPatient.map((item, index) => {
    return <Card data={item} key={index} selectedStatus={"Confirmed"} />;
  });

  const renderSelectOptions = doctorList
    ? doctorList.map((item, index) => {
        return <SelectedDoctor data={item} key={index} />;
      })
    : [];

  return (
    <>
      <div className="Admin--Calendar_Container">
        <div className="Calendar_Container--left">
          <div>
            <SearchRowAndSelectDoctor
              selectedDoctor={selectedDoctor}
              onDoctorChangeHandler={onDoctorChangeHandler}
              renderSelectOptions={renderSelectOptions}
            />
          </div>
          <div className="Schedule_Calendar_Container">
            <div>
              <h3>Schedule Calendar</h3>
            </div>
            <div>Choose a date to view appointments</div>
            <div>
              <div style={{ color: "#2f9d44", fontWeight: "600" }}>
                <img
                  src="/images/lightgreenLegend.png"
                  alt=""
                  className="legend"
                ></img>
                With Appointments
              </div>
              <div style={{ color: "#434343", fontWeight: "600" }}>
                {" "}
                <img src="/images/whitec.png" alt="" className="legend"></img>No
                appointments
              </div>
            </div>
            <div>
              {" "}
              <DatePicker
                getDayProps={getDayProps}
                onChange={handleDateSelect}
                value={selectedDate}
                size={breakPointMobile ? "xs" : "lg"}
              ></DatePicker>
            </div>
          </div>
          <div></div>
        </div>
        <div className="Calendar_Container--right">
          <div>{renderCard}</div>
          <div></div>
          <div></div>
        </div>
      </div>
    </>
  );
}
