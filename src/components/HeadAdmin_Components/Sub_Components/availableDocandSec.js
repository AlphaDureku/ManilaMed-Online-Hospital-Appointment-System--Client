import { Container, Row, Col } from "react-bootstrap";
import { Button } from "@mantine/core";
import { IconPlus, IconXboxA } from '@tabler/icons-react';
import { DashboardContext } from "../Main_Content/Dashboard";
import { useContext } from "react";
import { IconX } from '@tabler/icons-react';

export default function AvailableDocandSec() {
  const dashboardData = useContext(DashboardContext);
  const doctorsWithoutSec = dashboardData?.dashboardData?.data?.DoctorsWithoutNurses || [];

  const extractedDoctorData = doctorsWithoutSec.map(doctor => {
    let { DFname, DLname, doctor_ID } = doctor;
    const firstNameParts = DFname.split(' ');
    const capitalizedFirstName = firstNameParts
      .map(part => part.charAt(0).toUpperCase() + part.slice(1).toLowerCase())
      .join(' ');
    DLname = DLname.charAt(0).toUpperCase() + DLname.slice(1).toLowerCase();
    return { DFname: capitalizedFirstName, DLname, doctor_ID };
  });
  

  return (
    <>
      <Container className="mb-2">
        <select className="form-select ms-4 selectObject">
          <option defaultValue value="1">Available Doctors</option>
          <option value="2">Available Secretary</option>
        </select>
      </Container>

      <Container className="availableDoctorList">
        {extractedDoctorData.map(doctor => (
          <div key={doctor.doctor_ID} className="docandseccontainer mt-2">
            <Row className="docandsecrow">
              <Col className="docandsecContent" style={{ fontSize: "16px", fontWeight: '600' }}>
                Dr. {doctor.DFname} {doctor.DLname}
              </Col>
              <Col className="docandsecContent" style={{ alignSelf: "flex-end", display: "flex" }}>
                <Button variant="default" leftIcon={<IconPlus />} style={{
                  width: "80%",
                  color: "#848484",
                  borderRadius: "5px",
                  fontSize: "16px"
                }}>
                  ADD PAIR
                </Button>
              </Col>
              <Col className="" style={{ marginTop: "1%", marginBottom: "1%" }}>
                <Button variant="default" leftIcon={<IconX />} style={{
                  width: "80%",
                  color: "#848484",
                  borderRadius: "5px",
                  fontSize: "16px"
                }}>
                  DELETE
                </Button>
              </Col>
            </Row>
          </div>
        ))}
      </Container>
    </>
  );
}
