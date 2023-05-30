import { Modal, CloseButton } from "react-bootstrap";
import { TextInput, Input } from "@mantine/core";
import BackProceed from "../../Reusable_Components/Buttons--BackProceed";
import { useState } from "react";
import { notifications } from "@mantine/notifications";
import axios from "axios";
import RequestLoadingOverlay from "./RequestLoadingOverlay";



export default function HeadAdminProfile ( props) {

    const EditedNotif = () => {
        notifications.show({
          title: "Head Admin Information Edited",
          color: "dark",
          autoClose: 2000,
        });
      };
      const [networkError, setNetworkError] = useState(false);

      const [loading, setLoading] = useState(false); 

    const [formErrors, setFormErrors] = useState({});
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
    
        setFormErrors(errors);
    
        // Return true if there are no errors, false otherwise
        return Object.keys(errors).length === 0;
      };

      const [formData, setFormData] = useState({
        firstName: props.fname,
        lastName: props.lname,
      });
    
      const [origFormData, setOrigFormData] = useState({
        firstName: props.fname,
        lastName: props.lname,
    });

    const [noChangeError, setNoChangeError] = useState(false);

    

    const formstyles = {
        input: {
          borderColor: "rgba(0, 0, 0, 0.5);",
          "&:focus": {
            borderColor: "#80bdff",
            boxShadow: "0 0 0 0.2rem rgba(0, 123, 255, 0.25)",
          },
        },
      };
      const [editFields, setEditFields] = useState({
        firstName: false,
        lastName: false,
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

    const hasChanges =
      formData.firstName !== origFormData.firstName ||
      formData.lastName !== origFormData.lastName;
  
    const isValid = validateForm();

    if (!hasChanges) {
      setNoChangeError(true);
      return;
    } else if (isValid && hasChanges) {
      setNoChangeError(false);
      const postData = {
        headModel: {
          head_ID: props.Id,
          head_Fname: formData.firstName,
          head_Lname: formData.lastName,
    
        },
      };

      try {
        setLoading(true);
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
        console.log("Admim information updated successfully:", response.data);
        setOrigFormData((prevOrigFormData) => ({
          ...prevOrigFormData,
          firstName: formData.firstName,
          lastName: formData.lastName,
        }));
        props.setUpdate((prev) => !prev);
        setLoading(false);

      } catch (error) {
        setNetworkError(true);
        console.error("Error updating Admin information:", error);
      }
    }
  };

  const handleChange = (event, fieldName) => {
    const { value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [fieldName]: value,
    }));
  };

  const handleCancel = () => {
    props.handleCloseProfile();
    setFormErrors({});
    setNoChangeError(false);
    setNetworkError(false);
    setEditFields({
      firstName: false,
      lastName: false,
    });
    setLoading(false);
    setFormData((prevFormData) => ({
      ...prevFormData,
      firstName: origFormData.firstName,
      lastName: origFormData.lastName,
    }));
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
            className="mb-3"
          >
            <div style={{ flex: "1", textAlign: "center" }} className="ms-4">
              MANAGE PROFILE
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
        <Input.Wrapper label="First Name" className="mb-2">
            <label
                  className="edit-NurseInfo mt-2 ms-2"
                  onClick={() => handleEditFieldToggle("firstName")}
                >
                    Edit
            </label>
            <TextInput
             value={formData.firstName}
            styles={formstyles}
            disabled={!isFieldEditable("firstName")}
            onChange={(e) => handleChange(e, "firstName")}


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
            value={formData.lastName}
            styles={formstyles}
            disabled={!isFieldEditable("lastName")}
            onChange={(e) => handleChange(e, "lastName")}


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
                className="confirmbutton mt-4 "
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
        </RequestLoadingOverlay>

    </Modal>
    
    
    
    </>





   );
}