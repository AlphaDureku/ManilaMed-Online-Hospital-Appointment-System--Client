import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function Card() {
  const [appointmentList, setAppointmentList] = useState([]);
  const token = localStorage.getItem("userToken");
  const { id } = useParams();
  const [count, setCount] = useState({
    pending: 0,
    confirmed: 0,
    cancelled: 0,
    completed: 0,
  });
  document.title = "Appointment History";

  useEffect(() => {
    const getAppointments = async () => {
      const response = await axios.get(`/user/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setAppointmentList(response.data.data);
    };
    getAppointments();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    // Count the number of appointments in each state and update state
    const newCounts = appointmentList.reduce(
      (accumulator, currentValue) => {
        if (currentValue.status === "Pending") {
          accumulator.pending++;
        } else if (currentValue.status === "Confirmed") {
          accumulator.confirmed++;
        } else if (currentValue.status === "Completed") {
          accumulator.completed++;
        } else if (currentValue.status === "Cancelled") {
          accumulator.cancelled++;
        }
        return accumulator;
      },
      { pending: 0, confirmed: 0, completed: 0, cancelled: 0 }
    );

    setCount(newCounts);
  }, [appointmentList]);

  const PendingElements = appointmentList.map((item, index) => {
    if (item.status === "Pending") {
      return (
        <div className="appointment-card" key={index}>
          <div className="appointment-card--patient-info">
            <div className="card--patient-name">
              {item.patient_first_name} {item.patient_last_name}
            </div>
            <div className="card--appointment-header">Appointment Date:</div>
            <div className="appointment-date">
              {item.date} | {item.start} - {item.end}
            </div>
          </div>
          <hr className="hr" style={{ margin: "2%" }}></hr>
          <div className="appointment-card--doctor-info">
            <div className="card--doctor-name">
              Dr. {item.doctor_Fname} {item.doctor_Lname}
            </div>
            <div className="card--doctor-spec">{item.specialization}</div>
          </div>
        </div>
      );
    }
    return false;
  });

  const ConfirmedElements = appointmentList.map((item, index) => {
    if (item.status === "Confirmed") {
      return (
        <div className="appointment-card" key={index}>
          <div className="appointment-card--patient-info">
            <div className="card--patient-name">
              {item.patient_first_name} {item.patient_last_name}
            </div>
            <div className="card--appointment-header">Appointment Date:</div>
            <div className="appointment-date">
              {item.date} | {item.start} - {item.end}
            </div>
          </div>
          <hr className="hr" style={{ margin: "2%" }}></hr>
          <div className="appointment-card--doctor-info">
            <div className="card--doctor-name">
              Dr. {item.doctor_Fname} {item.doctor_Lname}
            </div>
            <div className="card--doctor-spec">{item.specialization}</div>
          </div>
        </div>
      );
    }
    return false;
  });

  const CompletedElements = appointmentList.map((item, index) => {
    if (item.status === "Completed") {
      return (
        <div className="appointment-card" key={index}>
          <div className="appointment-card--patient-info">
            <div className="card--patient-name">
              {item.patient_first_name} {item.patient_last_name}
            </div>
            <div className="card--appointment-header">Appointment Date:</div>
            <div className="appointment-date">
              {item.date} | {item.start} - {item.end}
            </div>
          </div>
          <hr className="hr" style={{ margin: "2%" }}></hr>
          <div className="appointment-card--doctor-info">
            <div className="card--doctor-name">
              Dr. {item.doctor_Fname} {item.doctor_Lname}
            </div>
            <div className="card--doctor-spec">{item.specialization}</div>
          </div>
        </div>
      );
    }
    return false;
  });

  const CancelledElements = appointmentList.map((item, index) => {
    if (item.status === "Cancelled") {
      return (
        <div className="appointment-card" key={index}>
          <div className="appointment-card--patient-info">
            <div className="card--patient-name">
              {item.patient_first_name} {item.patient_last_name}
            </div>
            <div className="card--appointment-header">Appointment Date:</div>
            <div className="appointment-date">
              {item.date} | {item.start} - {item.end}
            </div>
          </div>
          <hr className="hr" style={{ margin: "2%" }}></hr>
          <div className="appointment-card--doctor-info">
            <div className="card--doctor-name">
              Dr. {item.doctor_Fname} {item.doctor_Lname}
            </div>
            <div className="card--doctor-spec">{item.specialization}</div>
          </div>
        </div>
      );
    }
    return false;
  });

  return (
    <>
      {count.pending > 0 ? (
        <div className="appointment-item">
          <div className="appointment-status grey">
            Pending ({count.pending})
          </div>
          {PendingElements}
        </div>
      ) : (
        ""
      )}

      {count.confirmed > 0 ? (
        <div className="appointment-item">
          <div className="appointment-status blue">
            Confirmed ({count.confirmed})
          </div>
          {ConfirmedElements}
        </div>
      ) : (
        ""
      )}
      {count.cancelled > 0 ? (
        <div className="appointment-item">
          <div className="appointment-status red">
            Cancelled ({count.cancelled})
          </div>
          {CancelledElements}
        </div>
      ) : (
        ""
      )}
      {count.completed > 0 ? (
        <div className="appointment-item">
          <div className="appointment-status green">
            Completed({count.completed})
          </div>
          {CompletedElements}
        </div>
      ) : (
        ""
      )}
    </>
  );
}
