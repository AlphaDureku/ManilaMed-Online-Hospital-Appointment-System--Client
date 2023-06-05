import { Stepper } from "@mantine/core";
import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import BackProceed from "../../../Reusable_Components/Buttons--BackProceed";
import InsertFinalStep from "./InsertSteps/FinalStep";
import InsertStep1 from "./InsertSteps/InsertStep1";
import InsertStep2 from "./InsertSteps/InsertStep2";
import InsertStep3 from "./InsertSteps/InsertStep3";
export const InsertAppointmentContext = createContext();
export default function InsertAppointmentModal(props) {
  const token = localStorage.getItem("nurseToken");
  axios.defaults.withCredentials = true;
  const [active, setActive] = useState(0);
  const [errorEnabled, setErrorEnabled] = useState(false);

  const [insertAppointmentDetails, setInsertAppointmentDetails] = useState({
    schedule_ID: "",
    doctor_ID: "",
    schedule_Date: "",
    recom_Time: "",
    doctor_Name: "",
    doctor_Specialization: "",
    endTime: "",
    patient_info: {
      email: "",
      patient_first_name: "",
      patient_last_name: "",
      middle_name: "",
      contact_number: "",
      address: "",
      dateOfBirth: "",
      gender: "",
    },
  });

  useEffect(() => {
    setInsertAppointmentDetails({
      schedule_ID: "",
      patient_info: {
        email: "",
        patient_first_name: "",
        patient_last_name: "",
        middle_name: "",
        contact_number: "",
        address: "",
        dateOfBirth: "",
        gender: "",
      },
    });
    setActive(0);
  }, [props.openModal]);
  const nextStep = async () => {
    if (active === 1) {
      if (
        insertAppointmentDetails.patient_info.email &&
        insertAppointmentDetails.patient_info.patient_first_name &&
        insertAppointmentDetails.patient_info.patient_last_name &&
        insertAppointmentDetails.patient_info.middle_name &&
        insertAppointmentDetails.patient_info.contact_number &&
        insertAppointmentDetails.patient_info.address &&
        insertAppointmentDetails.patient_info.dateOfBirth &&
        insertAppointmentDetails.patient_info.gender
      ) {
        setActive((current) => (current < 3 ? current + 1 : current));
        setErrorEnabled(false);
        return;
      } else {
        setErrorEnabled(true);
        return;
      }
    } else if (active === 2) {
      const { data } = await axios.post(
        process.env.REACT_APP_ONLINE + "/admin/insertAppointment",
        {
          insertAppointmentDetails: insertAppointmentDetails,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(data);
    } else if (active === 3) {
      props.closeModal();
    }
    setActive((current) => (current < 4 ? current + 1 : current));
    return;
  };

  const prevStep = () =>
    setActive((current) => (current > 0 ? current - 1 : current));

  return (
    <>
      <Modal
        show={props.openModal}
        onHide={props.closeModal}
        centered
        size={active === 0 ? "xl" : "lg"}
      >
        <Modal.Header closeButton>
          <div className="h4 setAvailTitle">Insert Appointment</div>
        </Modal.Header>
        <Modal.Body>
          <div>
            <InsertAppointmentContext.Provider
              value={{ insertAppointmentDetails, setInsertAppointmentDetails }}
            >
              <Stepper
                active={active}
                onStepClick={setActive}
                breakpoint="sm"
                className="stepper"
                radius="lg"
                allowNextStepsSelect={false}
              >
                <Stepper.Step label="First step" description="Select Schedule">
                  <InsertStep1 />
                </Stepper.Step>
                <Stepper.Step
                  label="Second step"
                  description="Enter Patient Information"
                >
                  <InsertStep2
                    errorEnabled={errorEnabled}
                    setErrorEnabled={setErrorEnabled}
                  />
                </Stepper.Step>
                <Stepper.Step label="Confirmation">
                  <InsertStep3 />
                </Stepper.Step>
                <Stepper.Completed>
                  <InsertFinalStep />
                </Stepper.Completed>
              </Stepper>
            </InsertAppointmentContext.Provider>
          </div>
          <div className="Admin--SetButtonRowInsertApp mt-4 ">
            <BackProceed
              isDisabledBlue={!insertAppointmentDetails.schedule_ID}
              disableRed={active === 3 ? true : false}
              leftButton={active === 0 ? props.closeModal : prevStep}
              rightButton={nextStep}
              redButtonText={active === 0 ? "Cancel" : "Back"}
              blueButtonText={
                active === 2 ? "Book " : active === 3 ? "Finish" : "Next"
              }
            />
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}
