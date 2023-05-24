import { useMediaQuery } from "@mantine/hooks";
import Navbar from "../NavBar/NavBar";

import Content from "../Sub_Components/Content";
import SideBar from "../Sub_Components/SideBar";

export default function Dashboard() {
  const breakPointMobile = useMediaQuery("(max-width: 800px)");
  return (
    <>
      <div className="wrapper">
        {breakPointMobile ? "" : <Navbar />}
        <div className="adminMainContainer">
          <SideBar />
          <Content />
        </div>
      </div>
    </>
  );
}
