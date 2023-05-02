import { Button, Group, Stepper } from "@mantine/core";
import axios from "axios";
import { useEffect, useState } from "react";

import { Container } from "react-bootstrap";
import { useSearchParams } from "react-router-dom";
import Card from "../../../Home Components/Search Doctor/Card";
import BookingForm from "../../../Home Components/Search Doctor/BookingForm";

export default function SecondPage() {
  
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
  const [doctors, setdoctors] = useState([]);
  const [schedule, setSchedule] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectValues, setSelectValues] = useState({
    specialization: [],
    hmo: [],
  });

  const [searchCompleted, setSearchCompleted] = useState(false);
  const [scheduleCompleted, setScheduleCompleted] = useState(false);
  const [infoCompleted, setInfoCompleted] = useState(false);

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
      setSchedule(data.schedule);
      setLoading(false);
    }
    get();
  }, [query]);

  return (
    <>
      <Container fluid className="mt-3">
        <Stepper active={active} onStepClick={setActive} breakpoint="sm" className="stepper" radius="lg">
          <Stepper.Step  label="Fist Step" description="Search Doctor">
            <BookingForm
              query={query}
              setCurrentPage={setCurrentPage}
              setQuery={setQuery}
              selectValues={selectValues}
            />
            {
              <Card
                doctors={doctors}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                schedule={schedule}
                loading={loading}
                // AppointmentDetails={AppointmentDetails}
              />
            }
            <div className="stepFinstruc">View doctor schedule to proceed</div>

          </Stepper.Step>
          <Stepper.Step label="Second step" description="Select Schedule">
          </Stepper.Step>
          <Stepper.Step label="Final step" description="Enter Information">
          </Stepper.Step>
          <Stepper.Completed>
          </Stepper.Completed>
        </Stepper>
        
        {active !== 0 && (
        <Group position="center" mt="xl">
          <Button variant="default" onClick={prevStep}>
            Back
          </Button>
          <Button onClick={nextStep}>Next step</Button>
        </Group>
      )}

      </Container>
    </>
  );
}
