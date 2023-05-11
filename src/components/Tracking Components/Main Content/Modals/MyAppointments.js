import { Button, Tooltip } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import axios from "axios";
import { useContext } from "react";
import { Modal } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { AppointmentDetailsContext } from "../../../../App";
import ConfirmModal from "../../../Reusable_Components/ConfirmationModal";

export default function MyAppointments(props) {
  const {
    show,
    setShow,
    selectedAppointment,
    showConfirm,
    setShowConfirm,
    setRefreshContent,
  } = props;
  console.log(selectedAppointment);
  const navigate = useNavigate();
  const { setAppointmentDetails } = useContext(AppointmentDetailsContext);
  const token = localStorage.getItem("userToken");
  const updateStatus = async (appointment_ID) => {
    try {
      await axios.post(
        "/user/cancel-appointment",
        {
          appointment_ID: appointment_ID,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setRefreshContent((prev) => !prev);
      setShowConfirm((prev) => !prev);
      notifications.show({
        title: "Cancelled Appointment Successfully!",
        color: "teal",
        autoClose: 3000,
      });
    } catch (error) {
      console.log(error.message);
    }
  };

  const TogglerModal = () => {
    if (selectedAppointment.status === "Pending") {
      setShow((prev) => !prev);
      setShowConfirm((prev) => !prev);
    } else {
      setAppointmentDetails((prev) => ({
        ...prev,
        email: selectedAppointment.email,
        patient_ID: selectedAppointment.patient_ID,
      }));
      navigate("/services/collect-info");
    }
  };

  console.log(selectedAppointment);

  const modalBody = (
    <>
      <div className="Tracker--modal--patient-name">
        {selectedAppointment.patient_first_name}{" "}
        {selectedAppointment.patient_last_name}
      </div>
      <p className="Tracker--modal--patient-details">
        Patient ({selectedAppointment.gender})
      </p>
      <p className="Tracker--modal--patient-details">
        Age: {selectedAppointment.patient_age}
      </p>
      <p className="Tracker--modal--patient-details">
        Contact: <b>{selectedAppointment.contact}</b>
      </p>
      <br></br>
      <p className="Tracker--modal--patient-details">
        Address: <b>{selectedAppointment.patient_address}</b>
      </p>
      <p className="Tracker--modal--patient-details">
        Track via Email address: <b>{selectedAppointment.email}</b>
      </p>
      <br></br>
      <div className="Tracker--modal--flexbox">
        <div>
          <p className="Tracker--modal--doctor-details">
            <b>
              Dr.
              {selectedAppointment.doctor_Fname}{" "}
              {selectedAppointment.doctor_Lname}
            </b>
          </p>
          <p className="Tracker--modal--patient-details">
            {selectedAppointment.specialization}
          </p>
        </div>
        <div>
          <p className="Tracker--modal--doctor-details">
            <b>Appointment Date</b>
          </p>
          <p className="Tracker--modal--date-details">
            <b>
              {selectedAppointment.date} | {selectedAppointment.start} -{" "}
              {selectedAppointment.end}
            </b>
          </p>
        </div>
      </div>

      <hr></hr>
      <div className="Tracker--modal--flexbox">
        <div>
          {" "}
          <div className="modalButton_row">
            <Tooltip
              label={
                selectedAppointment.status === "Confirmed"
                  ? "Slot is already reserved. Please contact us if you need assistance"
                  : selectedAppointment.status === "Pending"
                  ? "Cancel"
                  : "Rebook"
              }
            >
              <Button
                className="modalButton"
                type="submit"
                size="sm"
                onClick={
                  !selectedAppointment.status === "Confirmed"
                    ? () => TogglerModal()
                    : ""
                }
                style={{
                  boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
                  backgroundColor:
                    selectedAppointment.status === "Pending" ||
                    selectedAppointment.status === "Confirmed"
                      ? "red"
                      : "#388440",
                }}
              >
                {selectedAppointment.status === "Pending" ||
                selectedAppointment.status === "Confirmed"
                  ? "Cancel Appointment"
                  : "Rebook"}
              </Button>
            </Tooltip>
          </div>
        </div>
        <div>
          <p className="Tracker--modal--patient-details">
            status:{" "}
            <b>
              <i>{selectedAppointment.status}</i>
            </b>
          </p>
        </div>
      </div>
    </>
  );
  return (
    <>
      <Modal size="lg" show={show} onHide={() => setShow(false)} centered>
        {" "}
        <Modal.Header
          className="Tracker--modalHeader"
          closeButton
        ></Modal.Header>
        <Modal.Body className="Tracker--modalBody">{modalBody}</Modal.Body>
      </Modal>
      <ConfirmModal
        show={showConfirm}
        title={"Cancellation"}
        question={"Are you sure you wanted to cancel this appointment?"}
        handleClose={TogglerModal}
        handleSubmit={() => updateStatus(selectedAppointment.appointment_ID)}
      />
    </>
  );
}
