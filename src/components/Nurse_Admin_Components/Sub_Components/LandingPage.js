import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { ErrorHandler } from "../../../utils/errorHandler";
import { AdminContext } from "../Main_Content/Content";
import SelectedDoctor from "./LeftContent/AdminSelectDoctor";
import Card from "./LeftContent/AppointmentCard";
import AppointmentTable from "./LeftContent/AppointmentTable";
import SearchRowAndSelectDoctor from "./LeftContent/searchRowAndSelectDoctor";
import DashboardCalender from "./RightContent/Dashboard_Calendar";
import SeeData from "./RightContent/SeeData";

export default function LandingPage() {
  const [selectedStatus, setSelectedStatus] = useState("Pending");
  const [selectedDateRange, setSelectedDateRange] = useState("Week");
  const [DisplayedPatients, setDisplayedPatients] = useState([]);
  const [patientCounter, setPatientCounter] = useState({});
  const token = localStorage.getItem("nurseToken");
  const [update, setUpdate] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [graphData, setGraphData] = useState([]);
  axios.defaults.withCredentials = true;

  const {
    selectedDoctor,
    setSelectedDoctor,
    doctorList,
    setDoctorList,
    calendarData,
    setCalendarData,
    setShowExpire,
  } = useContext(AdminContext);
  useEffect(() => {
    async function getData() {
      try {
        const res = await axios.get(
          process.env.REACT_APP_ONLINE + "/admin/nurse-dashboard",
          {
            withCredentials: true,
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const { data } = res.data;
        setGraphData(data.graphData);
        setDisplayedPatients(data.AppointmentsData);
        setDoctorList(data.DoctorData);
        setCalendarData(data.calendarData);
        setSelectedDoctor(data.selectedDoctor);
      } catch (error) {
        ErrorHandler(error, setShowExpire);
      }
    }

    getData();
    // eslint-disable-next-line
  }, [update]);
  console.log(graphData);
  useEffect(() => {
    const newCounts = DisplayedPatients
      ? DisplayedPatients.reduce(
          (accumulator, currentValue) => {
            if (currentValue.Status === "Pending") {
              accumulator.pending++;
            } else if (currentValue.Status === "Confirmed") {
              accumulator.confirmed++;
            } else if (currentValue.Status === "Completed") {
              accumulator.completed++;
            } else {
              accumulator.cancelled++;
            }
            return accumulator;
          },
          { pending: 0, confirmed: 0, completed: 0, cancelled: 0 }
        )
      : { pending: 0, confirmed: 0, completed: 0, cancelled: 0 };

    setPatientCounter(newCounts);
  }, [DisplayedPatients]);

  const onChangeHandler = (event) => {
    const { value } = event.target;
    setSelectedStatus(value);
  };

  const onSelectHandler = async (event) => {
    const { value } = event.target;
    setSelectedDateRange(value);
    try {
      const res = await axios.get(
        process.env.REACT_APP_ONLINE + "/admin/change-dateRange",
        {
          withCredentials: true,
          params: {
            DateRange: value,
          },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const { data } = res.data;
      setDisplayedPatients(data.appointmentsData);
    } catch (error) {
      ErrorHandler(error, setShowExpire);
    }
  };

  const onDoctorChangeHandler = async (event) => {
    const { value } = event.target;
    setSelectedDoctor(value);
    try {
      const res = await axios.get(
        process.env.REACT_APP_ONLINE + "/admin/change-doctor",
        {
          withCredentials: true,
          params: {
            doctor_ID: value,
            DateRange: selectedDateRange,
          },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const { data } = res.data;
      setCalendarData(data.calendarData);
      setDisplayedPatients(data.appointmentsData);
    } catch (error) {
      ErrorHandler(error, setShowExpire);
    }
  };

  const filterByStatus = DisplayedPatients
    ? DisplayedPatients.filter((item) => {
        if (selectedStatus === "Cancelled") {
          if (item.Status === "Rejected" || item.Status === "Cancelled") {
            return true;
          }
        } else if (
          (!searchQuery ||
            (item.Fname &&
              item.Fname.toLowerCase().includes(searchQuery.toLowerCase())) ||
            (item.Lname &&
              item.Lname.toLowerCase().includes(searchQuery.toLowerCase()))) &&
          item.Status === selectedStatus
        ) {
          return true;
        }
        return false;
      })
    : [];

  const renderCard = filterByStatus.map((item, index) => {
    return (
      <Card
        selectedStatus={selectedStatus}
        data={item}
        key={index}
        setUpdate={setUpdate}
      />
    );
  });

  const renderSelectOptions = doctorList
    ? doctorList.map((item, index) => {
        return <SelectedDoctor data={item} key={index} />;
      })
    : [];

  return (
    <div className="Admin--Dashboard_Container">
      <div className="LeftContent">
        <SearchRowAndSelectDoctor
          selectedDoctor={selectedDoctor}
          onDoctorChangeHandler={onDoctorChangeHandler}
          renderSelectOptions={renderSelectOptions}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />
        <AppointmentTable
          selectedDateRange={selectedDateRange}
          onSelectHandler={onSelectHandler}
          onChangeHandler={onChangeHandler}
          patientCounter={patientCounter}
          renderCard={renderCard}
          DisplayedPatients={DisplayedPatients}
        />
      </div>
      <div className="RightContent">
        <DashboardCalender calendarData={calendarData} setUpdate={setUpdate} />
        <SeeData DisplayedPatients={DisplayedPatients} graphData={graphData} />
      </div>
    </div>
  );
}
