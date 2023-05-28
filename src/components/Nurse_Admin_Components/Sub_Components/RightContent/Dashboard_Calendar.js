import { Button } from "@mantine/core";
import { DatePicker } from "@mantine/dates";
import { useMediaQuery } from "@mantine/hooks";
import moment from "moment";
import { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import InsertAvailability from "./insertAvailability";

export default function DashboardCalender(props) {
  const breakPointMobile = useMediaQuery("(max-width: 1200px)");
  const { calendarData } = props;
  const [showModal, setShowModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState();

  const handleDateSelect = (date) => {
    setSelectedDate(date);
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
  
 function handleCloseModal (){
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
          ></DatePicker>
        </div>
        <Modal
          show={showModal}
          onHide={() => setShowModal(false)}
          centered
          size="xl"
        >
          <Modal.Header closeButton>
            <div className="modal-title h4" >
            Set Availability

            </div>
            </Modal.Header>
          <Modal.Body>
            <div className="set-avail-container">
              <div className="admin-calendarModalContainer">
                <DatePicker
                getDayProps={getDayProps}
                onChange={handleDateSelect}
                value={selectedDate}
                size={breakPointMobile ? "xs" : "lg"}
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              ></DatePicker>
              </div>
              <div>
              <InsertAvailability
              selectedDate={selectedDate}
              setSelectedDate={setSelectedDate}
              handleCloseModal={handleCloseModal}/>

              </div>
           
            
            </div>
            
          </Modal.Body>
        </Modal>
      </div>
    </>
  );
}
