import { Divider } from "@mantine/core";
import { useState } from "react";
import ChangeUserPassModal from "../Sub_Components/Modals/ChangeUserPassModal";

export default function Settings(props) {


  const nurseInfo = props.nurseData ? props.nurseData : {};

  const { doctor_Secretary_first_name, doctor_Secretary_last_name, doctor_Secretary_username  } = nurseInfo;

  const [openUserPassModal, setopenUserPassModal] = useState(false);

  function handleOpenUserPass() {
    setopenUserPassModal(true);
  }

  function handleCloseUserPass() {
    setopenUserPassModal(false);
  }

  return (

    <>
        <div className="head-settingspage">

            <div className="quickinfo-row">
              <div className="icon-col">
                <img
                  src="/images/blank-icon.jpg"
                  className="img-fluid img-none"
                  alt="Icon"
                />
              </div>
              <div className="name-col">
                  <p className="headmanager-tag">
                  {doctor_Secretary_first_name && doctor_Secretary_last_name
                ? `${doctor_Secretary_first_name} ${doctor_Secretary_last_name}`
                : "Secretary"}
                </p>
                <p className="headmanager-title">Secretary</p>
              </div>
            </div>

            <Divider size="md" style={{ marginLeft: "3%", marginRight: "3%" }} />
            <div className="manageprofile-options">
              <div className="options-tagtitle">General</div>
              <div className="options-row">
                <div className="nursemanage-row">
                <p className="manage-profileandsec"onClick={handleOpenUserPass} >Manage Profile and Security</p>
                </div>
                <p className="sub-manage">Change your username and password</p>
                <Divider size="md" />
              </div>
    
            </div>
            <ChangeUserPassModal
            openModal={openUserPassModal}
            handleCloseModal={handleCloseUserPass}
            username={doctor_Secretary_username}
            
            />
     
            </div>
                
    
    </>










  );
}
