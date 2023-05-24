import { Modal, CloseButton } from "react-bootstrap";
import BackProceed from "../../Reusable_Components/Buttons--BackProceed";
import axios from "axios";
import { notifications } from "@mantine/notifications";
import RequestLoadingOverlay from "./RequestLoadingOverlay";
import { useState } from "react";

export default function DeleteDoctorVerificationModal (props){
  const [loading, setLoading] = useState(false);

  const Notif = () => {
    notifications.show({
      title: "Doctor Deleted",
      color: "dark",
      autoClose: 2000,
    });
  };

    const handleDelete = async () => {
        const token = localStorage.getItem('token');
        const doctorId = props.selectedDoctor.id;

        setLoading(true);
        try {
          const response = await axios.post(
            process.env.REACT_APP_ONLINE + '/head-admin/remove-doctor',
            {
              doctor_ID: doctorId,
            },
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          props.setUpdate((prev)=>!prev);
          Notif();
          setLoading(false);
        } catch (error) {
          console.error(error);
        }

        props.handleCloseModal();

      };
      


 
    return (
      <>
        <Modal show={props.openModal} onHide={props.handlecloseModal}
        centered size="sm" keyboard={false} backdrop="static">
          
          <RequestLoadingOverlay loading={loading}> 
        <Modal.Body style={{ margin: '2%', fontWeight: '600' }}>
        <div style={{ display: 'flex', alignItems: 'center' }} className="mt-2">
          <div style={{ flex: '1', textAlign: 'center', fontSize: "1.2rem" }} className="ms-4">
            Confirm Delete?
          </div>
          <div style={{ marginLeft: 'auto' }}>
            <CloseButton onClick={props.handleCloseModal} />
          </div> 
        </div>
        <div  className="confirmbutton mt-3 mb-2" style={{ display: 'flex', alignItems: 'center', justifyContent: "center", margin: "" }}>
            <BackProceed 
            leftButton={props.handleCloseModal}
            rightButton={handleDelete}
            redButtonText={"Cancel"}
            blueButtonText={"Delete"}/>
        </div>


            </Modal.Body>
            </RequestLoadingOverlay>

        </Modal>
      </>  
    );
}