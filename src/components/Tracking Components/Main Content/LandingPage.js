import axios from "axios";
import { useEffect, useReducer } from "react";
import { ErrorHandler } from "../../../utils/errorHandler";
import Card from "./LandingPage--Card";
import { Reducer, initialState } from "./Reducers/Lading_Page";
export default function LandingPage(props) {
  const token = localStorage.getItem("userToken");
  const [state, dispatch] = useReducer(Reducer, initialState);

  useEffect(() => {
    const getPatients = async () => {
      try {
        const response = await axios.get(
          process.env.REACT_APP_ONLINE + "/user/get-patients",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const { data } = response.data;
        dispatch({
          type: "FETCH_SUCCESS",
          payload: { count: data.count, patientList: data.patientList },
        });
        setTimeout(() => {
          dispatch({ type: "LOADING_FINISHED" });
        }, 200);
      } catch (error) {
        dispatch({ type: "FETCH_ERROR" });
        ErrorHandler(error, props.setShowExpire);
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
            <Card patientList={state.patientList} loading={state.loading} />
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
