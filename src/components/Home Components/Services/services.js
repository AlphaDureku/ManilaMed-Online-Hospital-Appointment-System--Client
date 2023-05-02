import { Button } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { useNavigate } from "react-router-dom";

function Services() {
  const isMobile = useMediaQuery("(max-width: 1199px)");
  const navigate = useNavigate();

  return (
    <div id="Services">
      <div className="container ">
        <div className="tagtitle  mt-4">Service </div>
        <div
          id="carouselExampleSlidesOnly"
          className="carousel slide mt-5 mb-5 ms-3 me-3"
          data-bs-ride="carousel"
          style={{ display: isMobile ? "none" : "block" }}
        >
          <div className="carousel-inner ">
            <div className="carousel-item active text-center">
              <img
                src={"/images/generalimg.jpg"}
                alt=""
                className="img-fluid servimg"
              ></img>
              <div className="carousel-caption ">
                <h5 className="serviceCaption">Doctor Consultation</h5>
                <p className="servicepC">
                  Some representative placeholder content for the first slide.
                </p>
                <div className="text-end servbutton-container">
                  <Button
                    radius="xl"
                    size={isMobile ? "xs" : "sm"}
                    style={{
                      boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
                      backgroundColor: "#2F9D44",

                      minWidth: "100px",
                    }}
                    onClick={() => {
                      navigate("/Services/booking");
                    }}
                  >
                    Set Now
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div
          className=" services-container justify-content-center mb-4"
          style={{ display: isMobile ? "block" : "none" }}
        >
          <div className="serv-imgcontainer text-center">
            <img
              src={"/images/genserv-img.png"}
              alt=""
              className="img-fluid genserv-img"
            ></img>
          </div>
          <div className="container-fluid services-info ">
            <p className="serv-text m-3 pt-1 " id="serv-textid">
              Doctor Consultation
            </p>
            <p className="serv-sub m-3" id="serv-subid">
              Some representative placeholder content for the first slide.
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

                  minWidth: "100px",
                }}
                onClick={() => {
                  navigate("/Services/booking");
                }}
              >
                Set Now
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Services;
