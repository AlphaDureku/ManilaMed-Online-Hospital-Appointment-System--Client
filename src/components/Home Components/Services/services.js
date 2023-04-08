import genservimg from "../../../images/genserv-img.png";
import privclinicimg from "../../../images/privclinic-img.png";
import { useMediaQuery } from "@mantine/hooks";
import { Button } from "@mantine/core";
import { useNavigate } from "react-router-dom";

function Services() {
  const isMobile = useMediaQuery("(max-width: 509px)");
  const navigate = useNavigate();

  return (
    <div className="Services ">
      <div className="container- pb-5"></div>
      <div className=" services-container justify-content-center">
        <div className="tagtitle mb-4">Services </div>
        <div className="row mt-2 mb-4">
          <div className="col-xl">
            <div className="serv-imgcontainer">
              <img
                src={genservimg}
                alt=""
                className="img-fluid genserv-img"
              ></img>
            </div>
            <div className="container-fluid services-info ">
              <p className="serv-text m-3 pt-1 " id="serv-textid">
                General Services
              </p>
              <p className="serv-sub m-3" id="serv-subid">
                Offers a wide range of services from diagnosis, theraphy,
                treatments, laboratory tests, ambulatory and home care.
              </p>
              <div
                className="d-flex justify-content-end pb-3 m-3 servbutton-container"
                id="serv-buttonid"
              >
                <Button
                  radius="xl"
                  size={isMobile ? "xs" : "sm"}
                  style={{
                    boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
                    backgroundColor: "#2F9D44",
                    fontFamily: "Inter",
                    minWidth: "100px",
                  }}
                  onClick={() => {
                    navigate("/booking");
                  }}
                >
                  Set Now
                </Button>
              </div>
            </div>
          </div>

          <div className="col-xl">
            <div className="serv-imgcontainer">
              <img
                src={privclinicimg}
                alt=""
                className="img-fluid genserv-img"
              ></img>
            </div>
            <div className="container-fluid services-info ">
              <p className="serv-text m-3 pt-1" id="serv-textid">
                Private Clinics
              </p>
              <p className="serv-sub m-3 " id="serv-subid">
                Private clinics and doctors and specialists providing medical
                care.
              </p>
              <div
                className="d-flex justify-content-end pb-3 m-3 servbutton-container"
                id="serv-buttonid"
              >
                <Button
                  radius="xl"
                  size={isMobile ? "xs" : "sm"}
                  style={{
                    boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
                    backgroundColor: "#2F9D44",
                    fontFamily: "Inter",
                    minWidth: "100px",
                  }}
                >
                  Set Now
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Services;
