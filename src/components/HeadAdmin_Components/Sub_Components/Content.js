import { useContext } from "react";
import { DashboardContext } from "../Main_Content/Dashboard";
import AddDS from "./AddDocandSec";
import AvailableDocandSec from "./availableDocandSec";
import SearchComponent from "./seachComponent";

export default function Content(props) {
  const dashboardData = useContext(DashboardContext);
  const doctorsWithoutSec =
    dashboardData?.dashboardData?.data?.DoctorsWithoutNurses || [];
  const nurses = dashboardData?.dashboardData?.data?.NurseLists || [];

  console.log(nurses);
  console.log(doctorsWithoutSec);

  const extractedDoctorData = doctorsWithoutSec.map((doctor) => {
    const { DFname, DLname, doctor_ID, date_added } = doctor;
    return { DFname, DLname, doctor_ID, date_added };
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

  console.log(extractedDoctorData);
  console.log(extractedNurses);

  return (
    <>
      <div className="Head--DashboardContainer">
        <div className="Head--Dashboard-left">
          <div className="search-row">
            <SearchComponent
              extractedDoctorData={extractedDoctorData}
              extractedNurses={extractedNurses}
            />
          </div>
          <div className="ContentTable">
            <AvailableDocandSec
              extractedDoctorData={extractedDoctorData}
              extractedNurses={extractedNurses}
            />
          </div>
        </div>
        <div className="Head--Dashboard-right">
          <div className="DocSecTable"></div>
          <div className="DocSecInsert">
            <AddDS />
          </div>
        </div>
      </div>
    </>
  );
}
