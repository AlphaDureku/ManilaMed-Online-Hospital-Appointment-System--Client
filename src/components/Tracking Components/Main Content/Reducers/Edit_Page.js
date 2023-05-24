export const initialState = {
  email: "",
  patient_first_name: "",
  patient_middle_name: "",
  patient_last_name: "",
  patient_address: "",
  patient_contact_number: "",
  patient_gender: "",
  dateOfBirth: "",
  errors: {
    email: false,
    patient_first_name: false,
    patient_last_name: false,
    patient_address: false,
    patient_contact_number: false,
    patient_gender: false,
    dateOfBirth: false,
  },
  isDisabled: true,
};

export const Reducer = (state, action) => {
  switch (action.type) {
    case "FETCH_SUCCESS":
      return {
        ...state,
        email: action.payload.email,
        patient_first_name: action.payload.patient_first_name,
        patient_middle_name: action.payload.patient_middle_name || "",
        patient_last_name: action.payload.patient_last_name,
        patient_address: action.payload.patient_address,
        patient_gender: action.payload.patient_gender,
        patient_contact_number: action.payload.patient_contact_number,
        dateOfBirth: action.payload.dateOfBirth,
      };
    case "CHANGE_INPUT":
      return {
        ...state,
        [action.payload.name]: action.payload.value,
      };

    case "SET_ERROR":
      return {
        ...state,
        errors: {
          ...state.errors,
          [action.payload.name]: action.payload.value,
        },
      };
    case "TOGGLE":
      return {
        ...state,
        isDisabled: !state.isDisabled,
      };

    default:
  }
};
