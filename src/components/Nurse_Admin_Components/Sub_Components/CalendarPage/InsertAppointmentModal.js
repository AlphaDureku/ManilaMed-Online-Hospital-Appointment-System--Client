import { Modal } from "react-bootstrap";
import { Stepper } from "@mantine/core";
import { useState } from "react";
import BackProceed from "../../../Reusable_Components/Buttons--BackProceed";
import InsertStep1 from "./InsertSteps/InsertStep1";
import InsertStep2 from "./InsertSteps/InsertStep2";
import InsertStep3 from "./InsertSteps/InsertStep3";





export default function InsertAppointmentModal (props) {
    const [active, setActive] = useState(1);
    const nextStep = () => setActive((current) => (current < 3 ? current + 1 : current));
    const prevStep = () => setActive((current) => (current > 0 ? current - 1 : current));


    return(
    <>  
    <Modal
        show={props.openModal}
        onHide={props.closeModal}
        centered 
        size = {active === 0 ? "xl" : "lg"}
    >
        <Modal.Header closeButton>
        <div className="h4 setAvailTitle">Insert Appointment</div>
        </Modal.Header>
        <Modal.Body>
        <div>
        <Stepper 
        active={active} 
        onStepClick={setActive} 
        breakpoint="sm"
        className="stepper"
        radius="lg"
        >
            <Stepper.Step label="First step" description="Select Schedule"> 
            
             <InsertStep1/>
             
            </Stepper.Step>
            <Stepper.Step label="Second step" description="Enter Patient Information">
                
             <InsertStep2/>

            </Stepper.Step>
            <Stepper.Completed>
                
            <InsertStep3/>

            </Stepper.Completed>
        </Stepper>

        </div>
        <div className="Admin--SetButtonRowInsertApp mt-4 ">
            <BackProceed
            leftButton={active === 0 ? props.closeModal : prevStep}
            rightButton={nextStep}
            redButtonText={active === 0 ? "Cancel": "Back"}
            blueButtonText={ active === 2 ? "Book " : "Next"}
            />
         </div>



        </Modal.Body>
    </Modal>


    </>
    );

}