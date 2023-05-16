import Content from "../Sub_Components/Content";
import HeadAdminNavbar from "../Sub_Components/headAdminNav";
import Navbar from "../NavBar/NavBar";

export default function Dashboard() {
  return (
    <>     
    <Navbar/>
     <div style={{ display: 'grid', gridTemplateColumns: 'auto 1fr' }}>
      <HeadAdminNavbar />
      <Content />
    </div>
    </>
  );
}
