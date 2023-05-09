import { Button } from "@mantine/core";
import { Modal } from "react-bootstrap";

export default function MyAppointments(props) {
  const { show, handleClose, selectedAppointment } = props;
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
            <Button
              disabled={selectedAppointment.status === "Confirmed"}
              className="modalButton"
              type="submit"
              size="sm"
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
    <Modal size="lg" show={show} onHide={handleClose} centered>
      {" "}
      <Modal.Header className="Tracker--modalHeader" closeButton></Modal.Header>
      <Modal.Body className="Tracker--modalBody">{modalBody}</Modal.Body>
    </Modal>
  );
}
