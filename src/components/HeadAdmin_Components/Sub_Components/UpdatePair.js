import { Accordion, Button, TextInput } from "@mantine/core";
import { IconSearch } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import EditDocwithSec from "./EditDocwithSecModal";
import LoadingSkeleton from "./loadingskeleton";
import RemovePairing from "./removePairing";

export default function UpdatePair(props) {
  const [searchQuery, setSearchQuery] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [openRemoveModal, setOpenRemoveModal] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState("");
  const [showLoadingSkeleton, setShowLoadingSkeleton] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setShowLoadingSkeleton(false);
    }, 1000);

    return () => clearTimeout(timeout);
  }, []);

  function handleOpenModal(
    doctor_ID,
    DLname,
    DFname,
    nurse_ID,
    nurse_Lname,
    nurse_Fname
  ) {
    setSelectedDoctor({
      doctorid: doctor_ID,
      dlname: DLname,
      dfname: DFname,
      nurseid: nurse_ID,
      nlname: nurse_Lname,
      nfname: nurse_Fname,
    });
    setOpenModal(true);
  }

  function handleCloseModal() {
    setOpenModal(false);
  }

  function handleOpenRemoveModal(doctor_ID) {
    setSelectedDoctor({
      doctorid: doctor_ID,
    });
    setOpenRemoveModal(true);
  }

  function handleCloseRemoveModal() {
    setOpenRemoveModal(false);
  }

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

  const sortedDoctors = props.extractedDoctorWithNursesData
    .filter(
      (doctor) =>
        doctor.DFname.toLowerCase().includes(searchQuery.toLowerCase()) ||
        doctor.DLname.toLowerCase().includes(searchQuery.toLowerCase()) ||
        doctor.nurse_Fname.toLowerCase().includes(searchQuery.toLowerCase()) ||
        doctor.nurse_Lname.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => a.DLname.localeCompare(b.DLname));

  const totalDoctors = sortedDoctors.length;

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  return (
    <>
      <div className="updatepair-container ">
        <div className="upcontainer mb-4 mt-3">
          <div className="update-tag">
            <span className="">Doctors with Secretary</span>
            <br />
            <span className="">Total: {totalDoctors} </span>
          </div>
          <div className="update-search">
            <TextInput
              className="headAdmin-search"
              placeholder="Search"
              styles={formstyles}
              style={{ width: "100%", height: "100%" }}
              icon={<IconSearch />}
              value={searchQuery}
              onChange={handleSearch}
            />
          </div>
        </div>

        <div className="updatelist">
          {showLoadingSkeleton ? (
            <LoadingSkeleton />
          ) : (
            <>
              {sortedDoctors.length === 0 ? (
                <div className="noDocSecCard ms-3 mt-2">
                  No available doctor with secretary
                </div>
              ) : (
                <Accordion
                  variant="separated"
                  defaultValue="doctorswithsec"
                  styles={{
                    item: {
                      backgroundColor: "#d9d9d9",
                      borderBottom: "1px solid #848484",
                      boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
                      borderRadius: "5px",
                      "&[data-active]": {
                        backgroundColor: "#d9d9d9",
                      },
                    },
                  }}
                >
                  {sortedDoctors.map((doctor, index) => (
                    <Accordion.Item key={index} value={doctor.doctor_ID}>
                      <Accordion.Control>
                        Dr. {doctor.DLname}, {doctor.DFname}
                      </Accordion.Control>
                      <Accordion.Panel>
                        <div className="secretaryupdate-containerlist">
                          Secretary: {doctor.nurse_Lname}, {doctor.nurse_Fname}
                          <div className="update-buttoncontainer">
                            <Button
                              style={{
                                width: "100%",
                                marginTop: "10px",
                                backgroundColor: "#ffffff",
                                border: "1px solid #000",
                                color: "#000000",
                                boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
                                fontSize: "min(0.9rem, 3.4vw)",
                              }}
                              onClick={() =>
                                handleOpenModal(
                                  doctor.doctor_ID,
                                  doctor.DLname,
                                  doctor.DFname,
                                  doctor.nurse_ID,
                                  doctor.nurse_Lname,
                                  doctor.nurse_Fname
                                )
                              }
                            >
                              Edit
                            </Button>
                            <Button
                              style={{
                                width: "100%",
                                marginTop: "10px",
                                backgroundColor: "#ffffff",
                                border: "1px solid #000",
                                color: "#000000",
                                boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
                                fontSize: "min(0.9rem, 3.4vw)",
                              }}
                              onClick={() =>
                                handleOpenRemoveModal(doctor.doctor_ID)
                              }
                            >
                              Remove
                            </Button>
                          </div>
                        </div>
                      </Accordion.Panel>
                    </Accordion.Item>
                  ))}
                </Accordion>
              )}
            </>
          )}
        </div>
      </div>

      <EditDocwithSec
        openModal={openModal}
        handleCloseModal={handleCloseModal}
        nurses={props.extractedNurses}
        selectedDoctor={selectedDoctor}
        setUpdate={props.setUpdate}
      />

      <RemovePairing
        openModal={openRemoveModal}
        handleCloseModal={handleCloseRemoveModal}
        selectedDoctor={selectedDoctor}
        setUpdate={props.setUpdate}
      />
    </>
  );
}
