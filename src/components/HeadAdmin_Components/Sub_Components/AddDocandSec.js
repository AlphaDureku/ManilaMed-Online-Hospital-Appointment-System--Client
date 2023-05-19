import { Button } from "@mantine/core";
import AddDoctorModal from "./addDocModal";
import AddSecModal from "./AddSecModal";
import { useState } from "react";
import { IconPlus } from '@tabler/icons-react';



export default function AddDS (props) {
   
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
        <div  className="InsertDS ">

            <Button 
                    leftIcon={<IconPlus/>}
                    className="addButtonDS"
                    onClick={openConfirmModalDoc}
                    style={{
                        height: "45%",
                        width: "95%",
                        background: "#E0F7FF",
                        color: "black",
                        borderRadius: "10px",
                        paddingRight: "2.1rem",
                        margin: "5px"

                      }}
                     
                >
                  ADD DOCTOR
                </Button>
           
                <Button className="addButtonDS" 
                leftIcon={<IconPlus/>}
                onClick={openConfirmModalSec}
                style={{
                    height: "45%",
                    width: "95%",
                    background: "#E0F7FF",
                    color: "black",
                    borderRadius: "10px",
                    margin: "5px"





                  }}
            >
                    ADD SECRETARY
                </Button>

            <AddDoctorModal
                    show={modalShowDoc}
                    handleClose={closeConfirmModalDoc}
                />
                 <AddSecModal
            showSec={modalShowSec}
            handleCloseSec={closeConfirmModalSec}
        />
        </div>

  
        </>
    );
}

