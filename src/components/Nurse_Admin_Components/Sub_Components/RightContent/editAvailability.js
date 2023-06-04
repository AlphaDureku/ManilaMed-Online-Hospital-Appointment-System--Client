import { ActionIcon, Button, Input, NumberInput, Select } from "@mantine/core";
import { TimeInput } from "@mantine/dates";
import { notifications } from "@mantine/notifications";
import { IconCheck, IconClock } from "@tabler/icons-react";
import axios from "axios";
import moment from "moment";
import React, { useEffect, useRef, useState } from "react";
import BackProceed from "../../../Reusable_Components/Buttons--BackProceed";

export default function EditAvailability(props) {
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [selectedInterval, setSelectedInterval] = useState("");
  const [numberOfPatients, setNumberOfPatients] = useState("");
  const [origstartTime, setorigStartTime] = useState("");
  const [origendTime, setorigEndTime] = useState("");
  const [origselectedInterval, setorigSelectedInterval] = useState("");
  const [orignumberOfPatients, setorigNumberOfPatients] = useState("");

  const EditNotif = () => {
    notifications.show({
      title: "Edit Success!",
      color: "teal",
      autoClose: 2000,
      icon: <IconCheck size="3rem" />,
    });
  };

  const DeleteNotif = () => {
    notifications.show({
      title: "Delete Success!",
      color: "teal",
      autoClose: 2000,
      icon: <IconCheck size="3rem" />,
    });
  };

  const [error, setError] = useState("");
  const [schedID, setSchedID] = useState("");
  const startTimeRef = useRef();
  const endTimeRef = useRef();
  const formattedDate = props.selectedDate
    ? moment(props.selectedDate).format("MM/DD/YYYY")
    : "";
  const formstyles = {
    input: {
      borderColor: "rgba(0, 0, 0, 0.5);",
      "&:focus": {
        borderColor: "#80bdff",
        boxShadow: "0 0 0 0.2rem rgba(0, 123, 255, 0.25)",
      },
    },
  };
  const selectedFormattedDate = moment(props.selectedDate).format("YYYY-MM-DD");

  const selectedDateData = props.updateDates.find(
    (dateData) => dateData.date === selectedFormattedDate
  );

  useEffect(() => {
    if (selectedDateData) {
      // Set the form values based on the availability data
      setStartTime(selectedDateData.start);
      setEndTime(selectedDateData.end);
      setSelectedInterval(selectedDateData.timeInterval);
      setNumberOfPatients(selectedDateData.maxPatient);
      setorigStartTime(selectedDateData.start);
      setorigEndTime(selectedDateData.end);
      setorigSelectedInterval(selectedDateData.timeInterval);
      setorigNumberOfPatients(selectedDateData.maxPatient);
      setSchedID(selectedDateData.schedule_ID);
    } else {
      // Reset the form values
      setStartTime("");
      setEndTime("");
      setSelectedInterval("");
      setNumberOfPatients("");
      setorigStartTime("");
      setorigEndTime("");
      setorigSelectedInterval("");
      setorigNumberOfPatients("");
      setSchedID("");
    }
  }, [props.selectedDate]);

  const handleDateChange = (event) => {
    props.setSelectedDate(event.target.value);
  };

  const handleStartTimeChange = (event) => {
    setStartTime(event.target.value);
  };

  const handleEndTimeChange = (event) => {
    setEndTime(event.target.value);
  };

  const handleIntervalChange = (value) => {
    setSelectedInterval(value);
    console.log(selectedInterval);
  };

  const handleSubmit = async () => {
    try {
      setError(""); // Clear any previous errors
      const token = localStorage.getItem("nurseToken");

      if (
        startTime === origstartTime &&
        endTime === origendTime &&
        selectedInterval === origselectedInterval &&
        numberOfPatients === orignumberOfPatients
      ) {
        setError("No changes");
      } else if (
        formattedDate &&
        startTime &&
        endTime &&
        selectedInterval &&
        numberOfPatients
      ) {
        const start = moment(startTime, "hh:mm A");
        const end = moment(endTime, "hh:mm A");
        const duration = moment.duration(end.diff(start));

        const [hours, minutes] = selectedInterval.split(":");
        const intervalMinutes = parseInt(hours) * 60 + parseInt(minutes);

        if (intervalMinutes >= 30 && duration.asMinutes() >= intervalMinutes) {
          const postData = {
            schedule_ID: schedID,
            startTime: moment(startTime, "hh:mm A").format("HH:mm:ss"),
            endTime: moment(endTime, "hh:mm A").format("HH:mm:ss"),
            intervalTime: selectedInterval,
            maxPatient: numberOfPatients.toString(),
          };

          props.setLoading(true);
          const response = await axios.post(
            process.env.REACT_APP_ONLINE + "/admin/update-availability",
            postData,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          console.log(response);

          if (response.data.success === true) {
            console.log("Availability edit successfully");
            EditNotif();
            handleCloseModal();
            props.setUpdate((prev) => !prev);
            props.setLoading(false);

            // Reset the form or perform any other necessary actions
          } else {
            console.error("Failed to edit availability");
            setError("Network error");
          }
        } else {
          console.error(
            "The interval time should be at least the allotted time"
          );
          setError(
            "Availability schedule should be at least the allotted time"
          );
          setNumberOfPatients("");
        }
      } else if (
        !formattedDate ||
        !startTime ||
        !endTime ||
        !selectedInterval ||
        !numberOfPatients
      ) {
        console.error("Please fill all the required fields");
        setError("Please fill all the fields");
      }
    } catch (error) {
      setError("Network error");
      console.error("Failed to edit availability:", error);
    }
  };

  const handleDelete = async () => {
    try {
      setError(""); // Clear any previous errors
      const token = localStorage.getItem("nurseToken");

      const postData = {
        schedule_ID: schedID,
      };

      console.log(postData);
      const response = await axios.post(
        process.env.REACT_APP_ONLINE + "/admin/delete-availability",
        postData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log(response);
      if (response.data.success === true) {
        console.log("Availability delete successful");
        props.setUpdate((prev) => !prev);
        handleCloseModal();
        props.setSelectedDate(null);
      } else {
        console.error("Failed to delete availability");
        setError("Network error");
      }
    } catch (error) {
      setError("Network error");
      console.error("Failed to delete availability:", error);
    }
  };

  function handleCloseModal() {
    props.setShowModal(false);
    setStartTime("");
    setEndTime("");
    setSelectedInterval("");
    setNumberOfPatients("");
    setorigStartTime("");
    setorigEndTime("");
    setorigSelectedInterval("");
    setorigNumberOfPatients("");
    setSchedID("");
    props.setLoading(false);
    props.setIsUpdated(false);
  }

  const selectOptions = [
    {
      value: "00:30:00",
      label: "30 minutes",
    },
    {
      value: "00:45:00",
      label: "45 minutes",
    },
    {
      value: "01:00:00",
      label: "1 hour",
    },
    {
      value: "01:15:00",
      label: "1 hour 15 minutes",
    },
    {
      value: "01:30:00",
      label: "1 hour 30 minutes",
    },
    {
      value: "01:45:00",
      label: "1 hour 45 minutes",
    },
    {
      value: "02:00:00",
      label: "2 hours",
    },
  ];

  return (
    <>
      <div className="">
        <div>
          <p className="setavail-tagtitle mt-2 ms-1">Clinic Hours</p>
          <p className="setavail-juniortag ms-1">
            Set the date and time according to the doctor's availability
          </p>
        </div>
        <div className="ms-4 insert-row">
          <div className="space1">
            <p className="setavail-tagjunior">Selected Date</p>
          </div>
          <div style={{ width: "105px" }}>
            <Input
              styles={formstyles}
              value={formattedDate}
              onChange={handleDateChange}
              readOnly
            />
          </div>
        </div>
        <div className="ms-4 ">
          <p className="setavail-tagjunior">Time Interval: </p>
        </div>
        <div className="ms-5 insert-row">
          <div className="space2">
            <p className="setavail-tagjunior">Per Patient</p>
          </div>
          <div style={{ width: "175px" }}>
            <Select
              data={selectOptions}
              value={selectedInterval}
              styles={formstyles}
              searchable
              clearable
              onChange={handleIntervalChange}
              placeholder="Select Interval"
            />
          </div>
        </div>
        <div className="ms-4">
          <p className="setavail-tagjunior">Selected Time: </p>
        </div>
        <div className="ms-5">
          <div className="insert-row">
            <div className="space3">
              <p className="setavail-tagjunior">FROM: </p>
            </div>
            <div>
              <TimeInput
                ref={startTimeRef}
                rightSection={
                  <ActionIcon onClick={() => startTimeRef.current.showPicker()}>
                    <IconClock size="1rem" stroke={1.5} />
                  </ActionIcon>
                }
                styles={formstyles}
                value={startTime}
                onChange={handleStartTimeChange}
              />
            </div>
          </div>
          <div className="mt-2 insert-row">
            <div className="space4">
              <p className="setavail-tagjunior">TO: </p>
            </div>
            <div>
              <TimeInput
                ref={endTimeRef}
                rightSection={
                  <ActionIcon onClick={() => endTimeRef.current.showPicker()}>
                    <IconClock size="1rem" stroke={1.5} />
                  </ActionIcon>
                }
                styles={formstyles}
                value={endTime}
                onChange={handleEndTimeChange}
              />
            </div>
          </div>
        </div>
        <hr />
        <div>
          <p className="setavail-tagtitle mt-2 ms-1">No. of Patients</p>
          <p className="setavail-juniortag ms-1">
            Set the maximum number of patients
          </p>
        </div>
        <div className="ms-4 insert-row">
          <div className="space5">
            <p className="setavail-tagjunior ms-1">No. of Patients</p>
          </div>
          <div style={{ width: "90px" }}>
            <NumberInput
              styles={formstyles}
              value={numberOfPatients >= 0 ? numberOfPatients : ""}
              min={1}
              onChange={(value) => {
                setNumberOfPatients(value);
              }}
            />
          </div>
        </div>
        <div className="insert-errormsg mt-3">
          {error && <div>{error}</div>}
        </div>
      </div>
      <div className="Admin--SetButtonRow mt-3">
        <Button
          style={{
            boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
            backgroundColor: "red",
          }}
          onClick={props.handleCloseModal}
        >
          Cancel
        </Button>

        <BackProceed
          leftButton={handleDelete}
          backColor="green"
          rightButton={handleSubmit}
          redButtonText={"Delete "}
          blueButtonText={"Set"}
        />
      </div>
    </>
  );
}
