import { Container, Row, Col } from "react-bootstrap";
import { Button, Chip, Group, TextInput } from "@mantine/core";
import { IconPlus, IconX, IconSearch, IconEdit } from "@tabler/icons-react";
import { useState, useEffect } from "react";
import AddPairModal from "./addpairModal";
import DeleteDoctorVerificationModal from "./deleteDoctorVerificationModal";
import DeleteSecVerificationModal from "./deleteSecVerify";
import EditSecInfo from "./editSecInfo";
import RequestLoadingSkeleton from "./RequestLoadingSkeleton";
import { useMediaQuery } from "@mantine/hooks";

export default function AvailableDocandSec(props) {
  const [originalDoctorData, setOriginalDoctorData] = useState([]);
  const [originalNurses, setOriginalNurses] = useState([]);
  const [sortedDoctorData, setSortedDoctorData] = useState([]);
  const [sortedNursesData, setSortedNursesData] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState('');
  const [selectedNurse, setSelectedNurse] = useState('');
  const [docVerifyModal, setDocVerifyModal] = useState(false);
  const [secVerifyModal, setSecVerifyModal] = useState(false);
  const [secEditModal, setSecEditModal] = useState(false);
  const [searchKeyword, setSearchKeyword] = useState('');
  const [selectedOption, setSelectedOption] = useState(() => {
    const savedSelectedOption = localStorage.getItem("selectedOption");
    return savedSelectedOption ? String(savedSelectedOption) : "1";
  });
  const [sortOption, setSortOption] = useState(() => {
    const savedSortOption = localStorage.getItem("sortOption");
    return savedSortOption ? String(savedSortOption) : "1";
  });
  const [loading, setLoading] = useState(false);
  const breakPointMobile = useMediaQuery("(max-width: 650px)");




  function handleOpenModal(doctorId, DLname, DFname) {
    setSelectedDoctor({ id: doctorId, lname: DLname, fname: DFname });
    setOpenModal(true);
  }


  function handleCloseModal() {
    setOpenModal(false);
  }

  function handleDocVerifyModal(doctorId) {
    setSelectedDoctor({ id: doctorId });
    setDocVerifyModal(true);
  }

  function CloseDocVerifyModal() {
    setDocVerifyModal(false);
  }

  function handleSecVerifyModal(nurseId) {
    setSelectedNurse({ id: nurseId });
    setSecVerifyModal(true);
  }

  function CloseSecVerifyModal() {
    setSecVerifyModal(false);
  }

  function editSecModal(nurseId) {
    setSelectedNurse({ id: nurseId });
    setSecEditModal(true);
  }

  function closeEditSecModal() {
    setSecEditModal(false);
  }

  useEffect(() => {
    setLoading(true);
    setOriginalDoctorData(props.extractedDoctorData);
    setOriginalNurses(props.extractedNurses);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
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




  const handleSearch = (e) => {
    setSearchKeyword(e.target.value);
  };

  const filterContent = (data) => {
    if (searchKeyword.trim() === "") {
      return data;
    }

    const filteredData = data.filter((item) => {
      const { DLname, DFname, doctor_Secretary_last_name, doctor_Secretary_first_name } = item;

      const fullName = `${DFname}  ${DLname}`;
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
      borderColor: "#24B7E9",
      backgroundColor: "rgba(255, 255, 255, 0.9);",
      "&:focus": {
        borderColor: "#80bdff",
        boxShadow: "0 0 0 0.2rem rgba(0, 123, 255, 0.25)",

      },
      borderRadius: "10px",


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
      <Container className="mb-1 mt-2 headdashboard-filter">
        <Row>
          <Col className="headdashboard-filter">
            <select className="form-select  selectObject" onChange={handleOptionChange} value={selectedOption}>
              <option value="1">Available Doctors</option>
              <option value="2">Available Secretary</option>
            </select>
          </Col>
          <Col className="headdashboard-filter">
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
  {loading ? (
    <RequestLoadingSkeleton />
  ) : (
    <div>
      {selectedOption === "1" ? (
        <>
          {filteredDoctorData.map((doctor) => (
            <div key={doctor.doctor_ID} className="docandseccontainer mt-2 ms-2 me-2">
              <div className="docandsecrow ">
                <Col className="docandsecContent mt-2 mb-2" >
                  {"Dr."} {doctor.DLname}
                  {", "}
                  {doctor.DFname}
                </Col>
                <Col className="docandsecContent" style={{ alignSelf: "flex-end", display: "flex" }}>
                  <Button
                    variant="default"
                    leftIcon={!breakPointMobile ? <IconPlus /> : null}
                    style={{
                      width: "90%",
                      color: "#848484",
                      borderRadius: "5px",
                      fontSize: "min(1rem, 3.5vw)",
                      boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)"

                    }}
                    onClick={() => handleOpenModal(doctor.doctor_ID, doctor.DFname, doctor.DLname)}
                  >
                    
                    {breakPointMobile ? "PAIR" : "ADD PAIR"}
                  </Button>
                </Col>
                <Col className="" style={{ marginTop: "1%", marginBottom: "1%" }}>
                  <Button
                    variant="default"
                    leftIcon={!breakPointMobile ? <IconX /> : null}
                    style={{
                      width: "90%",
                      color: "#848484",
                      borderRadius: "5px",
                      fontSize: "min(1rem, 3.5vw)",
                      boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)"

                    }}
                    onClick={() => handleDocVerifyModal(doctor.doctor_ID)}
                  >
                    DELETE
                  </Button>
                </Col>
              </div>
            </div>
          ))}
          {filteredDoctorData.length === 0 && <div className="noDocSecCard ms-2 mt-2 me-2">No available doctor</div>}
        </>
      ) : (
        <>
          {filteredNursesData.length > 0 ? (
            filteredNursesData.map((nurse) => (
              <div key={nurse.doctor_Secretary_ID} className="docandseccontainer mt-2 ms-2 me-2">
                <div className="docandsecrow">
                  <Col className="docandsecContent" >
                    {nurse.doctor_Secretary_last_name}
                    {", "}
                    {nurse.doctor_Secretary_first_name}
                  </Col>
                  <Col className="docandsecContent" style={{ alignSelf: "flex-end", display: "flex" }}>
                    <Button
                      variant="default"
                      leftIcon={!breakPointMobile ? <IconEdit /> : null}
                      style={{
                        width: "90%",
                        color: "#848484",
                        borderRadius: "5px",
                        boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
                        fontSize: "min(1rem, 3.5vw)",


                      }}
                      onClick={() => editSecModal(nurse.doctor_Secretary_ID)}
                    >
                      EDIT
                    </Button>
                  </Col>
                  <Col className="" style={{ marginTop: "1%", marginBottom: "1%" }}>
                    <Button
                      variant="default"
                      leftIcon={!breakPointMobile ? <IconX /> : null}
                      style={{
                        width: "90%",
                        color: "#848484",
                        borderRadius: "5px",
                        boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
                        fontSize: "min(1rem, 3.5vw)",


                      }}
                      onClick={() => handleSecVerifyModal(nurse.doctor_Secretary_ID)}
                    >
                      DELETE
                    </Button>
                  </Col>
                </div>
              </div>
            ))
          ) : (
            <div className="noDocSecCard ms-2 mt-2 me-2">No available secretary</div>
          )}
        </>
      )}
    </div>
      )}
        <AddPairModal
          openModal={openModal}
          handleCloseModal={handleCloseModal}
          doctor={selectedDoctor}
          nurses={props.extractedNurses}
          setUpdate={props.setUpdate}
        />

        <DeleteDoctorVerificationModal
          openModal={docVerifyModal}
          handleCloseModal={CloseDocVerifyModal}
          selectedDoctor={selectedDoctor}
          setUpdate={props.setUpdate}
        />

        <DeleteSecVerificationModal
          openModal={secVerifyModal}
          handleCloseModal={CloseSecVerifyModal}
          selectedNurse={selectedNurse}
          setUpdate={props.setUpdate}
        />

        <EditSecInfo
          openModal={secEditModal}
          handleCloseModal={closeEditSecModal}
          selectedNurse={selectedNurse}
          setUpdate={props.setUpdate}
        />
      </div>


    
      </div>
      </div>
    </>
  );
}

