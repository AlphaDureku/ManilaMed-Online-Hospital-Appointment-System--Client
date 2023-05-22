import Navbar from "../NavBar/NavBar";
import AdminSide from "../Sub_Components/AdminSideBar";
import Content from "../Sub_Components/Content";

export default function Dashboard() {
  return (
    <>
      <Navbar />
      <div className="adminMainContainer">
        <AdminSide />
        <Content />
      </div>
    </>
  );
}
