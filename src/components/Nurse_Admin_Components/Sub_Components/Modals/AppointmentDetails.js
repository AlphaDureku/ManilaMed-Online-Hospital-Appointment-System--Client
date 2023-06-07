import { notifications } from "@mantine/notifications";
import axios from "axios";
import { useContext } from "react";
import { Modal } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { AppointmentDetailsContext } from "../../../../App";
import { ErrorHandler } from "../../../../utils/errorHandler";
import BackProceed from "../../../Reusable_Components/Buttons--BackProceed";
import { AdminContext } from "../../Main_Content/Content";
export default function AppointmentDetailsModal(props) {
  const { data, show, toggle, styles, setUpdate } = props;
  const navigate = useNavigate();
  const token = localStorage.getItem("nurseToken");
  const { setAppointmentDetails } = useContext(AppointmentDetailsContext);
  const { setShowExpire } = useContext(AdminContext);
  const ButtonTextSelector = () => {
    if (data.Status === "Pending") {
      return "Accept Appointment";
    } else if (data.Status === "Confirmed") {
      return "Complete Appointment";
    } else {
      return "Rebook Appointment";
    }
  };

  const showNotification = (updateStatus) => {
    notifications.show({
      title: `Successfully ${updateStatus} Appointment!`,
      color:
        updateStatus === "Confirmed"
          ? "teal"
          : updateStatus === "Completed"
          ? "blue"
          : "red",
      autoClose: 2000,
    });
  };

  const headerColorSelector = () => {
    if (data.Status === "Pending") {
      return styles.Pending;
    } else if (data.Status === "Confirmed") {
      return styles.Accepted;
    } else if (data.Status === "Completed") {
      return styles.Completed;
    } else {
      return styles.Rejected;
    }
  };

  const buttonOnClickSelector = () => {
    if (data.Status === "Pending") {
      return statusUpdater({
        updatedFrom: data.Status,
        updatedTo: "Confirmed",
      });
    } else if (data.Status === "Confirmed") {
      return statusUpdater({
        updatedFrom: data.Status,
        updatedTo: "Completed",
      });
    } else {
      setAppointmentDetails((prev) => ({
        ...prev,
        patient_ID: data.patient_ID,
        email: data.email,
      }));
      navigate("/services/collect-info");
    }
  };

  const statusUpdater = ({ updatedFrom, updatedTo }) => {
    console.log(updatedFrom, updatedTo);
    try {
      axios.post(
        process.env.REACT_APP_ONLINE + "/admin/update-status",
        {
          appointment_ID: data.appointment_ID,
          updatedFrom: updatedFrom,
          updatedTo: updatedTo,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setUpdate((prev) => !prev);
      showNotification(updatedTo);
      toggle();
    } catch (error) {
      ErrorHandler(error, setShowExpire);
    }
  };

  const modalBody = (
    <>
      <div className="Tracker--modal--patient-name">
        {data.Fname} {data.Lname}
      </div>
      <p className="Tracker--modal--patient-details">Patient ({data.gender})</p>
      <p className="Tracker--modal--patient-details">Age: {data.patient_age}</p>
      <p className="Tracker--modal--patient-details">
        Contact: <b>{data.Contact}</b>
      </p>
      <br></br>
      <p className="Tracker--modal--patient-details">
        Address: <b>{data.patient_address}</b>
      </p>
      <p className="Tracker--modal--patient-details">
        Email Address: <b>{data.email}</b>
      </p>
      Queue Number: <b>{data.queue_number}</b>
      <br></br>
      <br></br>
      <div className="Tracker--modal--flexbox">
        <div>
          <p className="Tracker--modal--doctor-details">
            <b>
              Dr. {data.doctor_Fname} {data.doctor_Lname}
            </b>
          </p>
          <p className="Tracker--modal--patient-details">
            {data.specialization}
          </p>
        </div>
        <div>
          <p className="Tracker--modal--doctor-details">
            <b>Appointment Date</b>
          </p>
          <h2 className="Tracker--modal--date-details pt-1">
            <b>
              {data.appointmentDate} | {data.schedule_start} - {data.end}
              {data.schedule_start === data.appointment_start ? (
                ""
              ) : (
                <>
                  <hr></hr>
                  <p>Recommended Time: {data.appointment_start}</p>
                </>
              )}
            </b>
          </h2>
        </div>
      </div>
      <hr></hr>
      <div className="Admin--Flex">
        <div className="Tracker--modal--patient-details">
          Status: <b>{data.Status}</b>
        </div>
        <div className="Admin--ButtonRow">
          <BackProceed
            blueButtonText={ButtonTextSelector()}
            redButtonText={"Cancel Appointment"}
            leftButton={() =>
              data.Status === "Pending"
                ? statusUpdater({
                    updatedFrom: data.Status,
                    updatedTo: "Rejected",
                  })
                : statusUpdater({
                    updatedFrom: data.Status,
                    updatedTo: "Cancelled",
                  })
            }
            rightButton={buttonOnClickSelector}
            isDisabledRed={
              data.Status === "Cancelled" ||
              data.Status === "Rejected" ||
              data.Status === "Completed"
                ? true
                : false
            }
          ></BackProceed>
        </div>
      </div>
    </>
  );

  return (
    <>
      <Modal size="lg" show={show} onHide={toggle} centered>
        <Modal.Header closeButton style={headerColorSelector()}>
          <Modal.Title>Appointment Request</Modal.Title>
        </Modal.Header>
        <Modal.Body>{modalBody}</Modal.Body>
      </Modal>
    </>
  );
}
