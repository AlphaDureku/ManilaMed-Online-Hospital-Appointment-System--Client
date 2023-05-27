import { useContext, useEffect } from "react";
import { DashboardContext } from "../Main_Content/Dashboard";
import AddDS from "./AddDocandSec";
import AvailableDocandSec from "./availableDocandSec";
import UpdatePair from "./UpdatePair";

export default function Content(props) {
  const dashboardData = useContext(DashboardContext);
  const doctorsWithoutSec =
    dashboardData?.dashboardData?.data?.DoctorsWithoutNurses || [];
  const nurses = dashboardData?.dashboardData?.data?.NurseLists || [];
  const doctorsWithSec = dashboardData?.dashboardData?.data?.DoctorsWithNurses || [];

  
  const extractedDoctorData = doctorsWithoutSec.map((doctor) => {
    const { DFname, DLname, doctor_ID, date_added } = doctor;
    return { DFname, DLname, doctor_ID, date_added };
  });

  const extractedDoctorWithNursesData = doctorsWithSec.map((doctor, nurse) => {
    const { DFname, DLname, doctor_ID, nurse_Fname, nurse_Lname, nurse_ID } = doctor;
    return { DFname, DLname, doctor_ID, nurse_Fname, nurse_Lname, nurse_ID  };
  });
  const extractedNurses = nurses.map((nurse) => {
    const {
      doctor_Secretary_first_name,
      doctor_Secretary_last_name,
      doctor_Secretary_ID,
      doctor_Secretary_username,
      doctor_Secretary_password,
    } = nurse;
    return {
      doctor_Secretary_first_name,
      doctor_Secretary_last_name,
      doctor_Secretary_ID,
      doctor_Secretary_username,
      doctor_Secretary_password,
    };
  });


  

  
  return (
    <>
      <div className="Head--DashboardContainer">
        <div className="Head--Dashboard-left">
          <div className="ContentTable">
            <AvailableDocandSec
              extractedDoctorData={extractedDoctorData}
              extractedNurses={extractedNurses}
              setUpdate={props.setUpdate}
            />
          </div>
        </div>
        <div className="Head--Dashboard-right">
          <div className="DocSecTable">
            <UpdatePair
            extractedDoctorWithNursesData= {extractedDoctorWithNursesData}
            extractedNurses={extractedNurses}
            setUpdate={props.setUpdate}


            />
          </div>
          <div className="DocSecInsert">
            <AddDS 
            setUpdate={props.setUpdate}
            />
          </div>
        </div>
      </div>
    </>
  );
}
