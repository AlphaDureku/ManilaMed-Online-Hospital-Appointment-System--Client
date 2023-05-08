import { Tooltip, Button } from "@mantine/core";
import { Row } from "react-bootstrap";
export default function getPatientInfo (props){





    return (
        <div>
        <div className="bookingtagtitle">
                Patient Information
                <Tooltip
                label="Enter your details to proceed"
                position="bottom"
                className="ms-2 "
                >
                <Button compact variant="outline" size="xs" radius="xl" color="gray">
                    ?{" "}
                </Button>
                </Tooltip>
            </div>
        <div className="container-fluid enterpatientinfo">   
        </div>
        <div className="container mt-5 mb-5  enterpatientinfo">
          <div className="row">
            <p style={{fontWeight: 600}} className="headerinfolabel">Please provide your information. This will be used for your appointment </p>
          </div>
        <Row className=" sppatientInfoRow flex-column flex-md-row" >
            <div className="col">
              <form>
                <label className="patientInfolabel mb-3" style={{fontWeight: 500}}>First Name</label>  
                <label className="required" style={{color: '#FF0000', fontWeight: 900}}>*</label>  
                <input type="text" className="form-control " />
              </form></div>
            <div className="col">
              <label className="patientInfolabel mb-3"  style={{fontWeight: 500}}>Middle Name</label> 
              <input type="text" className="form-control" />
            </div>
            <div className="col">
              <label className="patientInfolabel mb-3"  style={{fontWeight: 500}}>Last Name</label> 
              <label className="required" style={{color: '#FF0000', fontWeight: 900}}>*</label>  
              <input type="text" className="form-control" />
            </div>
            </Row>
          <Row className=" patientinfoRow flex-column flex-md-row">
          <div className="col">
              <div className="row">
                <div className="col">
                  <label className="patientInfolabel "  style={{fontWeight: 500}}>Gender</label>
                  <label className="required" style={{color: '#FF0000', fontWeight: 900}}>*</label>  
                </div>
              </div>
              <div className="form-check-inline mt-3  me-4 subp" style={{fontSize: '15px' , fontWeight: 500}} >
                <input className="form-check-input" type="radio" name="radio" id="radios1" defaultValue="option1" />
                <span className="form-check-label" htmlFor="radios1">
                 {" "} {" "} Male  
                </span>
              </div>
              <div className="form-check-inline mt-3 subp" style={{fontSize: '15px' , fontWeight: 500}}>
                <input className="form-check-input" type="radio" name="radio" id="radios2" defaultValue="option2" />
                <span className="form-check-label" htmlFor="radios2">
                {" "} {" "}Female
                </span>
              </div>
            </div>
            <div className="col">
              <label className="patientInfolabeldob mb-3"  style={{fontWeight: 500}}>Date of Birth</label> 
              <label className="required" style={{color: '#FF0000', fontWeight: 900}}>*</label>  
              <input id="Date" className="form-control" type="date" />
            </div>
            <div className="col">
              <label className="patientInfolabel mb-3"  style={{fontWeight: 500}}>Contact Number</label> 
              <label className="required" style={{color: '#FF0000', fontWeight: 900}}>*</label>  
              <input
                type="tel"
                id="typePhone"
                className="form-control"
                pattern="^(09|\+639)\d{9}$"
                required
                />

            </div>
            </Row>
          <Row  className = "patientinfoRow flex-column flex-md-row"style={{maxWidth: "600px"}}>
            <div className="col ">
              <div className="form-outline ">
                <label className="form-label patientInfolabel mb-3" htmlFor="formA"  style={{fontWeight: 500}}>Address</label>
                <label className="required" style={{color: '#FF0000', fontWeight: 900}}>*</label>  
                <input type="text" id="formA" className="form-control" />
              </div>
            </div>
           
          </Row>
        </div>
            </div>
        );


}