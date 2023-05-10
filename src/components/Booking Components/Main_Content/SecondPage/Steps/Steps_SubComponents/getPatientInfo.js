import { Button, Tooltip } from "@mantine/core";
import { Row } from "react-bootstrap";

export default function GetPatientInfo(props) {
  return (
    <div>
      <div className="bookingtagtitle">
        Patient Information
        <Tooltip
          label="Enter your details to proceed"
          position="bottom"
          className="ms-2 "
        >
          <Button compact variant="outline" size="xs" radius="xl" color="gray">
            ?{" "}
          </Button>
        </Tooltip>
      </div>
      <div className="container-fluid enterpatientinfo"></div>
      <div className="container mt-5 mb-5  enterpatientinfo">
        <div className="row">
          <p style={{ fontWeight: 600 }} className="headerinfolabel">
            Please provide your information. This will be used for your
            appointment{" "}
          </p>
        </div>

        <form>
          <Row className="sppatientInfoRow flex-column flex-md-row">
            <div className="col">
              <label
                className="patientInfolabel mb-3"
                style={{ fontWeight: 500 }}
              >
                First Name
              </label>
              <label
                className="required"
                style={{ color: "#FF0000", fontWeight: 900 }}
              >
                *
              </label>
              <input
                type="text"
                className="form-control"
                id="firstName"
                name="firstName"
                value={props.patientformData.firstName}
                onChange={props.handleInputChange}
              />
              {props.errors.firstName && (
                <div className="patientinfo_error mt-2 ">
                  {props.errors.firstName}
                </div>
              )}
            </div>

            <div className="col">
              <label
                className="patientInfolabel mb-3"
                style={{ fontWeight: 500 }}
              >
                Middle Name
              </label>
              <input
                type="text"
                className="form-control"
                id="middleName"
                name="middleName"
                value={props.patientformData.middleName}
                onChange={props.handleInputChange}
              />
            </div>
            <div className="col">
              <label
                className="patientInfolabel mb-3"
                style={{ fontWeight: 500 }}
              >
                Last Name
              </label>
              <label
                className="required"
                style={{ color: "#FF0000", fontWeight: 900 }}
              >
                *
              </label>
              <input
                type="text"
                className="form-control"
                id="lastName"
                name="lastName"
                value={props.patientformData.lastName}
                onChange={props.handleInputChange}
              />
              {props.errors.lastName && (
                <div className="patientinfo_error mt-2 ">
                  {props.errors.lastName}
                </div>
              )}
            </div>
          </Row>
          <Row className="patientinfoRow flex-column flex-md-row">
            <div className="col">
              <div className="row">
                <div className="col">
                  <label
                    className="patientInfolabel"
                    style={{ fontWeight: 500 }}
                  >
                    Gender
                  </label>
                  <label
                    className="required"
                    style={{ color: "#FF0000", fontWeight: 900 }}
                  >
                    *
                  </label>
                </div>
              </div>
              <div
                className="form-check-inline mt-3  me-4 subp"
                style={{ fontSize: "15px", fontWeight: 500 }}
              >
                <input
                  className="form-check-input"
                  type="radio"
                  name="gender"
                  id="male"
                  value="M"
                  checked={props.patientformData.gender === "M"}
                  onChange={props.handleInputChange}
                />
                <span className="form-check-label" htmlFor="male">
                  {" "}
                  Male
                </span>
              </div>
              <div
                className="form-check-inline mt-3 subp"
                style={{ fontSize: "15px", fontWeight: 500 }}
              >
                <input
                  className="form-check-input"
                  type="radio"
                  name="gender"
                  id="female"
                  value="F"
                  checked={props.patientformData.gender === "F"}
                  onChange={props.handleInputChange}
                />
                <span className="form-check-label" htmlFor="female">
                  {" "}
                  Female
                </span>
              </div>
              {props.errors.gender && (
                <div className="patientinfo_error mt-2 ">
                  {props.errors.gender}
                </div>
              )}
            </div>
            <div className="col">
              <label
                className="patientInfolabeldob mb-3"
                style={{ fontWeight: 500 }}
              >
                Date of Birth
              </label>
              <label
                className="required"
                style={{ color: "#FF0000", fontWeight: 900 }}
              >
                *
              </label>
              <input
                id="dateofBirth"
                className="form-control"
                type="date"
                name="dateOfBirth"
                value={props.patientformData.dateOfBirth}
                onChange={props.handleInputChange}
              />
              {props.errors.dateOfBirth && (
                <div className="patientinfo_error mt-2 ">
                  {props.errors.dateOfBirth}
                </div>
              )}
            </div>
            <div className="col">
              <label
                className="patientInfolabel mb-3"
                style={{ fontWeight: 500 }}
              >
                Contact Number
              </label>
              <label
                className="required"
                style={{ color: "#FF0000", fontWeight: 900 }}
              >
                *
              </label>
              <input
                type="tel"
                id="contactNumber"
                className="form-control"
                name="contactNumber"
                value={props.patientformData.contactNumber}
                onChange={props.handleInputChange}
              />
              {props.errors.contactNumber && (
                <div className="patientinfo_error mt-2 ">
                  {props.errors.contactNumber}
                </div>
              )}
            </div>
          </Row>
          <Row
            className="patientinfoRow flex-column flex-md-row"
            style={{ maxWidth: "600px" }}
          >
            <div className="col">
              <div className="form-outline">
                <label
                  className="form-label patientInfolabel mb-3"
                  htmlFor="formA"
                  style={{ fontWeight: 500 }}
                >
                  Address
                </label>
                <label
                  className="required"
                  style={{ color: "#FF0000", fontWeight: 900 }}
                >
                  *
                </label>
                <input
                  type="text"
                  id="address"
                  className="form-control"
                  name="address"
                  value={props.patientformData.address}
                  onChange={props.handleInputChange}
                />
                {props.errors.address && (
                  <div className="patientinfo_error mt-2 ">
                    {props.errors.address}
                  </div>
                )}
              </div>
            </div>
          </Row>
        </form>
      </div>
    </div>
  );
}
