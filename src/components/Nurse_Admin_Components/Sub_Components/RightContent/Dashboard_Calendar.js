import { DatePicker } from "@mantine/dates";

export default function DashboardCalender() {
  return (
    <>
      <div className="Dashboard--Calendar">
        <DatePicker
          // getDayProps={getDayProps}
          // onChange={handleDateSelect}
          // value={selectedDate}
          size={"xs"}
          style={{
            margin: "0 auto",
            marginTop: "15px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        ></DatePicker>
      </div>
    </>
  );
}
