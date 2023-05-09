import { Button, Group, Stepper } from "@mantine/core";
import axios from "axios";
import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { useSearchParams } from "react-router-dom";
import FinalStep from "./Steps/FinalStep";
import GetPatientInfo from "./Steps/Steps_SubComponents/getPatientInfo";
import StepOne from "./Steps/StepOne";
import StepTwo from "./Steps/StepTwo";
import BackProceed from "../../../Reusable_Components/Buttons--BackProceed";
import BookingConfirmation from "./Steps/Steps_SubComponents/confirmation";
const moment = require("moment");

export default function StepsHandler(props) {
  const [active, setActive] = useState(0);
  const nextStep = () =>
    setActive((current) => (current < 3 ? current + 1 : current));
  const prevStep = () =>
    setActive((current) => (current > 0 ? current - 1 : current));
  const [query, setQuery] = useSearchParams({
    Fname: "",
    Lname: "",
    specialization: "",
    HMO: "",
  });
  //Code tip: try learning useReducer hook to get rid of this messy useState hook and improve efficiency here's a great 14 min tutorial: https://www.youtube.com/watch?v=RZPAQV7JvNU&t=627s&ab_channel=LamaDev
  const [doctors, setdoctors] = useState([]);
  const [schedule, setSchedule] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectValues, setSelectValues] = useState({
    specialization: [],
    hmo: [],
  });

  // const [searchCompleted, setSearchCompleted] = useState(false);
  // const [scheduleCompleted, setScheduleCompleted] = useState(false);
  // const [infoCompleted, setInfoCompleted] = useState(false);

  // const [AppointmentDetails, setAppointmentDetails] = useState({
  //   doctor_ID: "sdasdf",
  //   appointment_ID: "",
  //   patientInfo: { firstName: "", lastName: "" },
  // });

  //Initialize Specialization and HMO list
  useEffect(() => {
    document.title = "Home";
    async function get() {
      const res = await axios.get("/initialize");
      const { data } = res.data;
      setSelectValues({ specialization: data.specialization, hmo: data.hmo });
    }
    get();
  }, []);
  //Update Seach Query
  useEffect(() => {
    async function get() {
      setLoading(true);
      const res = await axios.get(
        `/doctors/search/?Fname=${query.get("Fname")}&Lname=${query.get(
          "Lname"
        )}&specialization=${query.get("specialization")}&HMO=${query.get(
          "HMO"
        )}`
      );
      const { data } = res.data;
      setdoctors(data.result);
      filterSchedule(data.schedule);
      setLoading(false);
    }
    get();
  }, [query]);

  const filterSchedule = (sched) => {
    const filteredSchedule = sched.filter((obj) => {
      // Combine date and time strings into a single string
      const dateTimeString = obj.date + " " + obj.start;

      // Parse the date and time string into a Moment.js object
      const dateTime = moment(dateTimeString, "MMMM D, YYYY h:mmA");

      // Get the current time and subtract 1 hour
      const currentTime = moment().add(1, "hours");

      // Check if the dateTime is greater than the currentTime
      return dateTime.isAfter(currentTime);
    });
    setSchedule(filteredSchedule);
    return;
  };


  const [patientFirstName, setPatientFirstName] = useState('');
  const [patientLastName, setPatientLastName] = useState('');
  const [patientMiddleName, setPatientMiddleName] = useState('');
  const [patientPhone, setPatientPhone] = useState('');
  const [patientAddress, setPatientAddress] = useState('');
  const [patientGender, setPatientGender] = useState('');
  const [patientDOB, setPatientDOB] = useState('');

  function handleFormSubmit(event) {
    event.preventDefault();
    if (validateForm()) {
      props.setAppointmentDetails((prev) => ({
        ...prev,
        patient_first_name: patientFirstName,
        patient_middle_name: patientMiddleName,
        patient_last_name: patientLastName,
        contact_number: patientPhone,
        birthDate: patientDOB,
        address: patientAddress,
        gender: patientGender
  
  
      }));


    }
 
  }

  function handleInputChange(event) {
    const { name, value } = event.target;
    switch (name) {
      case "patientFirstName":
        setPatientFirstName(value);
        break;
      case "patientLastName":
        setPatientLastName(value);
        break;
      case "patientMiddleName":
        setPatientMiddleName(value);
        break;
      case "patientAddress":
        setPatientAddress(value);
        break;
      case "patientGender":
        setPatientGender(value);
        break;
      case "patientDOB":
        setPatientDOB(value);
        break;
      case "patientPhone":
        setPatientPhone(value);
        break;
      default:
        break;
    }
  }

  function validateForm() {
    const requiredFields = [
      patientFirstName,
      patientLastName,
      patientAddress,
      patientGender,
      patientDOB,
      patientPhone,
    ];
    if (requiredFields.some((field) => field === "")) {
      alert("Please fill out all required fields");
      return false;
    }
    if (!patientPhone.match(/^(09|\+639)\d{9}$/)) {
      alert("Please enter a valid phone number");
      return false;
    }
    return true;
  }

  //Moved steps to Steps folder and converted them into seperate components
  return (
    <>
      <Container fluid className="mt-3 ">
        <Stepper
          active={active}
          onStepClick={setActive}
          breakpoint="sm"
          className="stepper"
          radius="lg"
          allowNextStepsSelect={false}
        >
          <Stepper.Step label="Fist Step" description="Search Doctor">
            <StepOne
              query={query}
              setQuery={setQuery}
              selectValues={selectValues}
              doctors={doctors}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              schedule={schedule}
              loading={loading}
              appointmentDetails={props.appointmentDetails}
              setAppointmentDetails={props.setAppointmentDetails}
              nextStep={nextStep}
            />
          </Stepper.Step>
          <Stepper.Step label="Second step" description="Select Schedule">
            <StepTwo
              schedule={schedule}
              appointmentDetails={props.appointmentDetails}
              setAppointmentDetails={props.setAppointmentDetails}
            />
          </Stepper.Step>
          <Stepper.Step label="Final step" description="Enter Information">
            <GetPatientInfo
             handleFormSubmit={handleFormSubmit}
             handleInputChange={handleInputChange}
             patientFirstName={patientFirstName}
             patientLastName={patientLastName}
             patientMiddleName={patientMiddleName}
             patientPhone={patientPhone}
             patientAddress={patientAddress}
             patientGender={patientGender}
             patientDOB={patientDOB}

             />
          </Stepper.Step>
          <Stepper.Completed>
          <BookingConfirmation
           appointmentDetails={props.appointmentDetails}
                        />
          </Stepper.Completed>
        </Stepper>

        {active !== 0 && (
          <Group position="center" mt="xl" className="stephandlerbuttonrow m-3">
           <BackProceed
          leftButton={prevStep}
          rightButton={nextStep}
          redButtonText={"Back"}
          blueButtonText={"Proceed"}
        />
          </Group>
        )}
      </Container>
    </>
  );
}
