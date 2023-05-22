export default function Card(props) {
  const styles = {
    Pending: { backgroundColor: "#ececec" },
    Accepted: { backgroundColor: "#dbffdf" },
    Rejected: { backgroundColor: "#ffb6b6" },
    Completed: { backgroundColor: "#88d4f7" },
  };

  return (
    <>
      <div
        className="Admin--CardContainer"
        style={
          props.selectedStatus === "Pending"
            ? styles.Pending
            : props.selectedStatus === "Accepted"
            ? styles.Accepted
            : props.selectedStatus === "Cancelled"
            ? styles.Rejected
            : styles.Completed
        }
      >
        <div>
          {props.data.Fname} {props.data.Lname}
        </div>
        <div>
          <button style={{ backgroundColor: " #29cc97" }}>
            {props.data.appointmentDate}
          </button>
        </div>
      </div>
    </>
  );
}
