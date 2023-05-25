import axios from "axios";
import { useEffect, useState } from "react";
import SelectedDoctor from "./LeftContent/AdminSelectDoctor";
import Card from "./LeftContent/AppointmentCard";
import AppointmentTable from "./LeftContent/AppointmentTable";
import SearchRowAndSelectDoctor from "./LeftContent/searchRowAndSelectDoctor";
import DashboardCalender from "./RightContent/Dashboard_Calendar";
import InsertAppointment from "./RightContent/InserAppointment";

export default function LandingPage() {
  const [selectedStatus, setSelectedStatus] = useState("Pending");
  const [selectedDateRange, setSelectedDateRange] = useState("Week");
  const [selectedDoctor, setSelectedDoctor] = useState("");
  const [doctorList, setDoctorList] = useState([]);
  const [DisplayedPatients, setDisplayedPatients] = useState([]);
  const [patientCounter, setPatientCounter] = useState({});
  const token = localStorage.getItem("nurseToken");
  const [update, setUpdate] = useState(false);

  useEffect(() => {
    async function getData() {
      const res = await axios.get(
        process.env.REACT_APP_ONLINE + "/admin/nurse-dashboard",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      );
      const { data } = res.data;
      setDisplayedPatients(data.AppointmentsData);
      setDoctorList(data.DoctorData);
      setSelectedDoctor(data.DoctorData[0].doctor_ID);
    }
    getData();
    // eslint-disable-next-line
  }, [update]);

  useEffect(() => {
    // Count the number of appointments in each state and update state
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
    const res = await axios.get(
      process.env.REACT_APP_ONLINE + "/admin/change-dateRange",
      {
        params: {
          DateRange: value,
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      }
    );
    const { data } = res.data;
    setDisplayedPatients(data.appointmentsData);
  };

  const onDoctorChangeHandler = async (event) => {
    const { value } = event.target;
    setSelectedDoctor(value);
    const res = await axios.get(
      process.env.REACT_APP_ONLINE + "/admin/change-doctor",
      {
        params: {
          doctor_ID: value,
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      }
    );

    const { data } = res.data;
    setDisplayedPatients(data.appointmentsData);
  };

  const filterByStatus = DisplayedPatients
    ? DisplayedPatients.filter((item) => {
        if (selectedStatus === "Cancelled") {
          if (item.status === "Rejected" || item.status === "Cancelled") {
            return item;
          }
        }
        if (item.Status === selectedStatus) {
          return item;
        }
        return null;
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
        <DashboardCalender />
        <InsertAppointment />
      </div>
    </div>
  );
}
