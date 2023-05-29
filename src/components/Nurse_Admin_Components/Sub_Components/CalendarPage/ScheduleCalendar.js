import { DatePicker } from "@mantine/dates";
import { useMediaQuery } from "@mantine/hooks";

export default function ScheduleCalendar({
  getDayProps,
  handleDateSelect,
  selectedDate,
}) {
  const breakPointMobile = useMediaQuery("(max-width: 1200px)");
  return (
    <>
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
    </>
  );
}
