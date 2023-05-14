import axios from "axios";
import { createContext, useEffect, useReducer, useState } from "react";
import Card from "./LandingPage--Card";
import { Reducer, initialState } from "./Reducers/Lading_Page";
export default function LandingPage(props) {
  const token = localStorage.getItem("userToken");
  const [state, dispatch] = useReducer(Reducer, initialState);

  useEffect(() => {
    const getPatients = async () => {
      try {
        const response = await axios.get("/user/get-patients", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const { data } = response.data;
        dispatch({
          type: "FETCH_SUCCESS",
          payload: { count: data.count, patientList: data.patientList },
        });
        setTimeout(() => {
          dispatch({ type: "LOADING_FINISHED" });
        }, 200);
      } catch (err) {
        dispatch({ type: "FETCH_ERROR" });
      }
    };
    getPatients();
  }, []);
  return (
    <>
      <div className="Track--main_container">
        <div className="Track--sub_container">
          <div className="Track--tagtitle ">Tracker</div>
          <div className="sub-title">
            <p>
              Manage and Track your appointment using your Registered Email
              Address
            </p>
          </div>
          <div className="patient-list_Container">
            <Card
              patientList={state.patientList}
              loading={state.loading}
              setPatient_ID={props.setPatient_ID}
            />
          </div>
          <p className="end-title">
            With your registered email address, we were able to locate{" "}
            {state.count} patient {state.count > 1 ? "records" : "record"}
          </p>
          <p className="end-title">
            click an option to <span style={{ color: "red" }}>continue</span>
          </p>
        </div>
      </div>
    </>
  );
}
