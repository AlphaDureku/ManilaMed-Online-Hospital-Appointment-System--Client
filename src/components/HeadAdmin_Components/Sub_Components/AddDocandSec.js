import { Container, Row } from "react-bootstrap"
import { Button } from "@mantine/core";
import AddDoctorModal from "./addDocModal";
import AddSecModal from "./AddSecModal";
import { useState } from "react";

export default function AddDS () {
   
    const [modalShowDoc, setModalShowDoc] = useState(false);
    const [modalShowSec, setModalShowSec] = useState(false);

    function openConfirmModalDoc() {
        setModalShowDoc(true);
    }
    
    function closeConfirmModalDoc() {
        setModalShowDoc(false);
    }

    
    function openConfirmModalSec() {
        setModalShowSec(true);
    }
  
    function closeConfirmModalSec() {
        setModalShowSec(false);
    }

    return (
        <>
        <Container  className="InsertDS ">
            <Row className="addButtonHeight m-auto ">
                <Button 
                    className="addButtonDS"
                    onClick={openConfirmModalDoc}
                    style={{
                        height: "85%",
                        width: "100%",
                        background: "#E0F7FF",
                        color: "black",
                        borderRadius: "10px",
                        marginTop: "2%",
                   
                      }}
                     
                >
                  ADD DOCTOR
                </Button>
              
            </Row>
            <Row className="addButtonHeight m-auto ">
                <Button className="addButtonDS" 
                onClick={openConfirmModalSec}
                style={{
                    height: "85%",
                    width: "100%",
                    background: "#E0F7FF",
                    color: "black",
                    borderRadius: "10px",
                    marginTop: "1%",



                  }}
            >
                    ADD SECRETARY
                </Button>
               
            </Row>
            <AddDoctorModal
                    show={modalShowDoc}
                    handleClose={closeConfirmModalDoc}
                />
                 <AddSecModal
            showSec={modalShowSec}
            handleCloseSec={closeConfirmModalSec}
        />
        </Container>

  
        </>
    );
}

