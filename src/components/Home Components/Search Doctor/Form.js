import { useState } from "react";
import { Button } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";

export default function Form(props) {
  // for responsiveness
  const smallScreen = useMediaQuery(
    "(min-width: 701px) and (max-width: 1255px)"
  );
  const isMobile = useMediaQuery("(max-width:700px");
  const buttonwidthS = smallScreen
    ? "250px"
    : "100px" | isMobile
    ? "150px"
    : "100px";

  // ** Process Inputs
  const [formData, setFormData] = useState({
    Fname: "",
    Lname: "",
    specialization: "",
    HMO: "",
  });
  const { specialization, hmo } = props.selectValues;
  function OnChangeHandler(event) {
    const { name, value } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }
  function OnSubmitHander(event) {
    props.setCurrentPage(1);
    event.preventDefault();
    props.setQuery(formData);
  }
  function CleanUp() {
    setFormData({ Fname: "", Lname: "", specialization: "", HMO: "" });
    props.setQuery({ Fname: "", Lname: "", specialization: "", HMO: "" });
  }
  // *Process Inputs*

  //*Initialize select options
  function setSelectSpecialization() {
    return specialization.map((item, index) => {
      return (
        <option value={item.specialization_ID} key={index}>
          {item.specialization_Name}
        </option>
      );
    });
  }
  function setSelectHMO() {
    return hmo.map((item, index) => {
      return (
        <option key={index} value={item.HMO_ID}>
          {item.HMO_Name}
        </option>
      );
    });
  }
  //*Initialize select options

  //Render
  return (
    <div className="searchForm-container mt-3">
      <div className="tagtitle mt-4 ">Search a Doctor </div>

      <form className="form-search mb-3 formsearchDoctor m-2" onSubmit={OnSubmitHander}>
        <input
          type="text"
          className="form-control searchInput "
          placeholder="Doctor's Last Name"
          name="Lname"
          onChange={OnChangeHandler}
          value={formData.Lname}
        />
        <input
          type="text"
          className="form-control searchInput "
          placeholder="Doctor's First Name"
          name="Fname"
          onChange={OnChangeHandler}
          value={formData.Fname}
        />
        <select
          className="form-select search-responsive"
          name="specialization"
          onChange={OnChangeHandler}
          value={formData.specialization}
        >
          <option value="" defaultValue>
            Select Specialization
          </option>
          {setSelectSpecialization()}
        </select>
        <select
          className="form-select search-responsive"
          name="HMO"
          onChange={OnChangeHandler}
          value={formData.HMO}
        >
          <option value="" defaultValue>
            Select HMO Accreditation
          </option>
          {setSelectHMO()}
        </select>
        <div style={{ textAlign: "center", margin: "5px" }}>
          <Button
            radius={smallScreen ? "md" : "xl" | isMobile ? "md" : "xl"}
            size={isMobile ? "xs" : "sm"}
            onClick={OnSubmitHander}
            style={{
              boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
              backgroundColor: "#24B7E9",

              minWidth: buttonwidthS,
            }}
          >
            Search
          </Button>
        </div>
        <div style={{ textAlign: "center" }}>
          <Button
            radius={smallScreen ? "md" : "xl" | isMobile ? "md" : "xl"}
            size={isMobile ? "xs" : "sm"}
            onClick={CleanUp}
            style={{
              boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
              backgroundColor: "#FF0000",

              minWidth: buttonwidthS,
            }}
          >
            Clear
          </Button>
        </div>
      </form>
    </div>
  );
}
