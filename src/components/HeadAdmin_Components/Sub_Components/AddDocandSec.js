import { Container, Row } from "react-bootstrap"
import { Button } from "@mantine/core";
import AddDoctorModal from "./addDocModal";
import { useState } from "react";

export default function AddDS () {
   
    const [modalShow, setModalShow] = useState(false);


    function openConfirmModal() {
        setModalShow(true);
      }
    
      function closeConfirmModal() {
        setModalShow(false);
      }



    return (
        <>
        <Container  className="InsertDS ">
        <Row className="">
            <Button 
            className="mt-5"
            onClick={openConfirmModal}
            >
            ADD DOCTOR
            </Button>
            <AddDoctorModal
              show={modalShow}
              handleClose={closeConfirmModal}
            />
        </Row>
        <Row className="">
            <Button className="mt-5">
            ADD SECRETARY
            </Button>
        </Row>

        </Container>
        
    
        </>



    );





}