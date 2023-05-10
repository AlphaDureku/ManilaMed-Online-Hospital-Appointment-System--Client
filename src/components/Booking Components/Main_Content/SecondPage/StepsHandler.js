import { Button, Group, Stepper } from "@mantine/core";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { useSearchParams } from "react-router-dom";
import { AppointmentDetailsContext } from "../../../../App";
import BackProceed from "../../../Reusable_Components/Buttons--BackProceed";
import FinalStep from "./Steps/FinalStep";
import StepOne from "./Steps/StepOne";
import StepTwo from "./Steps/StepTwo";
import ConfirmModal from "./Steps/Steps_SubComponents/confirmModal";
import BookingConfirmation from "./Steps/Steps_SubComponents/confirmation";
const moment = require("moment");

export default function StepsHandler(props) {
  const { appointmentDetails, setAppointmentDetails } = useContext(
    AppointmentDetailsContext
  );
  const [modalShow, setModalShow] = useState(false);
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

  const [patientformData, setpatientFormData] = useState({
    firstName: "",
    middleName: "",
    lastName: "",
    gender: "",
    dateOfBirth: "",
    contactNumber: "",
    address: "",
  });

  const [errors, setErrors] = useState({});

  const handleSubmit = (event) => {
    event.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length === 0) {
      // handle form submission
      setAppointmentDetails((prev) => ({
        ...prev,
        patient_info: {
          ...prev.patient_info,
          patient_first_name: patientformData.firstName,
          patient_middle_name: patientformData.middleName,
          patient_last_name: patientformData.lastName,
          gender: patientformData.gender,
          dateOfBirth: patientformData.dateOfBirth,
          contact_number: patientformData.contactNumber,
          address: patientformData.address,
        },
      }));
      nextStep();
    } else {
      setErrors(validationErrors);
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setpatientFormData((prevFormData) => {
      return {
        ...prevFormData,
        [name]: value,
      };
    });
    setErrors((prevErrors) => {
      return {
        ...prevErrors,
        [name]: undefined,
      };
    });
  };

  const validateForm = () => {
    const validationErrors = {};

    if (!patientformData.firstName) {
      validationErrors.firstName = "First Name is required.";
    }
    if (!patientformData.lastName) {
      validationErrors.lastName = "Last Name is required.";
    }
    if (!patientformData.gender) {
      validationErrors.gender = "Gender is required.";
    }
    if (!patientformData.dateOfBirth) {
      validationErrors.dateOfBirth = "Date of Birth is required.";
    }
    if (!patientformData.contactNumber) {
      validationErrors.contactNumber = "Contact Number is required.";
    } else {
      const formattedContactNumber = formatContactNumber(
        patientformData.contactNumber
      );
      if (formattedContactNumber.length === 0) {
        validationErrors.contactNumber = "Invalid mobile number.";
      }
    }

    if (!patientformData.address) {
      validationErrors.address = "Address is required.";
    }

    return validationErrors;
  };

  const formatContactNumber = (value) => {
    let formattedValue = value;

    // Remove non-digit characters from the input
    formattedValue = formattedValue.replace(/\D/g, "");

    // Check if the input is a valid Philippine mobile number
    const isPhilippineMobileNumber = /^(\+?63|0)9\d{9}$/.test(formattedValue);
    if (!isPhilippineMobileNumber) {
      formattedValue = ""; // Set the value to empty if it is not a valid Philippine mobile number
    }

    return formattedValue;
  };

  async function postData(url, data) {
    try {
      const response = await axios.post(url, data);
      return response.data;
    } catch (error) {
      console.error(error);
      throw new Error("Failed to post data.");
    }
  }

  async function submitAppointment() {
    try {
      const url = "/booking/set-appointment";
      const data = {
        appointmentDetails: appointmentDetails,
      };

      const response = await postData(url, data);
      console.log("Appointment submitted successfully:", response);
      setModalShow(false);
    } catch (error) {
      console.error("Failed to submit appointment:", error);
    }
  }

  function openConfirmModal() {
    setModalShow(true);
  }

  function closeConfirmModal() {
    setModalShow(false);
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
              nextStep={nextStep}
            />
          </Stepper.Step>
          <Stepper.Step label="Second step" description="Select Schedule">
            <StepTwo schedule={schedule} />
          </Stepper.Step>
          <Stepper.Step label="Final step" description="Enter Information">
            <FinalStep
              patientformData={patientformData}
              handleInputChange={handleInputChange}
              handleSubmit={handleSubmit}
              validateForm={validateForm}
              errors={errors}
            />
          </Stepper.Step>
          <Stepper.Completed>
            <BookingConfirmation doctors={doctors} />
          </Stepper.Completed>
        </Stepper>

        {active !== 0 && (
          <Group position="center" mt="xl" className="stephandlerbuttonrow m-3">
            <BackProceed
              leftButton={prevStep}
              rightButton={
                active === 2
                  ? handleSubmit
                  : (active === 3 && openConfirmModal) || nextStep
              }
              redButtonText={"Back"}
              blueButtonText={active === 3 ? "Confirm" : "Proceed"}
            />
          </Group>
        )}

        <ConfirmModal
          show={modalShow}
          handleClose={closeConfirmModal}
          submitAppointment={submitAppointment}
        />
      </Container>
    </>
  );
}
