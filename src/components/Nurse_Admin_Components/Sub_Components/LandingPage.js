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
        console.log(data);
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
      console.log(data);
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

  const fakedata = [
    {
      Contact: "+639422167432",
      Fname: "Mark",
      Lname: "Fetero",
      Status: "Confirmed",
      appointmentDate: "June 4, 2023",
      appointmentStart: "10:00:00",
      appointment_ID: "APP-1b433861-9148-452e-a0a5-cecaab62dfef",
      createdAt: "May 1, 2023",
      doctor_Fname: "Mark",
      doctor_Lname: "Templanza",
      email: "lemuelponce914@gmail.com",
      end: "03:00PM",
      gender: "M",
      patient_ID: "PATIENT-0695ba9c-d7b0-4733-9e6f-4b438378f3f1",
      patient_address: "1255 De Vera St. Tondo, Manila",
      patient_age: 21,
      specialization: "Internal Medicine",
      start: "10:00AM",
    },
    {
      // Second object
      Contact: "+123456789",
      Fname: "John",
      Lname: "Doe",
      Status: "Completed",
      appointmentDate: "May 15, 2023",
      appointmentStart: "09:00:00",
      appointment_ID: "APP-2a482743-8359-4eab-bff5-d7390c5aef79",
      createdAt: "May 31, 2023",
      doctor_Fname: "Jane",
      doctor_Lname: "Smith",
      email: "johndoe@example.com",
      end: "11:00AM",
      gender: "M",
      patient_ID: "PATIENT-8a983782-82d1-49f4-a615-5c7e39c3966d",
      patient_address: "123 Main St, City",
      patient_age: 35,
      specialization: "Dentistry",
      start: "09:00AM",
    },
    {
      // Second object
      Contact: "+123456789",
      Fname: "John",
      Lname: "Doe",
      Status: "Pending",
      appointmentDate: "May 20, 2023",
      appointmentStart: "09:00:00",
      appointment_ID: "APP-2a482743-8359-4eab-bff5-d7390c5aef79",
      createdAt: "May 31, 2023",
      doctor_Fname: "Jane",
      doctor_Lname: "Smith",
      email: "johndoe@example.com",
      end: "11:00AM",
      gender: "M",
      patient_ID: "PATIENT-8a983782-82d1-49f4-a615-5c7e39c3966d",
      patient_address: "123 Main St, City",
      patient_age: 35,
      specialization: "Dentistry",
      start: "09:00AM",
    },
    {
      // Second object
      Contact: "+123456789",
      Fname: "John",
      Lname: "Doe",
      Status: "Cancelled",
      appointmentDate: "May 24, 2023",
      appointmentStart: "09:00:00",
      appointment_ID: "APP-2a482743-8359-4eab-bff5-d7390c5aef79",
      createdAt: "May 31, 2023",
      doctor_Fname: "Jane",
      doctor_Lname: "Smith",
      email: "johndoe@example.com",
      end: "11:00AM",
      gender: "M",
      patient_ID: "PATIENT-8a983782-82d1-49f4-a615-5c7e39c3966d",
      patient_address: "123 Main St, City",
      patient_age: 35,
      specialization: "Dentistry",
      start: "09:00AM",
    },
    {
      // Second object
      Contact: "+123456789",
      Fname: "John",
      Lname: "Doe",
      Status: "Cancelled",
      appointmentDate: "July 5, 2023",
      appointmentStart: "09:00:00",
      appointment_ID: "APP-2a482743-8359-4eab-bff5-d7390c5aef79",
      createdAt: "May 12, 2023",
      doctor_Fname: "Jane",
      doctor_Lname: "Smith",
      email: "johndoe@example.com",
      end: "11:00AM",
      gender: "M",
      patient_ID: "PATIENT-8a983782-82d1-49f4-a615-5c7e39c3966d",
      patient_address: "123 Main St, City",
      patient_age: 35,
      specialization: "Dentistry",
      start: "09:00AM",
    },
    {
      // Second object
      Contact: "+123456789",
      Fname: "John",
      Lname: "Doe",
      Status: "Confirmed",
      appointmentDate: "May 30, 2023",
      appointmentStart: "09:00:00",
      appointment_ID: "APP-2a482743-8359-4eab-bff5-d7390c5aef79",
      createdAt: "May 31, 2023",
      doctor_Fname: "Jane",
      doctor_Lname: "Smith",
      email: "johndoe@example.com",
      end: "11:00AM",
      gender: "M",
      patient_ID: "PATIENT-8a983782-82d1-49f4-a615-5c7e39c3966d",
      patient_address: "123 Main St, City",
      patient_age: 35,
      specialization: "Dentistry",
      start: "09:00AM",
    },
    {
      // Second object
      Contact: "+123456789",
      Fname: "John",
      Lname: "Doe",
      Status: "Cancelled",
      appointmentDate: "May 30 , 2023",
      appointmentStart: "09:00:00",
      appointment_ID: "APP-2a482743-8359-4eab-bff5-d7390c5aef79",
      createdAt: "May 31, 2023",
      doctor_Fname: "Jane",
      doctor_Lname: "Smith",
      email: "johndoe@example.com",
      end: "11:00AM",
      gender: "M",
      patient_ID: "PATIENT-8a983782-82d1-49f4-a615-5c7e39c3966d",
      patient_address: "123 Main St, City",
      patient_age: 35,
      specialization: "Dentistry",
      start: "09:00AM",
    },
    {
      // Second object
      Contact: "+123456789",
      Fname: "John",
      Lname: "Doe",
      Status: "Completed",
      appointmentDate: "May 15, 2023",
      appointmentStart: "09:00:00",
      appointment_ID: "APP-2a482743-8359-4eab-bff5-d7390c5aef79",
      createdAt: "May 31, 2023",
      doctor_Fname: "Jane",
      doctor_Lname: "Smith",
      email: "johndoe@example.com",
      end: "11:00AM",
      gender: "M",
      patient_ID: "PATIENT-8a983782-82d1-49f4-a615-5c7e39c3966d",
      patient_address: "123 Main St, City",
      patient_age: 35,
      specialization: "Dentistry",
      start: "09:00AM",
    },
  ];

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
        <SeeData DisplayedPatients={DisplayedPatients} fakedata={fakedata} />
      </div>
    </div>
  );
}
