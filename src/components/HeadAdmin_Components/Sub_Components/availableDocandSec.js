import { Container, Row, Col } from "react-bootstrap";
import { Button, Chip, Group, TextInput } from "@mantine/core";
import { IconPlus, IconX } from "@tabler/icons-react";
import { useState, useEffect } from "react";
import AddPairModal from "./addpairModal";
import VerificationModal from "./verificationModal";
import { IconSearch } from '@tabler/icons-react';


export default function AvailableDocandSec(props) {
  const [originalDoctorData, setOriginalDoctorData] = useState([]);
  const [originalNurses, setOriginalNurses] = useState([]);
  const [sortedDoctorData, setSortedDoctorData] = useState([]);
  const [sortedNursesData, setSortedNursesData] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState('');
  const [selectedNurse, setSelectedNurse] = useState('');
  const [verifyModal, setVerifyModal] = useState(false);
  const [searchKeyword, setSearchKeyword] = useState('');
  const [selectedOption, setSelectedOption] = useState(() => {
    const savedSelectedOption = localStorage.getItem("selectedOption");
    return savedSelectedOption ? String(savedSelectedOption) : "1";
  });
  const [sortOption, setSortOption] = useState(() => {
    const savedSortOption = localStorage.getItem("sortOption");
    console.log(savedSortOption);
    return savedSortOption ? String(savedSortOption) : "1";
  });


  function handleOpenModal(doctorId, DLname, DFname, nurseId) {
    setSelectedDoctor({ id: doctorId, lname: DLname, fname: DFname });
    setSelectedNurse({ id: nurseId });
    setOpenModal(true);
  }

  function handleCloseModal() {
    setOpenModal(false);
  }

  function handleVerifyModal() {
    setVerifyModal(true);
  }

  function CloseVerifyModal() {
    setVerifyModal(false);
  }

  useEffect(() => {
    setOriginalDoctorData(props.extractedDoctorData);
    setOriginalNurses(props.extractedNurses);
  }, [props.extractedDoctorData, props.extractedNurses]);

  useEffect(() => {
    if (selectedOption === "1") {
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

  const handleDelete = (doctorId) => {
    setSelectedDoctor({ id: doctorId });
    handleVerifyModal();
  };

  const handleSearch = (e) => {
    setSearchKeyword(e.target.value);
  };

  const filterContent = (data) => {
    if (searchKeyword.trim() === "") {
      return data;
    }

    const filteredData = data.filter((item) => {
      const { DLname, DFname, doctor_Secretary_last_name, doctor_Secretary_first_name } = item;

      const fullName = `${DFname} ${DLname}`;
      const nurseFullName = `${doctor_Secretary_first_name} ${doctor_Secretary_last_name}`;

      return (
        fullName.toLowerCase().includes(searchKeyword.toLowerCase()) ||
        nurseFullName.toLowerCase().includes(searchKeyword.toLowerCase())
      );
    });

    return filteredData;
  };

  const filteredDoctorData = filterContent(sortedDoctorData);
  const filteredNursesData = filterContent(sortedNursesData);

  
  const formstyles = {
    input: {
      borderColor: "rgba(0, 0, 0, 0.5);",
      backgroundColor: "rgba(255, 255, 255, 0);",
      "&:focus": {
        borderColor: "#80bdff",
        boxShadow: "0 0 0 0.2rem rgba(0, 123, 255, 0.25)",

      },


    },
  };

  useEffect(() => {
    localStorage.setItem("selectedOption", String(selectedOption));
  }, [selectedOption]);
  
  useEffect(() => {
    localStorage.setItem("sortOption", String(sortOption));
  }, [sortOption]);
  

  return (
    <>

  <div className="headAdmin-UpDownContainer"> 
 

    <div className="headAdmin-upContainer">
    <TextInput
          className="headAdmin-search"
          placeholder="Search"
          value={searchKeyword}
          onChange={handleSearch}
          styles={formstyles}
          style={{width: "100%"}}
          icon={<IconSearch/>}
        />
    </div>

    <div className="headAdmin-downContainer">
      <Container className="mb-1 mt-2 ">
        <Row>
          <Col>
            <select className="form-select ms-4 selectObject" onChange={handleOptionChange} value={selectedOption}>
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
                  checked={sortOption === "1" }
                >
                  Recently Added
                </Chip>
                <Chip
                  color={sortOption === "2" ? "gray" : "gray"}
                  radius="sm"
                  value="2"
                  onClick={() => setSortOption("2")}
                  checked={sortOption === "2"}

                >
                  A-Z
                </Chip>
                <Chip
                  color={sortOption === "3" ? "gray" : "gray"}
                  radius="sm"
                  value="3"
                  onClick={() => setSortOption("3")}
                  checked={sortOption === "3" }

                >
                  Z-A
                </Chip>
              </Group>
            </Chip.Group>
          </Col>
        </Row>
      </Container>

      <div className="availableDoctorandSecList mb-2">
  

        {selectedOption === "1" ? (
          filteredDoctorData.map((doctor) => (
            <div key={doctor.doctor_ID} className="docandseccontainer mt-2 ms-2 me-2">
              <div className="docandsecrow ">
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
                    onClick={() =>
                      handleOpenModal(doctor.doctor_ID, doctor.DFname, doctor.DLname)
                    }
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
                    onClick={() => handleDelete(doctor.doctor_ID)}
                  >
                    DELETE
                  </Button>
                </Col>
              </div>
            </div>
          ))
        ) : (
          filteredNursesData.map((nurse) => (
            <div key={nurse.doctor_Secretary_ID} className="docandseccontainer mt-2 ms-2 me-2">
              <div className="docandsecrow">
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
                    onClick={() => handleDelete(nurse.doctor_Secretary_ID)}
                  >
                    DELETE
                  </Button>
                </Col>
              </div>
            </div>
          ))
        )}

        <AddPairModal
          openModal={openModal}
          handleCloseModal={handleCloseModal}
          doctor={selectedDoctor}
          nurses={props.extractedNurses}
        />

        <VerificationModal
          openModal={verifyModal}
          handleCloseModal={CloseVerifyModal}
          selectedDoctor={selectedDoctor}
          selectedNurse={selectedNurse}
        />
      </div>
      </div>
      </div>
    </>
  );
}

