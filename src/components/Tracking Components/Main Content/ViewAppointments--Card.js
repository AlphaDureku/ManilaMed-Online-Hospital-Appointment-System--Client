import axios from "axios";
import { useEffect, useState } from "react";
import { ErrorHandler } from "../../../utils/errorHandler";
import MyAppointments from "./Modals/MyAppointments";
import Loading from "./ViewAppointments--Card--Loading";

export default function Card(props) {
  const [appointmentList, setAppointmentList] = useState([]);
  const token = localStorage.getItem("userToken");
  const [count, setCount] = useState({});
  const [show, setShow] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState({});
  const [refreshContent, setRefreshContent] = useState(false);

  document.title = "Appointment History";

  const handleShow = (patient) => {
    setShow(true);
    setSelectedAppointment(patient);
  };
  useEffect(() => {
    const getAppointments = async () => {
      props.setLoading(true);
      try {
        const response = await axios.get(
          process.env.REACT_APP_ONLINE + `/user/get-appointments`,
          {
            params: {
              id: localStorage.getItem("patient_ID"),
            },
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setAppointmentList(response.data.data);
      } catch (error) {
        ErrorHandler(error, props.setShowExpire);
      }
    };
    getAppointments();
    setTimeout(() => {
      props.setLoading(false);
    }, 200);
    // eslint-disable-next-line
  }, [refreshContent]);

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
        } else {
          accumulator.rejected++;
        }
        return accumulator;
      },
      { pending: 0, confirmed: 0, completed: 0, cancelled: 0, rejected: 0 }
    );

    setCount(newCounts);
  }, [appointmentList]);

  const appointmentCardElement = (item, index) => {
    return (
      <div
        className="appointment-card"
        key={index}
        onClick={() => handleShow(item)}
      >
        <div className="appointment-card--patient-info">
          <div className="card--patient-name">
            {item.patient_first_name} {item.patient_last_name}
          </div>
          <div className="card--appointment-header">Appointment Date:</div>
          <div className="appointment-date">
            {item.date} | {item.schedule_start} - {item.end}
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
  };

  const PendingElements = appointmentList.map((item, index) => {
    if (item.status === "Pending") {
      return appointmentCardElement(item, index);
    }
    return false;
  });

  const ConfirmedElements = appointmentList.map((item, index) => {
    if (item.status === "Confirmed") {
      return appointmentCardElement(item, index);
    }
    return false;
  });

  const CompletedElements = appointmentList.map((item, index) => {
    if (item.status === "Completed") {
      return appointmentCardElement(item, index);
    }
    return false;
  });

  const CancelledElements = appointmentList.map((item, index) => {
    if (item.status === "Cancelled") {
      return appointmentCardElement(item, index);
    }
    return false;
  });

  const RejectedElements = appointmentList.map((item, index) => {
    if (item.status === "Rejected") {
      return appointmentCardElement(item, index);
    }
    return false;
  });

  return props.loading ? (
    <Loading />
  ) : (
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
      {count.rejected > 0 ? (
        <div className="appointment-item">
          <div className="appointment-status red">
            Rejected({count.rejected})
          </div>
          {RejectedElements}
        </div>
      ) : (
        ""
      )}
      <MyAppointments
        show={show}
        setShow={setShow}
        selectedAppointment={selectedAppointment}
        showConfirm={showConfirm}
        setShowConfirm={setShowConfirm}
        setRefreshContent={setRefreshContent}
      />
    </>
  );
}
