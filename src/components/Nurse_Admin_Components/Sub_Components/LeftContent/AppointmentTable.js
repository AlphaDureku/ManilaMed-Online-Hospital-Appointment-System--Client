import RequestLoadingSkeleton from "../../../HeadAdmin_Components/Sub_Components/RequestLoadingSkeleton";
import AdminSkeleton from "../../../Reusable_Components/AdminSkeleton";

export default function AppointmentTable(props) {
  const {
    selectedDateRange,
    onSelectHandler,
    onChangeHandler,
    patientCounter,
    renderCard,
    DisplayedPatients,
    loading,
  } = props;
  return (
    <>
      <div className="AppointmentTable">
        <div className="AppointmentTable--Header">
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
        <div className="Admin--AppointmentContainer">
          {loading ? (
            <AdminSkeleton />
          ) : renderCard.length === 0 ? (
            <div className="Empty">No Appointments Found</div>
          ) : (
            renderCard
          )}
        </div>
      </div>
    </>
  );
}
