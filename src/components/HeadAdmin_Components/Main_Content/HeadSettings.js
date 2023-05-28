import { Divider } from "@mantine/core";
import { DashboardContext } from "./Dashboard";
import { useContext, useState } from "react";
import HeadAdminProfile from "../Sub_Components/headAdmin-Profile";
import HeadAdminUsernamePass from "../Sub_Components/HeadAdminUsernamePass";


export default function HeadSettings(props) {

  const dashboardData = useContext(DashboardContext);
  const adminInfo = dashboardData?.dashboardData?.data?.AdminInfo || [];
  const [openInfoModal, setopenInfoModal] = useState(false);
  const [openUserPassModal, setopenUserPassModal] = useState(false);


  const { head_Manager_Fname, head_Manager_Lname, head_Manager_ID, head_Manager_username } = adminInfo;

  function handleOpenProfile() {
    setopenInfoModal(true);
  }

  function handleCloseProfile() {
    setopenInfoModal(false);
  }

  
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
              src="/images/icon1.png"
              className="img-fluid img-none"
              alt="Icon"
            />
          </div>
          <div className="name-col">
              <p className="headmanager-tag">
              {head_Manager_Fname && head_Manager_Lname
                ? `${head_Manager_Fname} ${head_Manager_Lname}`
                : "Admin"}
            </p>
            <p className="headmanager-title"> Head Admin</p>
          </div>
        </div>

        <Divider size="md" style={{ marginLeft: "3%", marginRight: "3%" }} />
        <div className="manageprofile-options">
          <div className="options-tagtitle">General</div>
          <div className="options-row">
            <div className="manage-row">
            <p className="manage-profileandsec" onClick={handleOpenProfile}>Manage Profile</p>
            </div>
            <p className="sub-manage">Change your personal information</p>
            <Divider size="md" />
          </div>
          <div className="options-row mt-3">
            <div className="manage-row-down">
            <p className="manage-profileandsec" onClick={handleOpenUserPass}>Security</p>
            </div>
            <p className="sub-manage">Change your password</p>
          </div>
        </div>

    <HeadAdminProfile
    openModal = {openInfoModal}
    handleCloseProfile = {handleCloseProfile}
    fname={head_Manager_Fname}
    lname={head_Manager_Lname}
    Id ={head_Manager_ID}
    setUpdate={props.setUpdate} 
    />

    <HeadAdminUsernamePass
    openModal = {openUserPassModal}
    handleCloseUserPass = {handleCloseUserPass}
    setUpdate={props.setUpdate} 
    username={head_Manager_username}
    Id ={head_Manager_ID}


    />


      </div>
    </>
  );
}
