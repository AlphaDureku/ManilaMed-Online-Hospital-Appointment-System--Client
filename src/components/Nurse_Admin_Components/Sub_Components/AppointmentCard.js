export default function Card(props) {
  const styles = {
    Pending: { backgroundColor: "#ececec" },
    Accepted: { backgroundColor: "#dbffdf" },
    Rejected: { backgroundColor: "#ffb6b6" },
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
            : styles.Rejected
        }
      >
        <div>Mark Angelo Templanza</div>
        <div>
          <button style={{ backgroundColor: " #29cc97" }}>10/05/2020</button>
        </div>
      </div>
    </>
  );
}
