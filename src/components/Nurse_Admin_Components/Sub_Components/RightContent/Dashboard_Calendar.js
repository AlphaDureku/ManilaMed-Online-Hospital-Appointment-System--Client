import { Button, SegmentedControl  } from "@mantine/core";
import { DatePicker } from "@mantine/dates";
import { useMediaQuery } from "@mantine/hooks";
import moment from "moment";
import {  useState } from "react";
import Modal from "react-bootstrap/Modal";
import InsertAvailability from "./insertAvailability";
import EditAvailability from "./editAvailability";

export default function DashboardCalender(props) {
  const breakPointMobile = useMediaQuery("(max-width: 1200px)");
  const { calendarData } = props;
  const [showModal, setShowModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState();
  const {updateDataCalendar} = props;
  const [isUpdated, setIsUpdated] = useState(false);


  const updateDates = updateDataCalendar.map((item)=> {
    const {date, doctor_ID, end, maxPatient, start, timeInterval, schedule_ID} = item;
    return {date, doctor_ID, end, maxPatient, start, timeInterval, timeInterval, schedule_ID};
  })

  


  const handleDateSelect = (date) => {
    setSelectedDate(date);

  };

  const getDayPropsUpdate = (date) => {
    const formattedDate = moment(date).format("YYYY-MM-DD");
    const currentDate = moment().format("YYYY-MM-DD");
    const datesArray = updateDates.map((item) => item.date);
    const selectedFormattedDate = moment(selectedDate).format("YYYY-MM-DD");

  
    if (formattedDate < currentDate) {
      return {
        disabled: true,
      };
    }

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
    const currentDate = moment().format("YYYY-MM-DD");

    if (formattedDate < currentDate) {
      return {
        disabled: true,
      };
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
        
        <div>
          
          <DatePicker
            getDayProps={getDayProps}
            size={breakPointMobile ? "xs" : "lg"}
            onChange={handleDateSelect}
            value={selectedDate}
          ></DatePicker>
        </div>
        <Modal
          show={showModal}
          onHide={handleCloseModal}
          centered
          size="xl"
        >
          <Modal.Header closeButton>
            <div className="modal-title h4">Set Availability</div>
          </Modal.Header>
          <Modal.Body>
            <div className="set-avail-container">
              <div className="admin-calendarModalContainer">
           
              <div className="setlegendrow">
              <div style={{ color: "#2f9d44", fontWeight: "600" }} className="ms-3">
                <img
                  src="/images/lightgreenLegend.png"
                  alt=""
                  className="legend"
                ></img>
                With Availability
              </div>
              <div style={{ color: "#434343", fontWeight: "600" }} className="ms-5">
                {" "}
                <img src="/images/whitec.png" alt="" className="legend"></img>No
                Availability
              </div>
              </div>
                <DatePicker
                allowDeselect
                getDayProps={isUpdated ? getDayPropsUpdate : getDayProps}

                  onChange={handleDateSelect}
                  value={selectedDate}
                  size={breakPointMobile ? "xs" : "lg"}
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                ></DatePicker>
                      <div className="Admin--SetButtonRowSecond mt-3 ">
                      <SegmentedControl
                      data={[
                        { label: 'Set', value: 'Set' },
                        { label: 'Update', value: 'Update' },
                      ]}
                      onChange={(value) => {
                        if (value === 'Update') {
                          setIsUpdated(true);
                        } else if (value === 'Set') {
                          setIsUpdated(false);
                        }
                        setSelectedDate(null);
                      }}
                    />
                    
                   
                
                 </div>
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
                  
                />
              ) : (
                <InsertAvailability
                  selectedDate={selectedDate}
                  setSelectedDate={setSelectedDate}
                  handleCloseModal={handleCloseModal}
                  setShowModal={setShowModal}
                  setUpdate={props.setUpdate}
                />
              )}
              </div>
              
          
            </div>
          </Modal.Body>
        </Modal>
      </div>
    </>
  );
}
