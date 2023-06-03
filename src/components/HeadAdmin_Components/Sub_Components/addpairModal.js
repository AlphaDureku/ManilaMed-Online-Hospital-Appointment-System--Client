import { Alert, Button, Select, TextInput, Badge, Input  } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { IconAlertCircle } from "@tabler/icons-react";
import axios from "axios";
import { useContext, useState } from "react";
import { CloseButton, Col, Modal, Row } from "react-bootstrap";
import { ErrorHandler } from "../../../utils/errorHandler";
import { ShowExpireContext } from "../Main_Content/Dashboard";
import RequestLoadingOverlay from "./RequestLoadingOverlay";
import { useMediaQuery } from "@mantine/hooks";

export default function AddPairModal(props) {
  const breakPointMobile = useMediaQuery("(max-width: 1000px)");

  const formDoctorName = props.doctor
    ? props.doctor.fname + ", " + props.doctor.lname
    : "";
  const [selectedNurse, setSelectedNurse] = useState(null);
  const [matchError, setMatchError] = useState(false);
  const [noSelectError, setNoSelectError] = useState(false);
  const [loading, setLoading] = useState(false);
  const setShowExpire = useContext(ShowExpireContext);
  const Notif = () => {
    notifications.show({
      title: "Match Complete",
      color: "dark",
      autoClose: 2000,
    });
  };

  const formstyles = {
    input: {
      borderColor: "rgba(0, 0, 0, 0.5)",
      cursor: "pointer",
      boxShadow: "0px 2px 2px rgba(0, 0, 0, 0.25)",
      "&:focus": {
        borderColor: "#80bdff",
        boxShadow: "0 0 0 0.2rem rgba(0, 123, 255, 0.25)",
      },
    },
  };
  const nurseOptions =
    props.nurses && props.nurses.length > 0
      ? props.nurses.map((nurse) => ({
          value: nurse.doctor_Secretary_ID,
          label: `${nurse.doctor_Secretary_last_name}, ${nurse.doctor_Secretary_first_name}`,
        }))
      : [];

    
  let doctorCount = null;

      if (selectedNurse) {
        const nurseDocCounter = props.nurses.find((nurse) => nurse.doctor_Secretary_ID === selectedNurse);
        if (nurseDocCounter) {
          doctorCount = nurseDocCounter.doctorCount;
        }
      }
        


  const handleMatch = async () => {
    const token = localStorage.getItem("headToken");
    const doctorId = props.doctor ? props.doctor.id : "";

    if (!selectedNurse) {
      setNoSelectError(true);
    } else if (selectedNurse) {
      setNoSelectError(false);

      setLoading(true);
      try {
        const response = await axios.post(
          process.env.REACT_APP_ONLINE + "/head-admin/match-doctor",
          {
            doctor_ID: doctorId,
            nurse_ID: selectedNurse,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (response.status === 200) {
          props.setUpdate((prev) => !prev);
          Notif();
          setLoading(false);
          handleModalExit();
          setSelectedNurse(null);
        } else {
          setMatchError(true);
        }
      } catch (error) {
        console.error(error);
        setMatchError(true);
        ErrorHandler(error, setShowExpire);
      }
    }
  };

  function handleModalExit() {
    setMatchError(false);
    setNoSelectError(false);
    props.handleCloseModal();
    setSelectedNurse(" ");
  }

  return (
    <>
      <Modal
        show={props.openModal}
        onHide={handleModalExit}
        centered
        size="lg"
        keyboard={false}
        backdrop="static"
      >
        <RequestLoadingOverlay loading={loading}>
          <Modal.Body style={{ margin: "2%", fontWeight: "600" }}>
            <div
              style={{ display: "flex", alignItems: "center" }}
              className="mb-"
            >
              <div style={{ flex: "1", textAlign: "center" }} className="ms-4">
                PAIRING
              </div>
              <div style={{ marginLeft: "auto" }}>
                <CloseButton onClick={handleModalExit} />
              </div>
            </div>
            <div className="addpair-body ">
              <Row className="mt-4 mb-3">
                <Col className="doctor-pairCol">
                  <TextInput
                    value={formDoctorName}
                    styles={formstyles}
                    readOnly
                    label="Doctor:"
                  />
                </Col>
                <Col className="doctor-pairCol">
                  <Select
                    placeholder="Select Secretary"
                    label="Secretary:"
                    searchable
                    clearable
                    styles={formstyles}
                    data={nurseOptions}
                    onChange={(value) => setSelectedNurse(value)}
                    value={selectedNurse}
                    className="headselect-nurselabel"

                  />
                </Col>
                <Col  xs={breakPointMobile ? 8 : 2}   className="doctor-pairCol">
                  <Input.Wrapper label =" Doctor Count:" className="headcount-label">
                  <Badge size="xl" radius="sm" className="doctorCount-badge">{doctorCount}</Badge>
                  </Input.Wrapper>
              </Col>
              </Row>
              <Row className="m-auto">
                <Button
                  onClick={handleMatch}
                  style={{
                    backgroundColor: "#E0F7FF",
                    color: "#000",
                    boxShadow: " 0px 4px 4px rgba(0, 0, 0, 0.25)",
                    border: " 1px solid #ced4da",
                    borderRadius: "5px",
                  }}
                >
                  {" "}
                  MATCH
                </Button>
              </Row>

              {matchError && (
                <Row className="mt-3 m-auto">
                  <Alert
                    icon={<IconAlertCircle size="1rem" />}
                    title="Match Error"
                    color="red"
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      height: "40px",
                    }}
                  />
                </Row>
              )}
              {noSelectError && (
                <Row className="mt-3 m-auto">
                  <Alert
                    icon={<IconAlertCircle size="1rem" />}
                    title="Please Select a secratary"
                    color="red"
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      height: "40px",
                    }}
                  />
                </Row>
              )}
            </div>
          </Modal.Body>
        </RequestLoadingOverlay>
      </Modal>
    </>
  );
}
