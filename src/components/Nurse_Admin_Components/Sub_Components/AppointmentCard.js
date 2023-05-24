import { useState } from "react";
import AppointmentDetailsModal from "./Modals/AppointmentDetails";

export default function Card(props) {
  const [showModal, setShowModal] = useState(false);
  const styles = {
    Pending: { backgroundColor: "#ececec" },
    Accepted: { backgroundColor: "#dbffdf" },
    Rejected: { backgroundColor: "#ffb6b6" },
    Completed: { backgroundColor: "#88d4f7" },
  };

  const modalToggler = () => {
    setShowModal((prev) => !prev);
  };
  const onClickHandler = () => {
    setShowModal(true);
  };

  return (
    <>
      <div
        className="Admin--CardContainer"
        style={
          props.selectedStatus === "Pending"
            ? styles.Pending
            : props.selectedStatus === "Confirmed"
            ? styles.Accepted
            : props.selectedStatus === "Cancelled"
            ? styles.Rejected
            : styles.Completed
        }
        onClick={() => onClickHandler()}
      >
        <div>
          {props.data.Fname} {props.data.Lname}
        </div>
        <div>
          <button style={{ backgroundColor: " #29cc97" }}>
            {props.data.createdAt}
          </button>
        </div>
      </div>
      <AppointmentDetailsModal
        show={showModal}
        toggle={modalToggler}
        data={props.data}
        styles={styles}
        setUpdate={props.setUpdate}
      />
    </>
  );
}
