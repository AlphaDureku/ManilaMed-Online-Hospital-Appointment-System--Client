import { Modal, CloseButton, Row, Col } from "react-bootstrap";
import { TextInput, Select, Button, Alert } from "@mantine/core";
import { IconAlertCircle, IconCheck } from '@tabler/icons-react';
import { useState } from "react";
import axios from "axios";


export default function  AddPairModal(props){

    const formDoctorName =  props.doctor ? props.doctor.fname + ", " + props.doctor.lname : "";
    const [selectedNurse, setSelectedNurse] = useState(null); 
    const [matchError, setMatchError] = useState(false);
    const [noSelectError, setNoSelectError] = useState(false);



    const formstyles = {
        input: {
        borderColor: 'rgba(0, 0, 0, 0.5);',
        cursor: 'pointer',
        boxShadow: '0px 2px 2px rgba(0, 0, 0, 0.25)',
        '&:focus': {
            borderColor: '#80bdff',
            boxShadow: '0 0 0 0.2rem rgba(0, 123, 255, 0.25)',
        },
        },
    };
    const nurseOptions = props.nurses && props.nurses.length > 0
    ? props.nurses.map(nurse => ({
        value: nurse.doctor_Secretary_ID,
        label: `${nurse.doctor_Secretary_last_name}, ${nurse.doctor_Secretary_first_name}`,
      }))
    : [];
 
       const handleMatch = async () => {
        const token = localStorage.getItem('token');
        const  doctorId  = props.doctor ? props.doctor.id: "";

          if (!selectedNurse){
            setNoSelectError(true);
          }
        else if (selectedNurse) {
          setNoSelectError(false);

  
          try {
            const response = await axios.post( 
              process.env.REACT_APP_ONLINE +
              '/head-admin/match-doctor',
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
              props.handleCloseModal();
            // Trigger the page reload
          window.location.reload();
            // Store the value in localStorage
        localStorage.setItem("pairSuccess", "true");

            } else {
              setMatchError(true);
            }
          } catch (error) {
            console.error(error);
            setMatchError(true);
          }
        }
      };
      
      function handleModalExit(){
        setMatchError(false);
        setNoSelectError(false)
        setSelectedNurse(" "); 
        props.handleCloseModal();
      }

    return (
        <>
        <Modal show={props.openModal} onHide={handleModalExit}
        centered size="lg" keyboard={false} backdrop="static">
        <Modal.Body style={{ margin: '5%', fontWeight: '600' }}>
        <div style={{ display: 'flex', alignItems: 'center' }} className="mb-">
          <div style={{ flex: '1', textAlign: 'center' }} className="ms-4">
            PAIRING
          </div>
          <div style={{ marginLeft: 'auto' }}>
            <CloseButton onClick={handleModalExit} />
          </div> 
        </div>
        <div className="addpair-body ">
        <Row className="mt-4 mb-3">
            <Col>
            <TextInput 
            value={formDoctorName}
            styles={formstyles}
            readOnly
            label="Doctor"/>
            </Col>
            <Col>
             <Select
            placeholder="Select Secretary"
            label="Secretary"
            searchable
            clearable
            styles={formstyles}
            data={nurseOptions}
            onChange={value => setSelectedNurse(value)}
            value={selectedNurse}
            />
             
            </Col>
        </Row>
        <Row className="m-auto">
            <Button
              onClick={handleMatch}
              style={{
                backgroundColor: '#E0F7FF',
                color: '#000',
                boxShadow: ' 0px 4px 4px rgba(0, 0, 0, 0.25)',
                border: ' 1px solid #ced4da',
                borderRadius: '5px'
              }}
            > MATCH</Button>
        </Row>
    
            {matchError && (
              <Row className="mt-3 m-auto">
                <Alert icon={<IconAlertCircle size="1rem" />} title="Match Error" color="red" style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "40px" }} />
              </Row>
           )}
           {noSelectError && (
              <Row className="mt-3 m-auto">
                <Alert icon={<IconAlertCircle size="1rem" />} title="Please Select a secratary" color="red" style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "40px" }} />
              </Row>
           )}
        </div>
        </Modal.Body>



        </Modal>
        




        </>
    );

}