import { useMediaQuery } from "@mantine/hooks";

export default function Navbar() {
  const breakPointMobile = useMediaQuery("(min-width: 600px)");
  return (
    <>
      <div className="container-fluid headNav">
        <nav className="navbar navbar-expand-lg  ">
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
          {breakPointMobile ? (
            <ul className="navbar-nav ms-auto ">
              <li className="nav-item me-3 mt-2">
                <div className="secName">Admin Moderator</div>
                <div className="secole">Head Admin</div>
              </li>
            </ul>
          ) : (
            ""
          )}

          <div className="dropdown">
            <a
              className="dropdown-toggle d-flex align-items-center hidden-arrow"
              href="#test"
              id="navbarDropdownMenuAvatar"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <img
                src="/images/secprofile.png"
                className="adminProfile"
                alt=""
              />
            </a>
            <ul
              className="dropdown-menu dropdown-menu-end"
              aria-labelledby="navbarDropdownMenuAvatar"
            >
              <li>
                <a className="dropdown-item" href="#test">
                  Manage Account
                </a>
              </li>
              <li>
                <a className="dropdown-item" href="/headAdmin">
                  Logout
                </a>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    </>
  );
}
