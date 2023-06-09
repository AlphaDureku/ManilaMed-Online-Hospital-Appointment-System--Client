import { notifications } from "@mantine/notifications";
import axios from "axios";
import { useContext, useState } from "react";
import { CloseButton, Modal } from "react-bootstrap";
import { ErrorHandler } from "../../../utils/errorHandler";
import BackProceed from "../../Reusable_Components/Buttons--BackProceed";
import { ShowExpireContext } from "../Main_Content/Dashboard";
import RequestLoadingOverlay from "./RequestLoadingOverlay";
export default function RemovePairing(props) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const setShowExpire = useContext(ShowExpireContext);
  const DeleteNotif = () => {
    notifications.show({
      title: "Remove Pairing Complete",
      color: "dark",
      autoClose: 2000,
    });
  };

  const handleDeleteMatch = async () => {
    const token = localStorage.getItem("headToken");
    const doctorId = props.selectedDoctor.doctorid;

    try {
      setLoading(true);
      const response = await axios.post(
        process.env.REACT_APP_ONLINE + "/head-admin/remove-bind",
        {
          doctor_ID: doctorId,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.data.success === true) {
        props.setUpdate((prev) => !prev);
        DeleteNotif();
        setLoading(false);
        props.handleCloseModal();
      } else {
        console.error(response.data);
        setError(true);
      }
    } catch (error) {
      console.error(error);
      setLoading(false);
      setError(true);
      ErrorHandler(error, setShowExpire);
    }
  };

  function handleClose() {
    setLoading(false);
    setError(false);
    props.handleCloseModal();
  }

  return (
    <>
      <Modal
        show={props.openModal}
        onHide={handleClose}
        centered
        size="sm"
        keyboard={false}
        backdrop="static"
      >
        <RequestLoadingOverlay loading={loading}>
          <Modal.Body style={{ margin: "2%", fontWeight: "600" }}>
            <div
              style={{ display: "flex", alignItems: "center" }}
              className="mt-2"
            >
              <div
                style={{ flex: "1", textAlign: "center", fontSize: "1.2rem" }}
                className="ms-4"
              >
                Confirm Remove?
              </div>
              <div style={{ marginLeft: "auto" }}>
                <CloseButton onClick={handleClose} />
              </div>
            </div>
            <div
              className="confirmbutton mt-3 mb-2"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "",
              }}
            >
              <BackProceed
                leftButton={handleClose}
                rightButton={handleDeleteMatch}
                redButtonText={"Cancel"}
                blueButtonText={"Remove"}
              />
            </div>
            {error && (
              <div
                style={{ margin: "10px", textAlign: "center", color: "red" }}
              >
                Network error occurred. Please try again later.
              </div>
            )}
          </Modal.Body>
        </RequestLoadingOverlay>
      </Modal>
    </>
  );
}
