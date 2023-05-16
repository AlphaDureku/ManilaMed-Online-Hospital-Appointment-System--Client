import { useMediaQuery } from "@mantine/hooks";

export default function Navbar() {
  return (
    <>
      <div className="container-fluid headNav">
        <nav className="navbar navbar-expand-lg falign-content-end  ">
          <a className="navbar-brand " href="#test">
            {" "}
            <a className="navbar-brand " href="#test">
              <img
                src="/images/ManilaMed-Logo.png"
                className="img-fluid "
                alt=""
              />
            </a>
          </a>
        
        </nav>
      </div>
    </>
  );
}
