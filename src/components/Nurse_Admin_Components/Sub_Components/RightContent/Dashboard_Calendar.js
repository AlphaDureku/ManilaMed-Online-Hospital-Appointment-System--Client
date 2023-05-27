import { Button } from "@mantine/core";
import { DatePicker } from "@mantine/dates";
import { useMediaQuery } from "@mantine/hooks";
import moment from "moment";
import { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";

export default function DashboardCalender(props) {
  const breakPointMobile = useMediaQuery("(max-width: 1200px)");
  const { calendarData } = props;
  const [showModal, setShowModal] = useState(false);

  const getDayProps = (date) => {
    const formattedDate = moment(date).format("YYYY-MM-DD");
    if (
      calendarData.some((item) => item !== null && item.date2 === formattedDate)
    ) {
      return {
        style: {
          backgroundColor: "rgba(34, 208, 52, 0.5)",
          color: "black",
        },
      };
    }
    return {
      disabled: false,
    };
  };
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
            // onChange={handleDateSelect}
            // value={selectedDate}
            size={breakPointMobile ? "xs" : "lg"}
          ></DatePicker>
        </div>
        <Modal
          show={showModal}
          onHide={() => setShowModal(false)}
          centered
          size="xl"
        >
          <Modal.Header closeButton>Set Availability</Modal.Header>
          <Modal.Body>
            <DatePicker
              getDayProps={getDayProps}
              // onChange={handleDateSelect}
              // value={selectedDate}
              size={breakPointMobile ? "xs" : "lg"}
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            ></DatePicker>
          </Modal.Body>
        </Modal>
      </div>
    </>
  );
}
