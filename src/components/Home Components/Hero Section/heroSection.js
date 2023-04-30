import { Button } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { scroller } from "react-scroll";
const handleClick = (componentId) => {
  scroller.scrollTo(componentId, {
    smooth: true,
    offset: -50,
    duration: 100,
  });
};

function HeaderImg() {
  const isMobile = useMediaQuery("(max-width: 470px)");

  // HERO SECTION
  return (
    <div className="HeaderImg ">
      <div className="headerwave-container ">
        <div className=" headerinfo   ">
          <p className="homeinfo ">Making appointments easy for you. </p>

          <Button
            radius="xl"
            size={isMobile ? "sm" : "md"}
            color=""
            className="headerbutton"
            onClick={() => handleClick("Services")}
            styles={(headerbuttontheme) => ({
              root: {
                backgroundColor: "#24B7E9",

                "&:hover": {
                  backgroundColor: headerbuttontheme.fn.darken("#2F9D44", 0.05),
                },
              },
            })}
            style={{ display: "block" }}
          >
            Set Appointment
          </Button>
        </div>
      </div>
      <div className="headermed-container">
        <div className="homefloatinginfo-container">
          <div>
            <p className="floatinginfotitle ">
              Only our best,<br></br> to make you feel better.
            </p>
          </div>
          <div>
            <p className="floatinginfodescription ">
              Making you feel better is our commitment. We take pride in our
              team of dedicated and compassionate doctors and medical staff who
              are ready to assist you with your medical needs.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HeaderImg;
