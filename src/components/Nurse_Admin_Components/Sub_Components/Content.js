import axios from "axios";
import { useEffect, useState } from "react";
import Card from "./AppointmentCard";

export default function Content() {
  const [selectedStatus, setSelectedStatus] = useState("Pending");
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
      console.log(data);
    }
    getData();
  }, []);

  const onChangeHandler = (event) => {
    const { value } = event.target;
    setSelectedStatus(value);
  };
  console.log(selectedStatus);
  return (
    <div className="Admin--Dashboard_Container">
      <div>
        <div className="search-row"></div>
        <div className="AppointmentTable">
          <div>
            <div>
              <p style={{ color: "#434343" }}>Total Appointments</p>

              <p style={{ color: "#388440" }}>Total: 34</p>
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
                <br></br>0
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
                <br></br>0
              </div>
            </label>
            <label className="statusSelector--label">
              <input
                type="radio"
                name="status"
                value="Rejected"
                onChange={onChangeHandler}
              ></input>
              <div>
                Rejected<br></br>
                <br></br>0
              </div>
            </label>
          </div>
          <div className="Admin--AppointmentContainer">
            <Card selectedStatus={selectedStatus} />
          </div>
        </div>
      </div>
      <div>
        <div className="Dashboard--Calendar"></div>
        <div className="Dashboard--Data"></div>
      </div>
    </div>
  );
}
