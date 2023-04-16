import Loading from "./Card--Loading";
import { useMediaQuery } from "@mantine/hooks";
import { useState, useEffect } from "react";
import { Pagination, Modal, Center } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { DatePicker } from "@mantine/dates";

export default function Card(props) {
  const [sortedDoctors, setSortedDoctors] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [setSelectedSchedule] = useState([]);

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

  // NotFound
  const notFound = <div className="notFound">No doctor Found!</div>;

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

  function getHMO(HMOList) {
    const newList = HMOList.split(", ");
    return newList.map((items) => {
      return (
        <>
          {items} <br></br>
        </>
      );
    });
  }

  // Individualize Schedule
  function getAssignedSched(doctorID) {
    const schedules = props.schedule.filter(
      (sched) => doctorID === sched.doctor_ID
    );
    return schedules.slice(0, 3).map((sched, index) => (
      <div className="sched" key={index}>
        {sched.day} | {sched.start} - {sched.end}
      </div>
    ));
  }

  function handleDateSelect(date) {
    setSelectedDate(date);

    // Get schedule for selected date
    const schedules = props.schedule.filter((sched) => {
      return date.toDateString() === new Date(sched.day).toDateString();
    });

    setSelectedSchedule(schedules);
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
      <div className="sched" key={index}>
        {sched.day}
      </div>
    ));
  }

  //To display the time of the selected date
  function renderSchedule() {
    if (selectedDoctorSchedules.length === 0) {
      return <div>....</div>;
    }

    const selectedDateSchedules = selectedDoctorSchedules.filter((sched) => {
      return (
        selectedDate &&
        selectedDate.toDateString() === new Date(sched.day).toDateString()
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
        date.toDateString() === new Date(sched.day).toDateString() &&
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
          </div>
        </div>
        <div className="doctor-flexbox-Avail">
          <div className="header">Availability</div>
          {getAssignedSched(items.doctor_ID).length ? (
            <>
              {getAssignedSched(items.doctor_ID)}
              <div
                className="moreSchedB"
                onClick={() => {
                  // Set the selected doctorId to display their individualized schedule
                  setSelectedDoctorId(items.doctor_ID);
                  // Open the modal
                  open();
                }}
              >
                View more
              </div>
            </>
          ) : (
            <div className="noSched">No schedule available</div>
          )}
        </div>
      </div>
    </div>
  ));

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
          siblings={2}
          style={{}}
        />
      </div>
      <div className="parent-cardC">
        <div className="card-container">
          <div className="grid-container">{elem.length ? elem : notFound}</div>
          {/* Modal */}
          <Modal
            className="modalman"
            opened={openModal}
            onClose={() => {
              setSelectedDoctorId(null);
              close();
            }}
            title="Availability"
            centered
          >
            <DatePicker
              size="lg"
              data-autoFocus={false}
              returnFocus
              value={selectedDate}
              onChange={handleDateSelect}
              withSelect
              getDayProps={getDayProps}
              style={{
                border: "1px solid #848484",
                borderRadius: "7px",
                margin: "1vw",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            />
            <div>{formatDate(selectedDate)}</div>
            {renderSchedule()}
          </Modal>
        </div>
      </div>
    </>
  );
}
