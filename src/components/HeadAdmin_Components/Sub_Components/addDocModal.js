import {
  Button,
  Input,
  MultiSelect,
  NativeSelect,
  Select,
  TextInput,
} from "@mantine/core";
import { notifications } from "@mantine/notifications";
import axios from "axios";
import { useContext, useState } from "react";
import { CloseButton, Container } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import { IMaskInput } from "react-imask";
import { DashboardContext } from "../Main_Content/Dashboard";

const AddDoctorModal = (props) => {
  const dashboardData = useContext(DashboardContext);

  const HmoLists = dashboardData?.dashboardData?.data?.HmoLists || [];
  const SpecializationList =
    dashboardData?.dashboardData?.data?.SpecializationList || [];

  const HMOListsData = HmoLists.map((item) => ({
    value: item.HMO_ID,
    label: item.HMO_Name,
  }));

  const specData = [
    { value: "", label: "Specialization" },
    ...SpecializationList.map((item) => ({
      value: item.specialization_ID,
      label: item.specialization_Name,
    })),
  ];

  

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    gender: "",
    contactNumber: "",
    roomNumber: "",
    specialization: "",
    hmo: [],
  });



  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  const [formErrors, setFormErrors] = useState({
    firstName: false,
    lastName: false,
    gender: false,
    specialization: false,
    hmo: false,
    email: false,
    contactNumber: false,
    roomNumber: false,
  });
  const [serverError, setServerError] = useState(null);

  const validateForm = () => {
    const errors = {};

    // Check if firstName is empty
    if (formData.firstName.trim() === "") {
      errors.firstName = true;
    }

    // Check if lastName is empty
    if (formData.lastName.trim() === "") {
      errors.lastName = true;
    }

    // Check if gender is empty
    if (formData.gender === "") {
      errors.gender = true;
    }

    // Check if specialization is empty
    if (formData.specialization === "") {
      errors.specialization = true;
    }

    // Check if hmo is empty
    if (formData.hmo.length === 0) {
      errors.hmo = true;
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

    // Check if roomNumber is empty
    if (formData.roomNumber.trim() === "") {
      errors.roomNumber = true;
    }

    setFormErrors(errors);

    // Return true if there are no errors
    return Object.values(errors).every((error) => !error);
  };


  const handleSubmit = (event) => {
    event.preventDefault();

    // Validate the form
    if (validateForm()) {
      // Form is valid, proceed with submission

      // Retrieve the token from local storage
      const token = localStorage.getItem("token");
      console.log(`token: ${token}`);

      // Send a POST request to the backend server
      axios
        .post(
          process.env.REACT_APP_ONLINE + "/head-admin/add-doctor",
          {
            Fname: formData.firstName,
            Lname: formData.lastName,
            gender: formData.gender,
            email: formData.email,
            contact: formData.contactNumber,
            room: formData.roomNumber,
            specialization_ID: formData.specialization,
            hmo_ID: formData.hmo,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((response) => {
          // Handle the response from the server
          console.log(response.data);
          handleCloseModal();
          setServerError("");
          setFormData({
            firstName: "",
            lastName: "",
            email: "",
            gender: "",
            contactNumber: "",
            roomNumber: "",
            specialization: "",
            hmo: [],
          });
        // Trigger the page reload
        window.location.reload();
           // Store the value in localStorage
        localStorage.setItem("doctorAdded", "true");

        })
        .catch((error) => {
          // Handle any errors
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
        });
    }
  };

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
      gender: false,
      hmo: false,
      specialization: false,
      email: false,
      contactNumber: false,
      roomNumber: false,
    });
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      gender: "",
      contactNumber: "",
      roomNumber: "",
      specialization: "",
      hmo: [],
    });
    setServerError(" ");

    props.handleClose();
  };

  return (
    <Modal
      show={props.show}
      onHide={handleCloseModal}
      centered
      size="md"
      keyboard={false}
      backdrop="static"
    >
      <Modal.Body style={{ margin: "5%", fontWeight: "600" }}>
        <div style={{ display: "flex", alignItems: "center" }} className="mb-3">
          <div style={{ flex: "1", textAlign: "center" }} className="ms-4">
            ADD DOCTOR
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
            <div style={{ color: "red", fontSize: "14px" }}>{serverError}</div>
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
              error={formErrors.firstName}
            />
          </Input.Wrapper>
          <Input.Wrapper label="Last Name" className="mb-2">
            <TextInput
              name="lastName"
              placeholder="Last Name"
              value={formData.lastName}
              onChange={handleChange}
              styles={formstyles}
              error={formErrors.lastName}
            />
          </Input.Wrapper>
          <Input.Wrapper label="Gender" className="mb-2">
            <Select
              name="gender"
              data={[
                { value: "M", label: "Male" },
                { value: "F", label: "Female" },
              ]}
              placeholder="Gender"
              value={formData.gender}
              onChange={(value) =>
                setFormData((prevFormData) => ({
                  ...prevFormData,
                  gender: value,
                }))
              }
              styles={formstyles}
              error={formErrors.gender}
            />
          </Input.Wrapper>
          <Input.Wrapper label="Specialization" className="mb-2">
            <NativeSelect
              name="specialization"
              data={specData}
              placeholder="Specialization"
              value={formData.specialization}
              onChange={(event) =>
                setFormData((prevFormData) => ({
                  ...prevFormData,
                  specialization: event.target.value,
                }))
              }
              styles={formstyles}
              error={formErrors.specialization}
            />
          </Input.Wrapper>
          <Input.Wrapper label="Select HMO" className="mb-2">
            <MultiSelect
              name="hmo"
              data={HMOListsData}
              placeholder="HMO"
              searchable
              clearable
              nothingFound="Nothing found"
              value={formData.hmo}
              onChange={(value) =>
                setFormData((prevFormData) => ({ ...prevFormData, hmo: value }))
              }
              styles={formstyles}
            />
          </Input.Wrapper>
          <Input.Wrapper label="Email" className="mb-2">
            <TextInput
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              styles={formstyles}
              error={formErrors.email && "Invalid email."}
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
          <Input.Wrapper label="Room Number" className="mb-2">
            <Input
              component={IMaskInput}
              mask="000"
              placeholder="Room Number"
              value={formData.roomNumber}
              onChange={(event) =>
                setFormData((prevFormData) => ({
                  ...prevFormData,
                  roomNumber: event.target.value,
                }))
              }
              styles={formstyles}
              error={formErrors.roomNumber}
            />
          </Input.Wrapper>
          <div style={{ textAlign: "center" }}>
            {(formErrors.firstName ||
              formErrors.lastName ||
              formErrors.gender ||
              formErrors.specialization ||
              formErrors.hmo ||
              formErrors.email ||
              formErrors.contactNumber ||
              formErrors.roomNumber) && (
              <div style={{ color: "red", fontSize: "14px" }}>
                Please enter all required information .
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
    </Modal>
  );
};

export default AddDoctorModal;