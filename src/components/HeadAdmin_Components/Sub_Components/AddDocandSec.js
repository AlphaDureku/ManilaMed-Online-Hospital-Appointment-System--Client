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
        <div className="head-addrow">
            
        <Button 
                    leftIcon={<IconPlus/>}
                    className="addButtonDS"
                    onClick={openConfirmModalDoc}
                    style={{
                        height: "100%",
                        width: "100%",
                        background: "#E0F7FF",
                        color: "black",
                        borderRadius: "5px",
                        padding: "12px",
                        fontSize: "min(1.2rem, 3.5vw)",



                      }}
                     
                >
                  ADD DOCTOR
                </Button>
        </div>

        <div className="head-addrow">
        <Button className="addButtonDS" 
                leftIcon={<IconPlus/>}
                onClick={openConfirmModalSec}
                style={{
                    height: "100%",
                    width: "100%",
                    background: "#E0F7FF",
                    color: "black",
                    borderRadius: "5px",
                    fontSize: "min(1.2rem, 3.5vw)",
                    padding: "12px"

                  }}
            >
                    ADD SECRETARY
                </Button>
        </div>
               

            <AddDoctorModal
                    show={modalShowDoc}
                    handleClose={closeConfirmModalDoc}
                    setUpdate={props.setUpdate}

                />
                 <AddSecModal
            showSec={modalShowSec}
            handleCloseSec={closeConfirmModalSec}
            setUpdate={props.setUpdate}

        />
        </div>

  
        </>
    );
}

