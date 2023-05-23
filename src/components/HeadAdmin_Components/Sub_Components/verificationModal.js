import { Modal, CloseButton } from "react-bootstrap";
import BackProceed from "../../Reusable_Components/Buttons--BackProceed";
import axios from "axios";
export default function VerificationModal (props){


    const handleDelete = async () => {
        const token = localStorage.getItem('token');
        const doctorId = props.selectedDoctor.id;
        const nurseId = props.selectedNurse.id;
    
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
          console.log(response);
          // Trigger the page reload
        window.location.reload();
        // Store the value in localStorage
        localStorage.setItem("deleteSuccess", "true");

        } catch (error) {
          console.error(error);
        }
        props.handleCloseModal();

      };
 
    return (
      <>
        <Modal show={props.openModal} onHide={props.handlecloseModal}
        centered size="sm" keyboard={false} backdrop="static">
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
        </Modal>
      </>  
    );
}