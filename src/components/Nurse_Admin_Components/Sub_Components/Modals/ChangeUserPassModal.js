import { Input, PasswordInput, TextInput } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { CloseButton, Modal } from "react-bootstrap";
import { ErrorHandler } from "../../../../utils/errorHandler";
import BackProceed from "../../../Reusable_Components/Buttons--BackProceed";
import AdminLoadingOverlay from "../../Main_Content/AdminLoadingOverlay";
import { AdminContext } from "../../Main_Content/Content";
export default function ChangeUserPassModal(props) {
  const [noChangeError, setNoChangeError] = useState(false);

  const [networkError, setNetworkError] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [firstloading, setfirstLoading] = useState(true);
  const { setShowExpire } = useContext(AdminContext);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setfirstLoading(false);
    }, 1000);

    return () => clearTimeout(timeout);
  }, []);
  const EditedNotif = () => {
    notifications.show({
      title: "Admin Information Edited",
      color: "teal",
      autoClose: 2000,
    });
  };

  const [formData, setFormData] = useState({
    username: props.username,
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [origFormData, setOrigFormData] = useState({
    username: props.username,
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

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

  const formstyles = {
    input: {
      borderColor: "rgba(0, 0, 0, 0.5);",
      "&:focus": {
        borderColor: "#80bdff",
        boxShadow: "0 0 0 0.2rem rgba(0, 123, 255, 0.25)",
      },
    },
  };

  const handleChange = (event, fieldName) => {
    const { value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [fieldName]: value,
    }));
  };

  const validateForm = () => {
    const errors = {};

    // Check if username is empty or has less than 6 characters
    if (formData.username.trim() === "" || formData.username.length < 6) {
      errors.username = true;
    } else {
      errors.username = false; // Clear the error if the username is valid
    }
    // Check if old password is less than 8 characters or does not meet the requirements
    if (formData.oldPassword && formData.oldPassword.length < 6) {
      errors.oldPassword = true;
    } else {
      errors.oldPassword = false;
    }
    // Check if new password is less than 8 characters or does not meet the requirements
    if (
      (formData.newPassword && formData.newPassword.length < 8) || // Check if password is provided and less than 8 characters
      (formData.newPassword && !/[A-Z]/.test(formData.newPassword)) || // Check if password is provided and does not have at least one capital letter
      (formData.newPassword && !/\d/.test(formData.newPassword)) // Check if password is provided and does not have at least one number
    ) {
      errors.newPassword = true;
    } else {
      errors.newPassword = false; // Clear the error if the password is valid
    }

    // Check if password and confirm password are the same
    if (formData.newPassword !== formData.confirmPassword) {
      errors.confirmPassword = true;
    } else {
      errors.confirmPassword = false; // Clear the error if the passwords match
    }

    setFormErrors(errors);

    // Return true if there are no errors, false otherwise
    return Object.values(errors).every((error) => !error);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const token = localStorage.getItem("nurseToken");

    const hasUsernameChanged = formData.username !== origFormData.username;
    const hasOldPasswordChanged =
      formData.oldPassword !== origFormData.oldPassword;
    const hasNewPasswordChanged =
      formData.newPassword !== origFormData.newPassword;
    const hasConfPasswordChanged =
      formData.confirmPassword !== origFormData.confirmPassword;

    const isValid = validateForm();

    if (
      !hasUsernameChanged &&
      !hasOldPasswordChanged &&
      !hasNewPasswordChanged &&
      !hasConfPasswordChanged
    ) {
      setNoChangeError(true);
      return;
    } else if (
      isValid &&
      (hasUsernameChanged ||
        hasOldPasswordChanged ||
        hasNewPasswordChanged ||
        hasConfPasswordChanged)
    ) {
      setNoChangeError(false);
      const postData = {
        username: formData.username,
        oldPassword: formData.oldPassword,
        newPassword: formData.newPassword,
      };

      try {
        console.log(postData);
        const response = await axios.post(
          process.env.REACT_APP_ONLINE + "/admin/update-nurse",
          postData,
          {
            withCredentials: true,
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const { data } = response.data;
        if (data.samePassword && !data.duplicate) {
          console.log(data.message);
          props.handleCloseModal();
          props.setUpdate((prev) => !prev);
          EditedNotif();
          setFormData(() => ({
            username: postData.username,
            oldPassword: "",
            newPassword: "",
            confirmPassword: "",
          }));
          handleEditFieldToggle("username");
          handleEditFieldToggle("password");
        } else if (!data.samePassword) {
          console.log("Wrong pasword");
        } else {
          console.log("Duplicate username");
        }
      } catch (error) {
        setNetworkError(true);
        console.error("Error updating Secretary profile:", error);
        ErrorHandler(error, setShowExpire);
      }
    }
  };

  function handleExitModal() {
    props.handleCloseModal();
    setNetworkError(false);
    setFormErrors(false);
    setNoChangeError(false);
    setLoading(false);
    setfirstLoading(false);
  }

  return (
    <>
      <Modal
        show={props.openModal}
        onHide={handleExitModal}
        centered
        size="md"
        keyboard={false}
        backdrop="static"
      >
        <AdminLoadingOverlay loading={loading || firstloading}>
          <Modal.Body style={{ margin: "5%", fontWeight: "600" }}>
            <div
              style={{ display: "flex", alignItems: "center" }}
              className="mb-3"
            >
              <div style={{ flex: "1", textAlign: "center" }} className="ms-4">
                SECURITY
              </div>
              <div style={{ marginLeft: "auto" }}>
                <CloseButton onClick={handleExitModal} />
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
              <Input.Wrapper label="Old Password" className="mb-2">
                <label
                  className="edit-NurseInfo mt-2 ms-2"
                  onClick={() => handleEditFieldToggle("password")}
                >
                  Edit
                </label>
                <PasswordInput
                  value={formData.oldPassword}
                  styles={formstyles}
                  onChange={(e) => handleChange(e, "oldPassword")}
                  error={formErrors.oldPassword && "Old Password is invalid"}
                  disabled={!isFieldEditable("password")}
                />
              </Input.Wrapper>
              <Input.Wrapper label="New Password" className="mb-2 ">
                <PasswordInput
                  value={formData.newPassword}
                  styles={formstyles}
                  onChange={(e) => handleChange(e, "newPassword")}
                  error={
                    formErrors.newPassword &&
                    "Passwords must have atleast 8 characters, one capital and number "
                  }
                  disabled={!isFieldEditable("password")}
                  className="mt-2"
                />
              </Input.Wrapper>
              <Input.Wrapper label="Confirm Password" className="mb-2">
                <PasswordInput
                  value={formData.confirmPassword}
                  styles={formstyles}
                  onChange={(e) => handleChange(e, "confirmPassword")}
                  error={formErrors.confirmPassword && "Passwords do not match"}
                  disabled={!isFieldEditable("password")}
                  className="mt-2"
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
                className="confirmbuttonSec mt-4"
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  margin: "",
                }}
              >
                <BackProceed
                  leftButton={handleExitModal}
                  rightButton={handleSubmit}
                  redButtonText={"Cancel "}
                  blueButtonText={"Update"}
                />
              </div>
            </div>
          </Modal.Body>
        </AdminLoadingOverlay>
      </Modal>
    </>
  );
}
