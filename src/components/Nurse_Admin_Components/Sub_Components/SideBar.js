import { Tooltip } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
export default function SideBar() {
  const breakPointMobile = useMediaQuery("(max-width: 800px)");
  return (
    <div className="Admin--SideBar">
      <Tooltip label="Home" position="right">
        <div className="Admin--IconContainer">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="icon icon-tabler icon-tabler-home-2 Admin--Icons"
            width={useMediaQuery ? "28" : "35"}
            height={useMediaQuery ? "28" : "35"}
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="white"
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
      <Tooltip label="Home" position="right">
        <div className="Admin--IconContainer">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="icon icon-tabler icon-tabler-calendar Admin--Icons"
            width={useMediaQuery ? "28" : "35"}
            height={useMediaQuery ? "28" : "35"}
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="white"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
            <path d="M4 7a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2v-12z"></path>
            <path d="M16 3v4"></path>
            <path d="M8 3v4"></path>
            <path d="M4 11h16"></path>
            <path d="M11 15h1"></path>
            <path d="M12 15v3"></path>
          </svg>
        </div>
      </Tooltip>
      <Tooltip label="Home" position="right">
        <div className="Admin--IconContainer ThirdChild">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="icon icon-tabler icon-tabler-logout Admin--Icons"
            width={useMediaQuery ? "28" : "35"}
            height={useMediaQuery ? "28" : "35"}
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
    </div>
  );
}
