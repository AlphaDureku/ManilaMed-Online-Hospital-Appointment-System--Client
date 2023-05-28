import { notifications } from "@mantine/notifications";
import axios from "axios";
import { useState } from "react";
import { CloseButton, Modal } from "react-bootstrap";
import BackProceed from "../../Reusable_Components/Buttons--BackProceed";
import RequestLoadingOverlay from "./RequestLoadingOverlay";

export default function DeleteSecVerificationModal(props) {
  const [doctorNames, setDoctorNames] = useState([]);
  const [loading, setLoading] = useState(false);

  const Notif = () => {
    notifications.show({
      title: "Secretary Deleted",
      color: "dark",
      autoClose: 2000,
    });
  };

  const checkNurseBinding = async () => {
    const token = localStorage.getItem("headToken");
    const nurseId = props.selectedNurse.id;
    try {
      const response = await axios.get(
        process.env.REACT_APP_ONLINE +
          `/head-admin/check-nursebinding?nurse_ID=${nurseId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data && response.data.success) {
        const responseData = response.data.data;
        if (Array.isArray(responseData) && responseData.length > 0) {
          const names = responseData.map(
            (entry) => `${entry.DLname} ${entry.DFname}`
          );
          setDoctorNames(names);
        } else {
          handleDelete();
        }
      } else {
        console.log(response);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async () => {
    const token = localStorage.getItem("headToken");
    const nurseId = props.selectedNurse.id;
    setLoading(true);

    try {
      const response = await axios.post(
        process.env.REACT_APP_ONLINE + "/head-admin/remove-nurse",
        {
          nurse_ID: nurseId,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      props.setUpdate((prev) => !prev);
      Notif();
      setLoading(false);
      handleDeleteClose();
    } catch (error) {
      console.error(error);
    }
  };

  function handleDeleteClose() {
    setDoctorNames([]);
    props.handleCloseModal();
  }

  return (
    <>
      <Modal
        show={props.openModal}
        onHide={handleDeleteClose}
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
                Confirm Delete?
              </div>
              <div style={{ marginLeft: "auto" }}>
                <CloseButton onClick={handleDeleteClose} />
              </div>
            </div>
            {doctorNames.length > 0 && (
              <div
                className=" checkbinding-error mt-3"
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  flexDirection: "column",
                  color: "red",
                }}
              >
                <p>Cannot be deleted, Secretary is still linked to doctor:</p>
                {doctorNames.map((name, index) => (
                  <div style={{ color: "#212529" }} key={index}>
                    Dr. {name}
                  </div>
                ))}
              </div>
            )}
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
                leftButton={handleDeleteClose}
                rightButton={checkNurseBinding}
                redButtonText={"Cancel"}
                blueButtonText={"Delete"}
              />
            </div>
          </Modal.Body>
        </RequestLoadingOverlay>
      </Modal>
    </>
  );
}
