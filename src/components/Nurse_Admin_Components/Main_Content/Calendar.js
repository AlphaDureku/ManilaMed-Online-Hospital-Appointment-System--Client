import { notifications } from "@mantine/notifications";
import { IconCheck, IconX } from "@tabler/icons-react";
import axios from "axios";
import moment from "moment";
import { useContext, useEffect, useState } from "react";
import { ErrorHandler } from "../../../utils/errorHandler";
import ConfirmModal from "../../Reusable_Components/ConfirmationModal";
import CancelAllRow from "../Sub_Components/CalendarPage/CancelAllRow";
import CardContainer from "../Sub_Components/CalendarPage/CardContainer";
import NotifyDoctor from "../Sub_Components/CalendarPage/NotifyDoctor";
import NotifyPatients from "../Sub_Components/CalendarPage/NotifyPatients";
import ScheduleCalendar from "../Sub_Components/CalendarPage/ScheduleCalendar";
import SelectedDoctor from "../Sub_Components/LeftContent/AdminSelectDoctor";
import Card from "../Sub_Components/LeftContent/AppointmentCard";
import SearchRowAndSelectDoctor from "../Sub_Components/LeftContent/searchRowAndSelectDoctor";
import { AdminContext } from "./Content";

export default function Calendar() {
  axios.defaults.withCredentials = true;
  const token = localStorage.getItem("nurseToken");
  const [thatDaysPatient, setThatDaysPatient] = useState([]);
  const [show, setShow] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [modalQuestion, setModalQuestion] = useState("");
  const [action, setAction] = useState("");
  const [selectedDate, setSelectedDate] = useState();
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [update, setUpdate] = useState(false);
  const {
    selectedDoctor,
    setSelectedDoctor,
    doctorList,
    calendarData,
    setCalendarData,
    setShowExpire,
  } = useContext(AdminContext);
  console.log(calendarData);
  const onDoctorChangeHandler = async (event) => {
    const { value } = event.target;
    try {
      setLoading(true);
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
      setLoading(false);
    } catch (error) {
      ErrorHandler(error);
    }
  };

  const handleClose = () => {
    setShow(false);
  };
  const getDayProps = (date) => {
    const formattedDate = moment(date).format("YYYY-MM-DD");
    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0); // set time to midnight
    if (date < currentDate) {
      return { disabled: true };
    }
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

  const appointmentThatDay = async (date) => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        process.env.REACT_APP_ONLINE + "/admin/appointments-ThatDay",
        {
          params: {
            date: date,
          },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setThatDaysPatient(data.data);
      setLoading(false);
    } catch (error) {
      ErrorHandler(error, setShowExpire);
    }
  };

  useEffect(() => {
    if (selectedDate) {
      appointmentThatDay(
        moment(selectedDate, "YYYY-MM-DD").format("MM-DD-YYYY")
      );
    }
  }, [update]);

  const handleDateSelect = async (date) => {
    const formattedDate = moment(date).format("MM-DD-YYYY");
    setSelectedDate(moment(date).format("YYYY-MM-DD"));

    appointmentThatDay(formattedDate);
  };

  const renderCard = thatDaysPatient.map((item, index) => {
    if (
      !searchQuery ||
      (item.Fname &&
        item.Fname.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (item.Lname &&
        item.Lname.toLowerCase().includes(searchQuery.toLowerCase()))
    ) {
      return (
        <Card
          data={item}
          key={index}
          selectedStatus={"Confirmed"}
          setUpdate={setUpdate}
        />
      );
    }
    return null;
  });

  const renderSelectOptions = doctorList
    ? doctorList.map((item, index) => {
        return <SelectedDoctor data={item} key={index} />;
      })
    : [];

  const Notification = (message, status) => {
    notifications.show({
      title: status ? "Success!" : "Notification Failed!",
      icon: status ? <IconCheck size="3rem" /> : <IconX size="3rem" />,
      message: message,
      color: status ? "teal" : "red",
      autoClose: 4000,
    });
  };

  const selectedDateChecker = async (action) => {
    if (!selectedDate) {
      return Notification(
        "Please select a valid date from the calendar: ",
        false
      );
    } else if (thatDaysPatient.length === 0) {
      return Notification(
        "No Patient Appointments on Date: " +
          moment(selectedDate).format("MMM DD, YYYY"),
        false
      );
    }
    setShow(true);
    notificationSenderFilter(action);
  };

  const notificationSenderFilter = async (params) => {
    switch (params) {
      case "Arrived":
        setModalTitle("Notify Patients");
        setModalQuestion(
          "Are you sure you want to notify patients that the doctor has arrived?"
        );
        break;
      case "Late":
        setModalTitle("Notify Patients");
        setModalQuestion(
          "Are you sure you want to notify patients that the doctor is going to be late?"
        );
        break;
      case "CancelAll":
        setModalTitle("Cancel All Appointment");
        setModalQuestion(
          "Are you sure you want to cancel all appointments for date: " +
            moment(selectedDate).format("MMM DD, YYYY") +
            "?"
        );
        break;
      case "NotifyDoctor":
        setModalTitle("Notify Doctor");
        setModalQuestion(
          "Are you sure you want to notify the doctor for todays appointment?"
        );
        break;
      default:
        break;
    }
    setAction(params);
  };

  const handleSubmit = async () => {
    setShow(false);
    switch (action) {
      case "Arrived":
        try {
          await axios.post(
            process.env.REACT_APP_ONLINE + "/admin/notify-patientForToday",
            {
              date: moment(selectedDate).format("MM-DD-YYYY"),
              notificationType: "Arrived",
            },
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          Notification("Successfully Notified Patients", true);
        } catch (error) {
          ErrorHandler(error, setShowExpire);
        }

        break;
      case "Late":
        try {
          await axios.post(
            process.env.REACT_APP_ONLINE + "/admin/notify-patientForToday",
            {
              date: moment(selectedDate).format("MM-DD-YYYY"),
              notificationType: "Late",
            },
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          console.log("Notified Late");
          Notification("Successfully Notified Patients", true);
        } catch (error) {
          ErrorHandler(error, setShowExpire);
        }
        break;
      case "CancelAll":
        try {
          await axios.post(
            process.env.REACT_APP_ONLINE + "/admin/notify-patientForToday",
            {
              date: moment(selectedDate).format("MM-DD-YYYY"),
              notificationType: "CancelAll",
            },
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          setThatDaysPatient([]);
          Notification("Successfully Cancelled All Patient Appointments", true);
        } catch (error) {
          ErrorHandler(error, setShowExpire);
        }
        break;
      case "NotifyDoctor":
        try {
          await axios.post(
            process.env.REACT_APP_ONLINE + "/admin/notify-doctorForToday",
            {
              date: moment(selectedDate).format("MM-DD-YYYY"),
            },
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          Notification("Successfully Notified Doctor", true);
        } catch (error) {
          ErrorHandler(error, setShowExpire);
        }
        break;
      default:
        break;
    }
  };
  return (
    <>
      <div className="Admin--Calendar_Container">
        <div className="Calendar_Container--left">
          <div>
            <SearchRowAndSelectDoctor
              selectedDoctor={selectedDoctor}
              onDoctorChangeHandler={onDoctorChangeHandler}
              renderSelectOptions={renderSelectOptions}
              setSearchQuery={setSearchQuery}
              searchQuery={searchQuery}
            />
          </div>
          <ScheduleCalendar
            getDayProps={getDayProps}
            handleDateSelect={handleDateSelect}
            selectedDate={selectedDate}
          />
          <NotifyDoctor selectedDateChecker={selectedDateChecker} />
        </div>
        <div className="Calendar_Container--right">
          <div>
            <CardContainer
              thatDaysPatient={thatDaysPatient}
              renderCard={renderCard}
              loading={loading}
            />
          </div>
          <NotifyPatients selectedDateChecker={selectedDateChecker} />
          <CancelAllRow selectedDateChecker={selectedDateChecker} />
        </div>
      </div>
      <ConfirmModal
        show={show}
        handleClose={handleClose}
        title={modalTitle}
        handleSubmit={handleSubmit}
        question={modalQuestion}
      />
    </>
  );
}
