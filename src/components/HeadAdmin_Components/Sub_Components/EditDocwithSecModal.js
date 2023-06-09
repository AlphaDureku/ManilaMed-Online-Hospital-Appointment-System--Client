import { Alert, Badge, Button, Input, Select, TextInput } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { notifications } from "@mantine/notifications";
import { IconAlertCircle } from "@tabler/icons-react";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { CloseButton, Col, Modal, Row } from "react-bootstrap";
import { ErrorHandler } from "../../../utils/errorHandler";
import { ShowExpireContext } from "../Main_Content/Dashboard";
import RequestLoadingOverlay from "./RequestLoadingOverlay";

export default function EditDocwithSecModal(props) {
  const breakPointMobile = useMediaQuery("(max-width: 1000px)");

  const formDoctorName = props.selectedDoctor
    ? props.selectedDoctor.dfname + ", " + props.selectedDoctor.dlname
    : "";
  const setShowExpire = useContext(ShowExpireContext);
  const [selectedNurse, setSelectedNurse] = useState();
  const [matchError, setMatchError] = useState(false);
  const [noSelectError, setNoSelectError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [originalNurse, setOriginalNurse] = useState();
  const [networkError, setNetworkError] = useState(false);

  const MatchNotif = () => {
    notifications.show({
      title: "Match Complete",
      color: "dark",
      autoClose: 2000,
    });
  };

  useEffect(() => {
    setSelectedNurse(props.selectedDoctor.nurseid);
    setOriginalNurse(props.selectedDoctor.nurseid);
  }, [props.selectedDoctor.nurseid]);

  const nurseOptions =
    props.nurses && props.nurses.length > 0
      ? props.nurses.map((nurse) => ({
          value: nurse.doctor_Secretary_ID,
          label: `${nurse.doctor_Secretary_last_name}, ${nurse.doctor_Secretary_first_name}`,
        }))
      : [];

  const handleMatch = async () => {
    const token = localStorage.getItem("headToken");
    const doctorId = props.selectedDoctor.doctorid;

    if (!selectedNurse) {
      setNoSelectError(true);
    } else if (selectedNurse === originalNurse) {
      setMatchError(true);
    } else {
      setNoSelectError(false);
      setMatchError(false);
      setLoading(true);
      setNetworkError(false);

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
          MatchNotif();
          handleModalExit();
          setLoading(false);
          setSelectedNurse(null);
        } else {
          setMatchError(true);
        }
      } catch (error) {
        console.error(error);
        setNetworkError(true);
        ErrorHandler(error, setShowExpire);
      }
    }
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

  let doctorCount = null;

  if (selectedNurse) {
    const nurseDocCounter = props.nurses.find(
      (nurse) => nurse.doctor_Secretary_ID === selectedNurse
    );
    if (nurseDocCounter) {
      doctorCount = nurseDocCounter.doctorCount;
    }
  }

  function handleModalExit() {
    setMatchError(false);
    setNoSelectError(false);
    setNetworkError(false);
    props.handleCloseModal();
    setSelectedNurse(props.selectedDoctor.nurseid);
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
              <div style={{ flex: "1", textAlign: "center" }} className="ms-5">
                UPDATE PAIRING
              </div>
              <div style={{ marginLeft: "auto" }}>
                <CloseButton onClick={handleModalExit} />
              </div>
            </div>
            <div className="mt-4">
              <Row>
                <Col className="doctor-pairCol">
                  <TextInput
                    id="doctorName"
                    value={formDoctorName}
                    readOnly
                    styles={formstyles}
                    label="Doctor:"
                  />
                </Col>
                <Col className="doctor-pairCol">
                  <Select
                    searchable
                    id="nurseSelect"
                    value={selectedNurse}
                    onChange={(value) => setSelectedNurse(value)}
                    placeholder="Select nurse"
                    data={nurseOptions}
                    styles={formstyles}
                    label="Nurse:"
                    clearable
                    className="headselect-nurselabel"
                  />
                </Col>
                <Col xs={breakPointMobile ? 8 : 2} className="doctor-pairCol">
                  <Input.Wrapper
                    label=" Doctor Count:"
                    className="headcount-label"
                  >
                    <Badge size="xl" radius="sm" className="doctorCount-badge">
                      {doctorCount}
                    </Badge>
                  </Input.Wrapper>
                </Col>
              </Row>
            </div>

            <div className="mt-3">
              <Button
                onClick={handleMatch}
                fullWidth
                style={{
                  backgroundColor: "#E0F7FF",
                  color: "#000",
                  boxShadow: " 0px 4px 4px rgba(0, 0, 0, 0.25)",
                  border: " 1px solid #ced4da",
                  borderRadius: "5px",
                }}
              >
                Update
              </Button>
              {matchError && (
                <Row className="mt-3 m-auto">
                  <Alert
                    icon={<IconAlertCircle size="1rem" />}
                    title="No changes made"
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
                    title="Please select a secretary"
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
              {networkError && (
                <Row className="mt-3 m-auto">
                  <Alert
                    icon={<IconAlertCircle size="1rem" />}
                    title="Network Error. Please try again later."
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
