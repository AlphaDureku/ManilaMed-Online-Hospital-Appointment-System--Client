import { Container, Row, Col } from "react-bootstrap";
import { Button, Chip, Group } from "@mantine/core";
import { IconPlus, IconX } from "@tabler/icons-react";
import { useState, useEffect } from "react";

export default function AvailableDocandSec(props) {
  const [originalDoctorData, setOriginalDoctorData] = useState([]);
  const [originalNurses, setOriginalNurses] = useState([]);
  const [selectedOption, setSelectedOption] = useState("1");
  const [sortOption, setSortOption] = useState("1");
  const [sortedDoctorData, setSortedDoctorData] = useState([]);
  const [sortedNursesData, setSortedNursesData] = useState([]);


  useEffect(() => {
    setOriginalDoctorData(props.extractedDoctorData);
    setOriginalNurses(props.extractedNurses);
  }, [props.extractedDoctorData, props.extractedNurses]);

  useEffect(() => {
    if (selectedOption === "1") {
      setSortOption("1"); // Reset sortOption to the initial value
      setSortedDoctorData(props.extractedDoctorData);
      setSortedNursesData(props.extractedNurses);
    } else {
      setSortedDoctorData([]);
    }
  }, [props.extractedDoctorData, props.extractedNurses, selectedOption]);

  useEffect(() => {
    const sortedData = [...originalDoctorData].sort((a, b) => {
      if (sortOption === "1") {
        return 0;
      } else if (sortOption === "2") {
        return a.DLname.localeCompare(b.DLname);
      } else if (sortOption === "3") {
        return b.DLname.localeCompare(a.DLname);
      }
      return 0;
    });

    setSortedDoctorData(sortedData);
  }, [sortOption, originalDoctorData]);

  useEffect(() => {
    const sortedData = [...originalNurses].sort((a, b) => {
      if (sortOption === "1") {
        return 0;
      } else if (sortOption === "2") {
        return a.doctor_Secretary_last_name.localeCompare(b.doctor_Secretary_last_name);
      } else if (sortOption === "3") {
        return b.doctor_Secretary_last_name.localeCompare(a.doctor_Secretary_last_name);
      }
      return 0;
    });

    setSortedNursesData(sortedData);
  }, [sortOption, originalNurses]);

  const handleOptionChange = (e) => {
    const option = e.target.value;
    setSelectedOption(option);
  };

  return (
    <>
      <Container className="mb-2">
        <Row>
          <Col>
            <select className="form-select ms-4 selectObject" onChange={handleOptionChange}>
              <option value="1">Available Doctors</option>
              <option value="2">Available Secretary</option>
            </select>
          </Col>
          <Col>
            <Chip.Group>
              <Group position="center" className="mt-1">
                <Chip
                  color={sortOption === "1" ? "gray" : "gray"}
                  radius="sm"
                  value="1"
                  onClick={() => setSortOption("1")}
                  checked={sortOption === "1"}
                >
                  Recently Added
                </Chip>
                <Chip
                  color={sortOption === "2" ? "gray" : "gray"}
                  radius="sm"
                  value="2"
                  onClick={() => setSortOption("2")}
                >
                  A-Z
                </Chip>
                <Chip
                  color={sortOption === "3" ? "gray" : "gray"}
                  radius="sm"
                  value="3"
                  onClick={() => setSortOption("3")}
                >
                  Z-A
                </Chip>
              </Group>
            </Chip.Group>
          </Col>
        </Row>
      </Container>

      <Container className="availableDoctorandSecList mb-2">
        {selectedOption === "1" ? (
          sortedDoctorData.map((doctor) => (
            <div key={doctor.doctor_ID} className="docandseccontainer mt-2">
              <Row className="docandsecrow">
                <Col className="docandsecContent" style={{ fontSize: "16px", fontWeight: "600" }}>
                  {"Dr."} {doctor.DLname}
                  {", "}
                  {doctor.DFname}
                </Col>
                <Col className="docandsecContent" style={{ alignSelf: "flex-end", display: "flex" }}>
                  <Button
                    variant="default"
                    leftIcon={<IconPlus />}
                    style={{
                      width: "80%",
                      color: "#848484",
                      borderRadius: "5px",
                      fontSize: "16px",
                    }}
                  >
                    ADD PAIR
                  </Button>
                </Col>
                <Col className="" style={{ marginTop: "1%", marginBottom: "1%" }}>
                  <Button
                    variant="default"
                    leftIcon={<IconX />}
                    style={{
                      width: "80%",
                      color: "#848484",
                      borderRadius: "5px",
                      fontSize: "16px",
                    }}
                  >
                    DELETE
                  </Button>
                </Col>
              </Row>
            </div>
          ))
        ) : (
          sortedNursesData.map((nurse) => (
            <div key={nurse.doctor_Secretary_ID} className="docandseccontainer mt-2">
              <Row className="docandsecrow">
                <Col className="docandsecContent" style={{ fontSize: "16px", fontWeight: "600" }}>
                  {nurse.doctor_Secretary_last_name}
                  {", "}
                  {nurse.doctor_Secretary_first_name}
                </Col>
                <Col className="docandsecContent" style={{ alignSelf: "flex-end", display: "flex" }}>
                  <Button
                    variant="default"
                    leftIcon={<IconPlus />}
                    style={{
                      width: "80%",
                      color: "#848484",
                      borderRadius: "5px",
                      fontSize: "16px",
                    }}
                  >
                    EDIT
                  </Button>
                </Col>
                <Col className="" style={{ marginTop: "1%", marginBottom: "1%" }}>
                  <Button
                    variant="default"
                    leftIcon={<IconX />}
                    style={{
                      width: "80%",
                      color: "#848484",
                      borderRadius: "5px",
                      fontSize: "16px",
                    }}
                  >
                    DELETE
                  </Button>
                </Col>
              </Row>
            </div>
          ))
        )}
      </Container>
    </>
  );
}
