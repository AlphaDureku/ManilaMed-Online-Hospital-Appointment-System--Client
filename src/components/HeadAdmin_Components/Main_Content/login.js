import { Button } from "@mantine/core";
import axios from "axios";
import {
  MDBCard,
  MDBCardBody,
  MDBCol,
  MDBContainer,
  MDBIcon,
  MDBInput,
  MDBRow,
} from "mdb-react-ui-kit";
import { useState } from "react";

export default function Login() {
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });
  const [error, setError] = useState(false);

  const onChangeHandler = (event) => {
    setError(false);
    setCredentials((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    const { data } = await axios.post(
      "https://server-production-e6a5.up.railway.app/head-admin/login",
      credentials
    );
    if (data.data.status) {
      //Set token authentication
      localStorage.setItem("token", data.data.token);
      console.log("login success");
    } else {
      setError(true);
    }
  };
  return (
    <div className="login--wrapper">
      <MDBContainer className="login--contentContainer">
        <MDBCard>
          <MDBRow className="g-0">
            <MDBCol md="6" className="login-H-leftContent">
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
                  Sign into your admin account
                </h5>

                <form onSubmit={onSubmitHandler}>
                  <MDBInput
                    wrapperClass="mb-4"
                    label="Email address"
                    type="text"
                    name="username"
                    value={credentials.username}
                    size="lg"
                    onChange={onChangeHandler}
                  />
                  <MDBInput
                    wrapperClass="mb-4"
                    label="Password"
                    type="password"
                    name="password"
                    value={credentials.password}
                    size="lg"
                    onChange={onChangeHandler}
                  />
                  <Button
                    type="submit"
                    variant="gradient"
                    className="login--Btn"
                    gradient={{ from: "black", to: "grey", deg: 105 }}
                  >
                    Login
                  </Button>
                </form>
                {error ? (
                  <p
                    className="shake-error"
                    style={{
                      margin: "0 auto",
                      color: "red",
                      fontWeight: "600",
                    }}
                  >
                    Wrong credentials
                  </p>
                ) : (
                  ""
                )}
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
