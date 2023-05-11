import {
  MDBCard,
  MDBCardBody,
  MDBCol,
  MDBContainer,
  MDBIcon,
  MDBInput,
  MDBRow,
} from "mdb-react-ui-kit";
import React from "react";

export default function Login() {
  return (
    <div className="login--wrapper">
      <MDBContainer className="login--contentContainer">
        <MDBCard>
          <MDBRow className="g-0">
            <MDBCol md="6" className="login--leftContent">
              <div>
                Making Appointments easy for you{" "}
                <img
                  src="/images/medlogo.png"
                  height="30"
                  style={{ marginBottom: "5%" }}
                  alt=""
                />
              </div>
            </MDBCol>

            <MDBCol md="6">
              <MDBCardBody className="d-flex flex-column">
                <div className="d-flex flex-row mt-2">
                  <MDBIcon
                    fas
                    icon="cubes fa-3x me-3"
                    style={{ color: "#ff6219" }}
                  />
                  <img src="/images/ManilaMed-Logo.png" alt="" />
                </div>

                <h5
                  className="fw-normal my-4 pb-3"
                  style={{ letterSpacing: "1px" }}
                >
                  Sign into your nurse account
                </h5>

                <MDBInput
                  wrapperClass="mb-4"
                  label="Email address"
                  id="formControlLg"
                  type="email"
                  size="lg"
                />
                <MDBInput
                  wrapperClass="mb-4"
                  label="Password"
                  id="formControlLg"
                  type="password"
                  size="lg"
                />

                <button className="mb-4 px-5" color="dark" size="md">
                  Login
                </button>
                <a className="small text-muted" href="#!">
                  Forgot password?
                </a>
              </MDBCardBody>
            </MDBCol>
          </MDBRow>
        </MDBCard>
      </MDBContainer>
    </div>
  );
}
