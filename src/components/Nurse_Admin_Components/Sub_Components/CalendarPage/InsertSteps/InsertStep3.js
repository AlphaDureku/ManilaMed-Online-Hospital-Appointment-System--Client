import { Container, Row } from "react-bootstrap";


export default function InsertStep3 () {

    return (
        <>
         <Container className="bookingConfirmationCard mt-3 text-center">
          <Row className="mt-3">
            <div className="reqheader mt-4 ">Requested Appointment Date:</div>
            <div className="reqscheddate mt-3">
              {/* {moment(schedule_date).format("MMMM D, YYYY")} */}
              June 4, 2023
            </div>
            <div className="reqscheddate mb-3">
              {/* {recom_Time} - {end_Time} */}
              11:00 AM - 2:00 PM
            </div>
            <hr className="reqline"></hr>
          </Row>
          <Row className="mb-5">
            <div className="reqheader mt-3 ">Doctor:</div>
            <div className="reqdoctorname">
              {/* {doctor_info.doctor_first_name} {doctor_info.doctor_last_name} */}
              Dr. Mark Angelo Templanza
            </div>
            <div className="reqdoctorspec mb-3">
              {/* {doctor_info.doctor_specialization} */}
              Cardiology
            </div>
            <hr className="mb-3 reqline"></hr>
          </Row>
        </Container>
        
        
        
        </>
    );


}