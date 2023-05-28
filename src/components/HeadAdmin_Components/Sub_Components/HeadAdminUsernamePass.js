import { Modal, CloseButton } from "react-bootstrap";
import { TextInput, Input, PasswordInput } from "@mantine/core";
import BackProceed from "../../Reusable_Components/Buttons--BackProceed";
import { useState } from "react";
import { notifications } from "@mantine/notifications";
import axios from "axios";

export default function HeadAdminUsernamePass(props) {
  const EditedNotif = () => {
    notifications.show({
      title: "Head Admin Information Edited",
      color: "dark",
      autoClose: 2000,
    });
  };

  const [networkError, setNetworkError] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  const validateForm = () => {
    const errors = {};
  
    // Check if username is empty or has less than 6 characters
    if (formData.username.trim() === "" || formData.username.length < 6) {
      errors.username = true;
    } else {
      errors.username = false; // Clear the error if the username is valid
    }
  
    // Check if password is less than 6 characters
    if (formData.password.length < 6 && formData.password !== origFormData.password) {
      errors.password = true;
    } else {
      errors.password = false; // Clear the error if the password is valid
    }
  
    // Check if password and confirm password are the same
    if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword = true;
    } else {
      errors.confirmPassword = false; // Clear the error if the passwords match
    }
  
    setFormErrors(errors);
  
    // Return true if there are no errors, false otherwise
    return Object.values(errors).every((error) => !error);
  };
  

  const [formData, setFormData] = useState({
    username: props.username,
    password: "",
    confirmPassword: "",
  });

  const [origFormData, setOrigFormData] = useState({
    username: props.username,
    password: "",
    confirmPassword: "",
  });

  const [noChangeError, setNoChangeError] = useState(false);
  const [editFields, setEditFields] = useState({
    username: false,
  });

  const handleEditFieldToggle = (fieldName) => {
    setEditFields((prevEditFields) => ({
      ...prevEditFields,
      [fieldName]: !prevEditFields[fieldName],
    }));
  };

  const isFieldEditable = (fieldName) => {
    return editFields[fieldName];
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    const token = localStorage.getItem("headToken");
  
    const hasUsernameChanged = formData.username !== origFormData.username;
    const hasPasswordChanged = formData.password !== origFormData.password;
    const isValid = validateForm();
  
    if (!hasUsernameChanged && !hasPasswordChanged) {
      setNoChangeError(true);
      return;
    } else if (isValid && (hasUsernameChanged || hasPasswordChanged)) {
      setNoChangeError(false);
      const postData = {
        headModel: {
          head_ID: props.Id,
          head_Username: formData.username,
          head_NewPassword: hasPasswordChanged ? formData.password : null,
        },
      };
  
      try {
        const response = await axios.post(
          process.env.REACT_APP_ONLINE + "/head-admin/update-head",
          postData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        EditedNotif();
        handleCancel();
        console.log("Admin information updated successfully:", response.data);
        props.setUpdate((prev) => !prev);
        setOrigFormData((prevOrigFormData) => ({
          ...prevOrigFormData,
          username: formData.username,
        }));
        
      } catch (error) {
        setNetworkError(true);
        console.error("Error updating Admin information:", error);
      }
    }
  };

  console.log(origFormData.username);
  
  const handleChange = (event, fieldName) => {
    const { value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [fieldName]: value,
    }));
  };

  const handleCancel = () => {
    props.handleCloseUserPass();
    setFormErrors({});
    setNoChangeError(false);
    setNetworkError(false);
    setEditFields({
      username: false,
    });
    setFormData((prevFormData) => ({
        ...prevFormData,
        password: "",
        confirmPassword: "",
      }));
   
   
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
        <Modal.Body style={{ margin: "5%", fontWeight: "600" }}>
          <div
            style={{ display: "flex", alignItems: "center" }}
            className="mb-3"
          >
            <div style={{ flex: "1", textAlign: "center" }} className="ms-4">
              SECURITY
            </div>
            <div style={{ marginLeft: "auto" }}>
              <CloseButton onClick={handleCancel} />
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
            {networkError && (
              <div style={{ color: "red", fontSize: "14px" }}>
                {networkError}
              </div>
            )}
          </div>
          <div>
            <Input.Wrapper label="Username" className="mb-2">
              <label
                className="edit-NurseInfo mt-2 ms-2"
                onClick={() => handleEditFieldToggle("username")}
              >
                Edit
              </label>
              <TextInput
                value={formData.username}
                styles={formstyles}
                disabled={!isFieldEditable("username")}
                onChange={(e) => handleChange(e, "username")}
                error={formErrors.username && "Invalid"}

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
                value={formData.password}
                styles={formstyles}
                onChange={(e) => handleChange(e, "password")}
                disabled={!isFieldEditable("password")}
                error={formErrors.password && "Password must be at least 6 characters"}

              />
            </Input.Wrapper>
            <Input.Wrapper label="Confirm Password" className="mb-2">
              <PasswordInput
                value={formData.confirmPassword}
                styles={formstyles}
                onChange={(e) => handleChange(e, "confirmPassword")}
                error={formErrors.confirmPassword && "Passwords do not match"}
                disabled={!isFieldEditable("password")}


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
              className="confirmbutton mt-4"
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
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}
