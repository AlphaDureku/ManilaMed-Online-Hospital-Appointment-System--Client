import { Button, Pagination } from "@mantine/core";
import { DatePicker } from "@mantine/dates";
import { useDisclosure, useMediaQuery } from "@mantine/hooks";
import { useContext, useEffect, useState } from "react";
import { Col, Modal, Row } from "react-bootstrap";
import { AppointmentDetailsContext } from "../../../App";
import Loading from "./Card--Loading";
const moment = require("moment");
export default function Card(props) {
  const isHomePage = window.location.pathname === "/";

  const { setAppointmentDetails } = useContext(AppointmentDetailsContext);
  const [sortedDoctors, setSortedDoctors] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const isMobile = useMediaQuery("(max-width: 509px)");
  const [displayAllHMO, setDisplayAllHMO] = useState("");
  //CardCount Breakpoint
  const breakPointMobile = useMediaQuery("(max-width: 1000px)");
  let cardsPerPage = 9;
  if (breakPointMobile) {
    cardsPerPage = 3;
  } else {
    cardsPerPage = 9;
  }

  // For modal
  const [openModal, { open, close }] = useDisclosure(false);
  const [selectedDoctorId, setSelectedDoctorId] = useState(null);
  const [modalDoctorName, setModalDoctorName] = useState(null);
  const [modalDoctorSp, setModalDoctorSp] = useState(null);

  // Sort doctors alphabetically by last name
  useEffect(() => {
    const sorted = props.doctors.sort((a, b) =>
      a.doctor_last_name.localeCompare(b.doctor_last_name)
    );
    setSortedDoctors(sorted);
  }, [props.doctors]);

  // Get current cards to display on current page
  const indexOfLastCard = props.currentPage * cardsPerPage;
  const indexOfFirstCard = indexOfLastCard - cardsPerPage;
  const currentCards = sortedDoctors.slice(indexOfFirstCard, indexOfLastCard);

  // Change page
  const paginate = (pageNumber) => props.setCurrentPage(pageNumber);

  const notFound = <div className="notFound">No doctor Found</div>;

  function getHMO(HMOList) {
    const HMOArray = HMOList.split(",");
    const maxItems = window.matchMedia("(max-width: 500px)").matches ? 2 : 2;

    const firstItem = HMOArray[0].trim();
    const showOnlyOne = firstItem.length > 15;

    const visibleItems = showOnlyOne
      ? [HMOArray[0]]
      : HMOArray.slice(0, maxItems);

    return visibleItems.map((item, index) => {
      const trimmedItem = item.trim();
      const isLastItem = index === visibleItems.length - 1;

      return (
        <span key={index}>
          {trimmedItem}
          {!isLastItem && ", "}
        </span>
      );
    });
  }

  function getAssignedSched(doctorID) {
    const schedules = props.schedule
      .filter((sched) => doctorID === sched.doctor_ID)
      .sort((a, b) => new Date(a.date) - new Date(b.date));

    return schedules.slice(0, 3).map((sched, index) => (
      <div className="sched" key={index}>
        {sched.date} | {sched.start} - {sched.end}
      </div>
    ));
  }

  function doctorNameSpSched(doctorID) {
    setSelectedDoctorId(doctorID);
    open();
    const doctor = sortedDoctors.find((doc) => doc.doctor_ID === doctorID);
    setModalDoctorName(
      doctor.doctor_last_name + ", " + doctor.doctor_first_name
    );
    setModalDoctorSp(doctor.specialization);
  }

  function handleDateSelect(date) {
    setSelectedDate(date);
    setAppointmentDetails((prev) => ({
      ...prev,
      schedule_date: moment(date).format("YYYY-MM-DD"),
    }));
    // D ko alam para san to e comment ko muna
    // const schedules = props.schedule.filter((sched) => {
    //   return date.toDateString() === new Date(sched.day).toDateString();
    // });
  }

  const formatDate = (date) => {
    if (!date) return "";
    const options = { year: "numeric", month: "long", day: "numeric" };
    return date.toLocaleDateString("en-US", options);
  };

  // Get individualized schedule for selected doctor
  const selectedDoctorSchedules = props.schedule.filter(
    (sched) => sched.doctor_ID === selectedDoctorId
  );

  function getIndividualizedSchedule() {
    if (selectedDoctorSchedules.length === 0) {
      return <div>No schedule available for this doctor.</div>;
    }

    return selectedDoctorSchedules.map((sched, index) => (
      <div className="sched">{sched.day}</div>
    ));
  }
  //What is the use of this function
  //To display the time of the selected date
  function renderSchedule() {
    if (selectedDoctorSchedules.length === 0) {
      return <div>....</div>;
    }

    const selectedDateSchedules = selectedDoctorSchedules.filter((sched) => {
      return (
        selectedDate &&
        selectedDate.toDateString() === new Date(sched.date).toDateString()
      );
    });

    return selectedDateSchedules.map((sched, index) => (
      <div className="sched" key={index}>
        {sched.start} - {sched.end}
      </div>
    ));
  }

  // Create new getDayProps function to display individualized schedules for selected doctor
  function getDayProps(date) {
    const isScheduled = props.schedule.some((sched) => {
      return (
        date.toDateString() === new Date(sched.date).toDateString() &&
        sched.doctor_ID === selectedDoctorId
      );
    });

    if (date.toDateString() === selectedDate?.toDateString()) {
      return {
        style: {
          backgroundColor: "rgba(34, 208, 52, 1)",
          color: "black",
        },
        label: getIndividualizedSchedule(),
      };
    } else if (isScheduled) {
      return {
        style: {
          backgroundColor: "rgba(34, 208, 52, 0.5)",
          color: "black",
        },
        label: getIndividualizedSchedule(),
      };
    } else {
      return { disabled: true };
    }
  }

  const onSubmit = () => {
    props.schedule.map((item) => {
      if (item.doctor_ID === selectedDoctorId) {
        if (item.date === moment(selectedDate).format("MMM D, YYYY")) {
          setAppointmentDetails((prev) => ({
            ...prev,
            schedule_ID: item.schedule_ID,
          }));
        }
      }

      props.doctors.map((item) => {
        if (item.doctor_ID === selectedDoctorId) {
          setAppointmentDetails((prev) => ({
            ...prev,
            doctor_info: {
              doctor_first_name: item.doctor_first_name,
              doctor_last_name: item.doctor_last_name,
              doctor_specialization: item.specialization,
              doctor_HMO: item.HMO_Name,
            },
          }));
        }
        return null;
      });
      return null;
    });
    props.nextStep();
  };

  // Map each card
  const elem = currentCards.map((items, index) => (
    <div key={index}>
      <div className="doctor-flexbox-container">
        <div className="doctor-flexbox-Info">
          <div className="Lname">{items.doctor_last_name}, </div>
          <div className="Fname">{items.doctor_first_name}</div>
          <div className="HMO_Accreditation">
            <div className="specialization">
              <div className="HMO_Head">Specialization:</div>
              {items.specialization}
            </div>
          </div>
          <div className="HMO_Accreditation">
            <div className="HMO_Head">HMO Accreditation:</div>
            {getHMO(items.HMO_Name)}
            <div className="moreHMOB">...</div>
          </div>
        </div>
        <div className="doctor-flexbox-Avail">
          <div className="header">Availability</div>
          {isMobile ? (
            getAssignedSched(items.doctor_ID).length !== 0 ? (
              <div className="text-center">
                <Button
                  variant="outline"
                  color="teal"
                  radius="md"
                  size="xs"
                  style={{
                    boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
                    color: "#2F9D44",
                    marginTop: "4%",
                    maxWidth: "130px",
                  }}
                  onClick={() => {
                    setSelectedDoctorId(items.doctor_ID);
                    doctorNameSpSched(items.doctor_ID);
                    setDisplayAllHMO(items.HMO_Name);
                    setAppointmentDetails((prev) => ({
                      ...prev,
                      doctor_ID: items.doctor_ID,
                    }));
                    open();
                  }}
                >
                  View Schedule
                </Button>
              </div>
            ) : (
              <div className="noSched">No schedule available</div>
            )
          ) : getAssignedSched(items.doctor_ID).length ? (
            <>
              {getAssignedSched(items.doctor_ID)}
              <div className="text-center">
                <Button
                  variant="outline"
                  color="teal"
                  radius="md"
                  size={isMobile ? "xs" : "sm"}
                  style={{
                    boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
                    color: "#2F9D44",
                    marginTop: "4%",
                    maxWidth: "130px",
                  }}
                  onClick={() => {
                    setSelectedDoctorId(items.doctor_ID);
                    doctorNameSpSched(items.doctor_ID);
                    setDisplayAllHMO(items.HMO_Name);
                    setAppointmentDetails((prev) => ({
                      ...prev,
                      doctor_ID: items.doctor_ID,
                    }));
                    open();
                  }}
                >
                  View Schedule
                </Button>
              </div>
            </>
          ) : (
            <div className="noSched">No schedule available</div>
          )}
        </div>
      </div>
    </div>
  ));

  function formatHMOString(displayAllHMO) {
    const hmoArray = displayAllHMO.split(",");
    const hmoString = hmoArray.join(", ");
    return hmoString;
  }

  //To remove the previously selected date
  useEffect(() => {
    if (!openModal) {
      setSelectedDate(null);
    }
  }, [openModal]);

  // Render
  if (props.loading) {
    return (
      <div className="card-container">
        <Loading />
      </div>
    );
  }
  return (
    <>
      <div className="pagination">
        <Pagination
          mx="auto"
          my="15px"
          size="md"
          total={Math.ceil(sortedDoctors.length / cardsPerPage)}
          value={props.currentPage}
          onChange={paginate}
          siblings={isMobile ? 0 : 2}
        />
      </div>
      <div className="parent-cardC">
        <div className="card-container">
          <div className="grid-container">{elem.length ? elem : notFound}</div>
          {/* Modal */}
          <Modal
            className="modalman"
            show={openModal}
            onHide={close}
            onClose={() => {
              setSelectedDoctorId(null);
              close();
            }}
            centered
            backdrop="static"
          >
            <Modal.Header className="mb-1 " closeButton>
              <Modal.Title className="ms-auto ps-4 modalCalendarHeader">
                Availability
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div className="mb-3">
                <Row>
                  <Col className="text-center ms-3 me-2">
                    <div className="doctornameCalendar">{modalDoctorName}</div>
                    <div className="doctorspCalendar">{modalDoctorSp}</div>{" "}
                    <br></br>
                  </Col>
                  <Col className="text-center ms-2 me-3">
                    <div className="calendarLabel">Selected Schedule: </div>
                    <div className="doctordateCalendar">
                      {" "}
                      {formatDate(selectedDate)}
                    </div>
                    <div className="doctorschedCalendar">
                      {renderSchedule()}
                    </div>
                  </Col>
                </Row>
                <Row className="text-center ms-3 me-3">
                  <div className="hmoAccLabel">HMO Accreditation: </div>

                  <div className="hmoitemsC">
                    {formatHMOString(displayAllHMO)}
                  </div>
                </Row>
              </div>

              <DatePicker
                size={isMobile ? "md" : "lg"}
                data-autofocus={false}
                returnfocus="true"
                value={selectedDate}
                onChange={handleDateSelect}
                withselect="true"
                getDayProps={getDayProps}
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              />
              <Row>
                <Col className=" text-center mt-2">
                  <img
                    src={"/images/lightgreenLegend.png"}
                    alt=""
                    className="img-fluid "
                  ></img>
                  <label className="legendlabelC m-2">Available</label>
                </Col>
                <Col className="text-center mt-2 ">
                  <img
                    src={"/images/greyLegend.png"}
                    alt=""
                    className="img-fluid "
                  ></img>
                  <label className=" legendlabelC m-2">Not Available</label>
                </Col>
              </Row>
            </Modal.Body>
            {selectedDate && !isHomePage && (
              <Modal.Footer>
                <Button
                  radius="xl"
                  size={isMobile ? "xs" : "xs"}
                  style={{
                    boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
                    backgroundColor: "#2F9D44",
                    minWidth: "100px",
                  }}
                  onClick={() => {
                    onSubmit();
                  }}
                >
                  Book Now
                </Button>
              </Modal.Footer>
            )}
          </Modal>
        </div>
      </div>
    </>
  );
}
