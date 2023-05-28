import { Input, PasswordInput, Switch, TextInput } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import axios from "axios";
import { useEffect, useState } from "react";
import { CloseButton, Modal } from "react-bootstrap";
import BackProceed from "../../Reusable_Components/Buttons--BackProceed";
import RequestLoadingOverlay from "./RequestLoadingOverlay";

export default function EditSecInfo(props) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    contactNumber: "",
    username: "",
    password: "",
  });
  const [origFormData, setOrigFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    contactNumber: "",
    username: "",
    password: "",
  });
  const [formErrors, setFormErrors] = useState({});
  const [editFields, setEditFields] = useState({
    firstName: false,
    lastName: false,
    email: false,
    contactNumber: false,
    username: false,
    password: false,
  });

  const EditedNotif = () => {
    notifications.show({
      title: "Secretary Information Edited",
      color: "dark",
      autoClose: 2000,
    });
  };

  const [noChangeError, setNoChangeError] = useState(false);
  const [networkError, setNetworkError] = useState(false);

  useEffect(() => {
    getNurseInfo();
  }, [props.openModal]);

  const getNurseInfo = async () => {
    setLoading(true);
    const token = localStorage.getItem("headToken");
    const nurseId = props.selectedNurse.id;
    try {
      const response = await axios.get(
        process.env.REACT_APP_ONLINE +
          `/head-admin/nurse-info?nurse_ID=${nurseId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = response.data.data;

      if (data !== null) {
        setFormData({
          firstName: data.nurse_Fname || "",
          lastName: data.nurse_Lname || "",
          email: data.nurse_Email || "",
          contactNumber: data.nurse_Contact || "",
          username: data.nurse_Username || "",
          password: "",
        });
        setOrigFormData({
          firstName: data.nurse_Fname || "",
          lastName: data.nurse_Lname || "",
          email: data.nurse_Email || "",
          contactNumber: data.nurse_Contact || "",
          username: data.nurse_Username || "",
          password: "",
        });
      }
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    const nurseId = props.selectedNurse.id;
    const token = localStorage.getItem("headToken");

    const hasChanges =
      formData.firstName !== origFormData.firstName ||
      formData.lastName !== origFormData.lastName ||
      formData.email !== origFormData.email ||
      formData.contactNumber !== origFormData.contactNumber ||
      formData.username !== origFormData.username ||
      formData.password !== "";

    const isValid = validateForm();

    if (!hasChanges) {
      setNoChangeError(true);
      setLoading(false);
      return;
    } else if (isValid && hasChanges) {
      setNoChangeError(false);
      const postData = {
        NurseModel: {
          nurse_ID: nurseId,
          nurse_Username: formData.username,
          nurse_Fname: formData.firstName,
          nurse_Mname: "",
          nurse_Lname: formData.lastName,
          nurse_Email: formData.email,
          nurse_Contact: formData.contactNumber,
          nurse_NewPassword: formData.password,
        },
      };

      try {
        const response = await axios.post(
          process.env.REACT_APP_ONLINE + "/head-admin/update-nurse",
          postData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        handleCancel();
        EditedNotif();
        console.log("Nurse information updated successfully:", response.data);
        props.setUpdate((prev) => !prev);
      } catch (error) {
        setNetworkError(true);
        console.error("Error updating nurse information:", error);
      }
    }
    setLoading(false);
  };

  const handleEditFieldToggle = (fieldName) => {
    setEditFields((prevEditFields) => ({
      ...prevEditFields,
      [fieldName]: !prevEditFields[fieldName],
    }));
  };

  const isFieldEditable = (fieldName) => {
    return editFields[fieldName];
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

    // Only validate the password if it has been edited
    if (
      isFieldEditable("password") &&
      (formData.password === "" || formData.password.length < 6)
    ) {
      errors.password = true;
    }

    setFormErrors(errors);

    // Return true if there are no errors, false otherwise
    return Object.keys(errors).length === 0;
  };

  const handleCancel = () => {
    setFormErrors({});
    setNoChangeError(false);
    setNetworkError(false);
    setEditFields({
      firstName: false,
      lastName: false,
      email: false,
      contactNumber: false,
      username: false,
      password: false,
    });
    props.handleCloseModal();
    setFormData(origFormData);
  };

  return (
    <>
      <Modal
        show={props.openModal}
        onHide={handleCancel}
        centered
        size="md"
        keyboard={false}
        backdrop="static"
      >
        <RequestLoadingOverlay loading={loading}>
          <Modal.Body style={{ margin: "5%", fontWeight: "600" }}>
            <div
              style={{ display: "flex", alignItems: "center" }}
              className="mt-2"
            >
              <div
                style={{ flex: "1", textAlign: "center", fontSize: "1.2rem" }}
                className="ms-4"
              >
                Edit Secretary
              </div>
              <div style={{ marginLeft: "auto" }}>
                <CloseButton onClick={handleCancel} />
              </div>
              {networkError && (
                <div
                  style={{ color: "red", fontSize: "14px" }}
                  className="mt-4"
                >
                  Nrwork Error
                </div>
              )}
            </div>

            <form onSubmit={handleSubmit}>
              <Input.Wrapper label="First Name" className="mb-2">
                <label
                  className="edit-NurseInfo mt-2 ms-2"
                  onClick={() => handleEditFieldToggle("firstName")}
                >
                  Edit
                </label>

                <TextInput
                  name="firstName"
                  placeholder="First Name"
                  value={formData.firstName}
                  onChange={handleChange}
                  styles={formstyles}
                  disabled={!isFieldEditable("firstName")}
                  error={formErrors.firstName && "First Name is required"}
                />
              </Input.Wrapper>
              <Input.Wrapper label="Last Name" className="mb-2">
                <label
                  className="edit-NurseInfo mt-2 ms-2"
                  onClick={() => handleEditFieldToggle("lastName")}
                >
                  Edit
                </label>

                <TextInput
                  name="lastName"
                  placeholder="Last Name"
                  value={formData.lastName}
                  onChange={handleChange}
                  styles={formstyles}
                  disabled={!isFieldEditable("lastName")}
                  error={formErrors.lastName && "Last Name is required"}
                />
              </Input.Wrapper>

              <Input.Wrapper label="Email" className="mb-2">
                <label
                  className="edit-NurseInfo mt-2 ms-2"
                  onClick={() => handleEditFieldToggle("email")}
                >
                  Edit
                </label>

                <TextInput
                  name="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleChange}
                  styles={formstyles}
                  disabled={!isFieldEditable("email")}
                  error={formErrors.email && "Email must be valid"}
                />
              </Input.Wrapper>
              <Input.Wrapper label="Contact Number" className="mb-2">
                <label
                  className="edit-NurseInfo mt-2 ms-2"
                  onClick={() => handleEditFieldToggle("contactNumber")}
                >
                  Edit
                </label>

                <TextInput
                  name="contactNumber"
                  placeholder="Contact Number"
                  value={formData.contactNumber}
                  onChange={handleChange}
                  styles={formstyles}
                  disabled={!isFieldEditable("contactNumber")}
                  error={
                    formErrors.contactNumber && "Contact Number must be valid"
                  }
                />
              </Input.Wrapper>
              <Input.Wrapper label="Username" className="mb-2">
                <label
                  className="edit-NurseInfo mt-2 ms-2"
                  onClick={() => handleEditFieldToggle("username")}
                >
                  Edit
                </label>

                <TextInput
                  name="username"
                  placeholder="Username"
                  value={formData.username}
                  onChange={handleChange}
                  styles={formstyles}
                  disabled={!isFieldEditable("username")}
                  error={
                    formErrors.username &&
                    "Username is Invalid. It must have at least 6 characters"
                  }
                />
              </Input.Wrapper>
              <Input.Wrapper label="New Password" className="mb-2">
                <label
                  className="edit-NurseInfo mt-2 ms-2"
                  onClick={() => handleEditFieldToggle("password")}
                >
                  Edit
                </label>

                <PasswordInput
                  placeholder="Password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  styles={formstyles}
                  disabled={!isFieldEditable("password")}
                  error={
                    formErrors.password &&
                    "Password is Invalid .It must have at least 6 characters"
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
                {noChangeError && (
                  <div
                    style={{ color: "red", fontSize: "14px" }}
                    className="mt-4"
                  >
                    No Changes are made
                  </div>
                )}
              </div>
              <div
                className="confirmbutton mt-3 mb-2"
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  margin: "",
                }}
              >
                <BackProceed
                  leftButton={handleCancel}
                  rightButton={handleSubmit}
                  redButtonText={"Cancel "}
                  blueButtonText={"Update"}
                />
              </div>
            </form>
          </Modal.Body>
        </RequestLoadingOverlay>
      </Modal>
    </>
  );
}
