import axios from "axios";
import { useEffect, useReducer, useState } from "react";
import { useNavigate } from "react-router-dom";
import BackProceed from "../../Reusable_Components/Buttons--BackProceed";
import { Reducer, initialState } from "./Reducers/Edit_Page";

export default function EditInfo(props) {
  const navigate = useNavigate();
  document.title = "Patient Information";
  const token = localStorage.getItem("userToken");
  const [state, dispatch] = useReducer(Reducer, initialState);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const getPatientInfo = async () => {
      const response = await axios.get(
        process.env.REACT_APP_ONLINE + `/user/get-info`,
        {
          params: {
            id: localStorage.getItem("patient_ID"),
          },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      dispatch({ type: "FETCH_SUCCESS", payload: response.data.data });
    };
    getPatientInfo();
  }, [token]);

  async function enableHandler() {
    let error = false;
    for (const property in state.errors) {
      if (property === "patient_middle_name") {
        continue;
      }
      if (state.errors[property]) {
        error = true;
        setHasError(true);
      }
    }
    if (!error) {
      dispatch({ type: "TOGGLE" });
      if (!state.isDisabled) {
        await axios.post(
          process.env.REACT_APP_ONLINE + "/user/edit-patient",
          {
            info: state,
            Patient_ID: localStorage.getItem("patient_ID"),
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
      }
    }
  }
  function backButtonHandler() {
    if (!state.isDisabled) {
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
    setHasError(false);
    if (!value && name !== "patient_middle_name") {
      dispatch({ type: "SET_ERROR", payload: { name: name, value: true } });
    } else {
      dispatch({ type: "SET_ERROR", payload: { name: name, value: false } });
    }
    dispatch({ type: "CHANGE_INPUT", payload: { name: name, value: value } });
  }

  return (
    <>
      <div className="edit-title">Edit Personal Information</div>
      <div className="editPage-Container">
        <div className="edit-gray">Email: {state.email}</div>
        <div className="edit-gray">Gender: {state.patient_gender}</div>
        <div className="info-row">
          <div className="edit-legend">First Name:</div>
          <input
            className="form-control edit-input"
            name="patient_first_name"
            value={state.patient_first_name}
            disabled={state.isDisabled}
            onChange={onChangeHandler}
            style={{
              border: state.errors.patient_first_name ? "1px solid red" : "",
            }}
          ></input>
        </div>
        <div className="info-row">
          <div className="edit-legend">Middle Name:</div>
          <input
            className="form-control edit-input"
            name="patient_middle_name"
            value={state.patient_middle_name}
            disabled={state.isDisabled}
            onChange={onChangeHandler}
            style={{
              border: state.errors.patient_middle_name ? "1px solid red" : "",
            }}
          ></input>
        </div>
        <div className="info-row">
          <div className="edit-legend">Last Name:</div>
          <input
            className="form-control edit-input"
            name="patient_last_name"
            value={state.patient_last_name}
            disabled={state.isDisabled}
            onChange={onChangeHandler}
            style={{
              border: state.errors.patient_last_name ? "1px solid red" : "",
            }}
          ></input>
        </div>
        <div className="info-row">
          <div className="edit-legend">Date of Birth</div>
          <input
            className="form-control edit-input"
            name="dateOfBirth"
            type="date"
            value={state.dateOfBirth}
            disabled={state.isDisabled}
            onChange={onChangeHandler}
            style={{ border: state.errors.dateOfBirth ? "1px solid red" : "" }}
          ></input>
        </div>
        <div className="info-row">
          <div className="edit-legend"> House Address:</div>
          <input
            className="form-control edit-input"
            name="patient_address"
            value={state.patient_address}
            disabled={state.isDisabled}
            onChange={onChangeHandler}
            style={{
              border: state.errors.patient_address ? "1px solid red" : "",
            }}
          ></input>
        </div>
        <div className="info-row">
          <div className="edit-legend">Contact Number: </div>
          <input
            className="form-control edit-input"
            name="patient_contact_number"
            value={state.patient_contact_number}
            disabled={state.isDisabled}
            onChange={onChangeHandler}
            style={{
              border: state.errors.patient_contact_number
                ? "1px solid red"
                : "",
            }}
          ></input>
        </div>

        <div className="edit-Button_Row">
          <BackProceed
            leftButton={backButtonHandler}
            rightButton={enableHandler}
            blueButtonText={state.isDisabled ? "Edit" : "Save Changes"}
          />
        </div>
        {hasError ? (
          <p
            className="shake-error"
            style={{
              textAlign: "center",
              fontWeight: 600,
              color: "red",
              marginTop: "3.5%",
            }}
          >
            All fields are required
          </p>
        ) : (
          ""
        )}
      </div>
    </>
  );
}
