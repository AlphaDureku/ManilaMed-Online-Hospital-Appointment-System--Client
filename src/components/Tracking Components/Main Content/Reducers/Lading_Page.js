export const initialState = {
  loading: true,
  data: [],
  count: 0,
};
export const Reducer = (state, action) => {
  switch (action.type) {
    case "FETCH_SUCCESS":
      return {
        ...state,
        patientList: action.payload.patientList,
        count: action.payload.count,
      };
    case "LOADING_FINISHED":
      return {
        ...state,
        loading: false,
      };
    case "FETCH_ERROR":
      return {
        data: null,
        loading: false,
        error: action.payload,
      };
    default:
  }
};
