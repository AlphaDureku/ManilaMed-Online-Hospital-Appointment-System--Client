import axios from "axios";
import { useEffect, useState } from "react";
import Card from "./AppointmentCard";

export default function Content() {
  const [selectedStatus, setSelectedStatus] = useState("Pending");
  const [DisplayedPatients, setDisplayedPatients] = useState([]);
  const [patientCounter, setPatientCounter] = useState({});
  const token = localStorage.getItem("nurseToken");
  useEffect(() => {
    async function getData() {
      const res = await axios.get(
        process.env.REACT_APP_ONLINE + "/admin/nurse-dashboard",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const { data } = res.data;
      setDisplayedPatients(data.AppointmentsData);
      console.log(data);
    }
    getData();
  }, []);

  useEffect(() => {
    // Count the number of appointments in each state and update state
    const newCounts = DisplayedPatients.reduce(
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
    );

    setPatientCounter(newCounts);
  }, [DisplayedPatients]);

  const onChangeHandler = (event) => {
    const { value } = event.target;
    setSelectedStatus(value);
  };

  const filterByStatus = DisplayedPatients.filter((item) => {
    if (selectedStatus === "Cancelled") {
      if (item.status === "Rejected" || item.status === "Cancelled") {
        return item;
      }
    }
    if (item.Status === selectedStatus) {
      return item;
    }
    return null;
  });

  const renderCard = filterByStatus.map((item, index) => {
    return <Card selectedStatus={selectedStatus} data={item} key={index} />;
  });
  return (
    <div className="Admin--Dashboard_Container">
      <div>
        <div className="search-row"></div>
        <div className="AppointmentTable">
          <div>
            <div>
              <p style={{ color: "#434343" }}>Total Appointments</p>

              <p style={{ color: "#388440" }}>
                Total: {DisplayedPatients.length}
              </p>
            </div>
            <div>
              <select className="DateRange">
                <option>This Day</option>
                <option>This Week</option>
                <option>This Month</option>
                <option>This Year</option>
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
                value="Accepted"
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