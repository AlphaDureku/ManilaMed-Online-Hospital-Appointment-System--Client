import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

function HeaderNavbar() {
  return (
    <div className="HeaderNavbar ">
      <Navbar expand="lg navbarcontainer" fixed="top">
        <Container fluid className="ms-4 ">
          <Navbar.Brand href="#home" className="d-flex  ">
            <img
              loading="lazy"
              src="./images/ManilaMed-Logo.png"
              className="img-fluid "
              alt=""
              width="208px"
            />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav me-2">
            <Nav className="ms-auto me-4 navitems ">
              <Nav.Link className="navheader" href="#Howto">
                How to
              </Nav.Link>
              <Nav.Link className="navheader" href="#services">
                Services
              </Nav.Link>
              <Nav.Link className="navheader" href="#searchdocotr">
                Search Doctor
              </Nav.Link>
              <Nav.Link className="navheader" href="#tracker">
                Tracker
              </Nav.Link>
              <Nav.Link className="me-3 navheaderend" href="#faqs">
                FAQs
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
}

export default HeaderNavbar;
