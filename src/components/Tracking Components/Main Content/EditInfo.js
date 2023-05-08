import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function EditInfo() {
  const [isDisabled, setIsDisabled] = useState(true);
  const [currentPatient, setCurrentPatient] = useState({
    patient_first_name: "",
    patient_middle_name: "",
    patient_last_name: "",
    patient_address: "",
    patient_contact_number: "",
    dateOfBirth: "",
  });
  const token = localStorage.getItem("userToken");
  const { id } = useParams();
  const navigate = useNavigate();
  document.title = "Patient Information";

  useEffect(() => {
    const getPatientInfo = async () => {
      const response = await axios.get(`/user/get-info/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const { data } = response.data;
      setCurrentPatient(data);
    };
    getPatientInfo();
  }, [id]);

  async function enableHandler() {
    setIsDisabled((prev) => !prev);
    if (!isDisabled) {
      const res = await axios.post(
        "/user/edit-patient",
        {
          info: currentPatient,
          Patient_ID: id,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    }
  }
  function backButtonHandler() {
    if (!isDisabled) {
      let confirmed = window.confirm(
        "Are you sure you wanted to discard your changes?"
      );
      if (confirmed) {
        navigate("/user");
        return;
      } else {
        return;
      }
    }
    navigate(-1);
  }
  function onChangeHandler(event) {
    const { name, value } = event.target;
    setCurrentPatient((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  return (
    <>
      <div className="edit-title">Edit Personal Information</div>
      <div className="editPage-Container">
        <div className="edit-gray">Email: templanzamark2002@gmail.com</div>
        <div className="edit-gray">Gender: M</div>
        <div className="info-row">
          <div className="edit-legend">First Name:</div>
          <input
            className="form-control edit-input"
            name="patient_first_name"
            value={currentPatient.patient_first_name}
            disabled={isDisabled}
            onChange={onChangeHandler}
          ></input>
        </div>
        <div className="info-row">
          <div className="edit-legend">Middle Name:</div>
          <input
            className="form-control edit-input"
            name="patient_middle_name"
            value={currentPatient.patient_middle_name}
            disabled={isDisabled}
            onChange={onChangeHandler}
          ></input>
        </div>
        <div className="info-row">
          <div className="edit-legend">Last Name:</div>
          <input
            className="form-control edit-input"
            name="patient_last_name"
            value={currentPatient.patient_last_name}
            disabled={isDisabled}
            onChange={onChangeHandler}
          ></input>
        </div>
        <div className="info-row">
          <div className="edit-legend">Date of Birth</div>
          <input
            className="form-control edit-input"
            name="dateOfBirth"
            type="date"
            value={currentPatient.dateOfBirth}
            disabled={isDisabled}
            onChange={onChangeHandler}
          ></input>
        </div>
        <div className="info-row">
          <div className="edit-legend"> House Address:</div>
          <input
            className="form-control edit-input"
            name="patient_address"
            value={currentPatient.patient_address}
            disabled={isDisabled}
            onChange={onChangeHandler}
          ></input>
        </div>
        <div className="info-row">
          <div className="edit-legend">Contact Number: </div>
          <input
            className="form-control edit-input"
            name="patient_contact_number"
            value={currentPatient.patient_contact_number}
            disabled={isDisabled}
            onChange={onChangeHandler}
          ></input>
        </div>
        <div className="edit-Button_Row">
          <button
            className="btn btn-success btn edit-back"
            onClick={() => backButtonHandler()}
          >
            Back
          </button>
          <button
            className="btn btn-success btn edit-save"
            onClick={() => enableHandler()}
          >
            {isDisabled ? "Edit" : "Save Changes"}
          </button>
        </div>
      </div>
    </>
  );
}
