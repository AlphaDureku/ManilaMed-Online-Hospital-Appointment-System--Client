import { Button, Input, PasswordInput, TextInput } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import axios from "axios";
import { useState } from "react";
import { CloseButton } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import { IMaskInput } from "react-imask";
import RequestLoadingOverlay from "./RequestLoadingOverlay";

const AddSecModal = (props) => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    contactNumber: "",
    username: "",
    password: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  const [formErrors, setFormErrors] = useState({
    firstName: false,
    lastName: false,
    email: false,
    contactNumber: false,
    username: false,
    password: false,
  });

  const AddedNotif = () => {
    notifications.show({
      title: "Secretary Added",
      color: "dark",
      autoClose: 2000,
    });
  };
  const [serverError, setServerError] = useState(null);
  const validateForm = () => {
    const errors = {};

    // Check if firstName is empty or contains numbers
    if (formData.firstName.trim() === "" || /\d/.test(formData.firstName)) {
      errors.firstName = true;
    }

    // Check if lastName is empty or contains numbers
    if (formData.lastName.trim() === "" || /\d/.test(formData.lastName)) {
      errors.lastName = true;
    }

    // Check if email is empty or doesn't match the required format
    if (formData.email.trim() === "" || !/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = true;
    }

    // Check if contactNumber is empty or less than 12 digits
    if (
      formData.contactNumber.trim() === "" ||
      formData.contactNumber.replace(/[^0-9]/g, "").length < 12
    ) {
      errors.contactNumber = true;
    }

    // Check if username is empty or has less than 6 characters
    if (formData.username.trim() === "" || formData.username.length < 6) {
      errors.username = true;
    }

    // Check if password is empty or has less than 6 characters
    if (formData.password.trim() === "" || formData.password.length < 6) {
      errors.password = true;
    }

    setFormErrors(errors);

    // Return true if there are no errors
    return Object.values(errors).every((error) => !error);
  };

  // ...

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (validateForm()) {
      const token = localStorage.getItem("headToken");
      setLoading(true);

      try {
        const response = await axios.post(
          process.env.REACT_APP_ONLINE + "/head-admin/add-nurse",
          {
            Fname: formData.firstName,
            Lname: formData.lastName,
            email: formData.email,
            contact_number: formData.contactNumber,
            username: formData.username,
            password: formData.password,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.data.data === true) {
          handleCloseModal();
          setServerError("");
          setFormErrors({});
          setFormData({
            firstName: "",
            lastName: "",
            email: "",
            contactNumber: "",
            username: "",
            password: "",
          });
          props.setUpdate((prev) => !prev);
          AddedNotif();
        } else if (response.data.data.message === "email already in use") {
          setFormErrors((prevErrors) => ({
            ...prevErrors,
            email: "Email already in use",
          }));
        } else if (response.data.data.message === "username already in use") {
          setFormErrors((prevErrors) => ({
            ...prevErrors,
            username: "Username already in use",
          }));
        }
      } catch (error) {
        console.error(error);

        if (
          error.response &&
          error.response.data &&
          error.response.data.message
        ) {
          setServerError(error.response.data.message);
        } else {
          setServerError("An error occurred. Please try again later.");
        }
      } finally {
        setLoading(false);
      }
    }
  };

  // ...

  const formstyles = {
    input: {
      borderColor: "rgba(0, 0, 0, 0.5);",
      "&:focus": {
        borderColor: "#80bdff",
        boxShadow: "0 0 0 0.2rem rgba(0, 123, 255, 0.25)",
      },
    },
  };

  const handleCloseModal = () => {
    setFormErrors({
      firstName: false,
      lastName: false,
      email: false,
      contactNumber: false,
      username: false,
      password: false,
    });
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      contactNumber: "",
      username: "",
      password: "",
    });
    setServerError(" ");

    props.handleCloseSec();
  };

  return (
    <Modal
      show={props.showSec}
      onHide={handleCloseModal}
      centered
      size="md"
      keyboard={false}
      backdrop="static"
    >
      <RequestLoadingOverlay loading={loading}>
        <Modal.Body style={{ margin: "5%", fontWeight: "600" }}>
          <div
            style={{ display: "flex", alignItems: "center" }}
            className="mb-3"
          >
            <div style={{ flex: "1", textAlign: "center" }} className="ms-4">
              ADD SECRETARY
            </div>
            <div style={{ marginLeft: "auto" }}>
              <CloseButton onClick={handleCloseModal} />
            </div>
          </div>
          <div
            style={{
              display: "flex",
              textAlign: "center",
              justifyContent: "center",
            }}
            className="mb-3"
          >
            {serverError && (
              <div style={{ color: "red", fontSize: "14px" }}>
                {serverError}
              </div>
            )}
          </div>
          <form onSubmit={handleSubmit}>
            <Input.Wrapper label="First Name" className="mb-2">
              <TextInput
                name="firstName"
                placeholder="First Name"
                value={formData.firstName}
                onChange={handleChange}
                styles={formstyles}
                error={formErrors.firstName && "Invalid First Name"}
              />
            </Input.Wrapper>
            <Input.Wrapper label="Last Name" className="mb-2">
              <TextInput
                name="lastName"
                placeholder="Last Name"
                value={formData.lastName}
                onChange={handleChange}
                styles={formstyles}
                error={formErrors.lastName && "Invalid Last Name"}
              />
            </Input.Wrapper>

            <Input.Wrapper label="Email" className="mb-2">
              <TextInput
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                styles={formstyles}
                error={
                  formErrors.email &&
                  (formErrors.email === true
                    ? "Invalid email."
                    : "Email already in use")
                }
              />
            </Input.Wrapper>
            <Input.Wrapper label="Contact Number" className="mb-2">
              <Input
                component={IMaskInput}
                mask="+63 9000000000"
                placeholder="Contact Number"
                value={formData.contactNumber}
                onChange={(event) =>
                  setFormData((prevFormData) => ({
                    ...prevFormData,
                    contactNumber: event.target.value,
                  }))
                }
                onAccept={(value) =>
                  setFormData((prevFormData) => ({
                    ...prevFormData,
                    contactNumber: value,
                  }))
                }
                styles={formstyles}
                error={formErrors.contactNumber && "Invalid Contact Number"}
              />
            </Input.Wrapper>
            <Input.Wrapper label="Username" className="mb-2">
              <TextInput
                name="username"
                placeholder="Username"
                value={formData.username}
                onChange={handleChange}
                styles={formstyles}
                error={
                  formErrors.username &&
                  (formErrors.username === true
                    ? "Invalid email."
                    : "Username already in use")
                }
              />
            </Input.Wrapper>
            <Input.Wrapper label="Password" className="mb-2">
              <PasswordInput
                placeholder="Password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                styles={formstyles}
                error={
                  formErrors.password &&
                  "Invalid Password. It should be atleast 6 characters"
                }
              />
            </Input.Wrapper>
            <div style={{ textAlign: "center" }}>
              {Object.values(formErrors).some((error) => error) && (
                <div
                  style={{ color: "red", fontSize: "14px" }}
                  className="mt-4"
                >
                  Please input all required information.
                </div>
              )}
            </div>
          </form>
          <div
            className="addconfirmbuttonrow mt-3"
            style={{ textAlign: "center" }}
          >
            <Button
              type="submit"
              onClick={handleSubmit}
              style={{
                backgroundColor: "#E0F7FF",
                color: "#000",
                boxShadow: " 0px 4px 4px rgba(0, 0, 0, 0.25)",
                border: " 1px solid #ced4da",
              }}
            >
              ADD
            </Button>
          </div>
        </Modal.Body>
      </RequestLoadingOverlay>
    </Modal>
  );
};

export default AddSecModal;
