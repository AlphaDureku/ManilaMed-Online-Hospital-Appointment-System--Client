export const initialState = {
  patient_first_name: "",
  patient_middle_name: "",
  patient_last_name: "",
  patient_address: "",
  patient_contact_number: "",
  dateOfBirth: "",
  isDisabled: true,
};

export const Reducer = (state, action) => {
  switch (action.type) {
    case "FETCH_SUCCESS":
      return {
        ...state,
        patient_first_name: action.payload.patient_first_name,
        patient_middle_name: action.payload.patient_middle_name || "",
        patient_last_name: action.payload.patient_last_name,
        patient_address: action.payload.patient_address,
        patient_contact_number: action.payload.patient_contact_number,
        dateOfBirth: action.payload.dateOfBirth,
      };
    case "CHANGE_INPUT":
      return {
        ...state,
        [action.payload.name]: action.payload.value,
      };
    case "TOGGLE":
      return {
        ...state,
        isDisabled: !state.isDisabled,
      };

    default:
  }
};
