import { Tooltip } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { HeadAdminPageContext } from "../../../pages/HeadAdmin";
import ConfirmLogOutModal from "./ConfirmLogOutModal";
export default function HeadAdminNavbar() {
  const [show, setShow] = useState(false);
  const breakPointMobile = useMediaQuery("(max-width: 800px)");
  const navigate = useNavigate();
  const { setCurrentPage, currentPage } = useContext(HeadAdminPageContext);

  const logout = () => {
    localStorage.removeItem("headToken");
    localStorage.removeItem("sortOption");
    localStorage.removeItem("selectedOption");
    setCurrentPage(1)
    navigate("/head");
  };

  const onClickIcon = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  const handleClose = () => {
    setShow((prev) => !prev);
  };

  const activePageHighlight = (pageNumber) => {
    if (pageNumber === currentPage) {
      return { backgroundColor: "white", stroke: "black" };
    }
  };
  const activePagColor = (pageNumber) => {
    if (pageNumber === currentPage) {
      return "black";
    }
    return "white";
  };

  
  return (
    <div className="HeadAdmin--SideBar">
      <Tooltip label="Home" position="right">
        <div
          className="HeadAdmin--IconContainer"
          onClick={() => onClickIcon(1)}
          style={activePageHighlight(1)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="icon icon-tabler icon-tabler-home-2 Admin--Icons"
            width={breakPointMobile ? "28" : "35"}
            height={breakPointMobile ? "28" : "35"}
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke={activePagColor(1)}
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
            <path d="M5 12l-2 0l9 -9l9 9l-2 0"></path>
            <path d="M5 12v7a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-7"></path>
            <path d="M10 12h4v4h-4z"></path>
          </svg>
        </div>
      </Tooltip>
      <Tooltip label="Settings" position="right">
        <div
          className="HeadAdmin--IconContainer"
          onClick={() => onClickIcon(3)}
          style={activePageHighlight(3)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="icon icon-tabler icon-tabler-settings-2 Admin--Icons"
            width={breakPointMobile ? "28" : "35"}
            height={breakPointMobile ? "28" : "35"}
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke={activePagColor(3)}
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
            <path d="M19.875 6.27a2.225 2.225 0 0 1 1.125 1.948v7.284c0 .809 -.443 1.555 -1.158 1.948l-6.75 4.27a2.269 2.269 0 0 1 -2.184 0l-6.75 -4.27a2.225 2.225 0 0 1 -1.158 -1.948v-7.285c0 -.809 .443 -1.554 1.158 -1.947l6.75 -3.98a2.33 2.33 0 0 1 2.25 0l6.75 3.98h-.033z"></path>
            <path d="M12 12m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0"></path>
          </svg>
        </div>
      </Tooltip>
      <Tooltip label="Logout" position="right">
        <div
          className="Admin--IconContainer ThirdChild"
          onClick={() => setShow(true)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="icon icon-tabler icon-tabler-logout Admin--Icons"
            width={breakPointMobile ? "28" : "35"}
            height={breakPointMobile ? "28" : "35"}
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="white"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
            <path d="M14 8v-2a2 2 0 0 0 -2 -2h-7a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h7a2 2 0 0 0 2 -2v-2"></path>
            <path d="M9 12h12l-3 -3"></path>
            <path d="M18 15l3 -3"></path>
          </svg>
        </div>
      </Tooltip>
      <ConfirmLogOutModal
        show={show}
        handleClose={handleClose}
        question={"Are you sure you want to logout?"}
        title={"Logout"}
        handleSubmit={logout}
      />
    </div>
  );
}
