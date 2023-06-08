import { Button, SegmentedControl } from "@mantine/core";
import { DatePicker } from "@mantine/dates";
import { useMediaQuery } from "@mantine/hooks";
import axios from "axios";
import moment from "moment";
import { useContext, useState } from "react";
import Modal from "react-bootstrap/Modal";
import { ErrorHandler } from "../../../../utils/errorHandler";
import AdminLoadingOverlay from "../../Main_Content/AdminLoadingOverlay";
import { AdminContext } from "../../Main_Content/Content";
import EditAvailability from "./editAvailability";
import InsertAvailability from "./insertAvailability";

export default function DashboardCalender(props) {
  const token = localStorage.getItem("nurseToken");
  const breakPointMobile = useMediaQuery("(max-width: 1280px)");
  const breakPointMobileforModal = useMediaQuery("(max-width: 1000px)");
  const { calendarData } = props;
  const [showModal, setShowModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState();
  const [isUpdated, setIsUpdated] = useState(false);
  const [loading, setLoading] = useState(false);
  const [updateDataCalendar, setUpdateDataCalendar] = useState([]);
  const { setShowExpire } = useContext(AdminContext);
  const updateDates = updateDataCalendar.map((item) => {
    const {
      date,
      doctor_ID,
      end,
      maxPatient,
      start,
      timeInterval,
      schedule_ID,
    } = item;
    return {
      date,
      doctor_ID,
      end,
      maxPatient,
      start,
      timeInterval,
      timeInterval,
      schedule_ID,
    };
  });

  async function getUpdateDataCalendar() {
    try {
      const res = await axios.get(
        process.env.REACT_APP_ONLINE + "/admin/avail-schedule-forUpdate",
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const { data } = res.data;
      setUpdateDataCalendar(data);
    } catch (error) {
      ErrorHandler(error, setShowExpire);
    }
  }

  const handleDateSelect = (date) => {
    setSelectedDate(date);
  };

  const getDayPropsUpdate = (date) => {
    const formattedDate = moment(date).format("YYYY-MM-DD");
    const datesArray = updateDates.map((item) => item.date);
    const selectedFormattedDate = moment(selectedDate).format("YYYY-MM-DD");

    if (selectedFormattedDate === formattedDate) {
      return {
        style: {
          backgroundColor: "rgba(34, 208, 52, 1)",
          color: "black",
        },
      };
    } else if (datesArray.some((item) => item === formattedDate)) {
      return {
        style: {
          backgroundColor: "rgba(34, 208, 52, 0.5)",
          color: "black",
        },
      };
    }

    return {
      disabled: true,
    };
  };

  const getDayProps = (date) => {
    const formattedDate = moment(date).format("YYYY-MM-DD");
    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0); // set time to midnight
    if (date < currentDate) {
      return { disabled: true };
    }
    if (
      calendarData &&
      calendarData.some((item) => item !== null && item.date2 === formattedDate)
    ) {
      return {
        style: {
          backgroundColor: "rgba(34, 208, 52, 0.5)",
          color: "black",
        },
        disabled: true,
      };
    }

    return {
      disabled: false,
    };
  };

  function handleCloseModal() {
    setSelectedDate("");
    setIsUpdated(false);
    setShowModal(false);
  }

  return (
    <>
      <div className="Dashboard--Calendar">
        <div>
          <h3>Schedule Calendar</h3>

          <Button onClick={() => setShowModal((prev) => !prev)}>
            Set Availability
          </Button>
        </div>

        <div className="" style={{ display: "flex", flexDirection: "column" }}>
          <DatePicker
            allowDeselect
            getDayProps={getDayProps}
            size={breakPointMobile ? "xs" : "lg"}
            onChange={handleDateSelect}
            value={selectedDate}
          ></DatePicker>
        </div>
        <Modal show={showModal} onHide={handleCloseModal} centered size="xl">
          <Modal.Header closeButton>
            <div className="h4 setAvailTitle">Set Availability</div>
          </Modal.Header>
          <AdminLoadingOverlay loading={loading}>
            <Modal.Body>
              <div className="set-avail-container">
                <div className="admin-calendarModalContainer">
                  <div className="setlegendrow ">
                    <div
                      style={{ color: "#2f9d44", fontWeight: "600" }}
                      className="ms-3 headerlegend-setavail"
                    >
                      <img
                        src="/images/lightgreenLegend.png"
                        alt=""
                        className="legend"
                      ></img>
                      With Availability
                    </div>
                    <div
                      style={{ color: "#434343", fontWeight: "600" }}
                      className="ms-5 headerlegend-setavail"
                    >
                      {" "}
                      <img
                        src="/images/whitec.png"
                        alt=""
                        className="legend"
                      ></img>
                      No Availability
                    </div>
                  </div>
                  <DatePicker
                    allowDeselect
                    getDayProps={isUpdated ? getDayPropsUpdate : getDayProps}
                    onChange={handleDateSelect}
                    value={selectedDate}
                    size={breakPointMobileforModal ? "xs" : "lg"}
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  ></DatePicker>
                  <div className="Admin--SetButtonRowSecond mt-3 mb-3">
                    <SegmentedControl
                      data={[
                        { label: "Set", value: "Set" },
                        { label: "Update", value: "Update" },
                      ]}
                      onChange={(value) => {
                        if (value === "Update") {
                          setIsUpdated(true);
                          getUpdateDataCalendar();
                        } else if (value === "Set") {
                          setIsUpdated(false);
                        }
                        setSelectedDate(null);
                      }}
                    />
                  </div>
                  <p className="setavail-juniortag">
                    <b>Note:</b> You can only Update or Remove availabilities
                    that have<br></br> yet to have an appointment reserved
                  </p>
                </div>
                <div>
                  {isUpdated ? (
                    <EditAvailability
                      selectedDate={selectedDate}
                      setSelectedDate={setSelectedDate}
                      handleCloseModal={handleCloseModal}
                      setShowModal={setShowModal}
                      setUpdate={props.setUpdate}
                      updateDates={updateDates}
                      setLoading={setLoading}
                      setIsUpdated={setIsUpdated}
                    />
                  ) : (
                    <InsertAvailability
                      selectedDate={selectedDate}
                      setSelectedDate={setSelectedDate}
                      handleCloseModal={handleCloseModal}
                      setShowModal={setShowModal}
                      setUpdate={props.setUpdate}
                      setLoading={setLoading}
                    />
                  )}
                </div>
              </div>
            </Modal.Body>
          </AdminLoadingOverlay>
        </Modal>
      </div>
    </>
  );
}
