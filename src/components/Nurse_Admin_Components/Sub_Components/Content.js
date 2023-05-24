import axios from "axios";
import { useEffect, useState } from "react";
import MantineSearchBar from "./AdminSearchBar";
import SelectedDoctor from "./AdminSelectDoctor";
import Card from "./AppointmentCard";

export default function Content() {
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
      <div>
        <div className="search-row">
          <div>
            <MantineSearchBar />
          </div>
          <div>
            <select
              className="Admin--SelectDoctor"
              value={selectedDoctor}
              onChange={onDoctorChangeHandler}
            >
              {renderSelectOptions}
            </select>
          </div>
        </div>
        <div className="AppointmentTable">
          <div>
            <div>
              <p style={{ color: "#434343" }}>Total Appointments</p>

              <p style={{ color: "#388440" }}>
                Total: {DisplayedPatients ? DisplayedPatients.length : 0}
              </p>
            </div>
            <div>
              <select
                className="DateRange"
                value={selectedDateRange}
                onChange={onSelectHandler}
              >
                <option value={"Day"}>This Day</option>
                <option value={"Week"}>This Week</option>
                <option value={"Month"}>This Month</option>
                <option value={"Year"}>This Year</option>
              </select>
            </div>
          </div>

          <div className="statusSelector">
            <label className="statusSelector--label">
              <input
                type="radio"
                name="status"
                value="Pending"
                onChange={onChangeHandler}
                defaultChecked
              ></input>
              <div>
                Pending<br></br>
                <br></br>
                {patientCounter.pending}
              </div>
            </label>
            <label className="statusSelector--label">
              <input
                type="radio"
                name="status"
                value="Confirmed"
                onChange={onChangeHandler}
              ></input>
              <div>
                Accepted<br></br>
                <br></br>
                {patientCounter.confirmed}
              </div>
            </label>
            <label className="statusSelector--label">
              <input
                type="radio"
                name="status"
                value="Cancelled"
                onChange={onChangeHandler}
              ></input>
              <div>
                Cancelled<br></br>
                <br></br>
                {patientCounter.cancelled}
              </div>
            </label>
            <label className="statusSelector--label">
              <input
                type="radio"
                name="status"
                value="Completed"
                onChange={onChangeHandler}
              ></input>
              <div>
                Completed<br></br>
                <br></br>
                {patientCounter.completed}
              </div>
            </label>
          </div>
          <div className="Admin--AppointmentContainer">{renderCard}</div>
        </div>
      </div>
      <div>
        <div className="Dashboard--Calendar"></div>
        <div className="Dashboard--Data"></div>
      </div>
    </div>
  );
}
