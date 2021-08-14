import { State } from "./state";
import { Passenger, Diagnosis } from "../types";

export type Action =
  | {
      type: "SET_PATIENT_LIST";
      payload: Passenger[];
    }
  | {
      type: "ADD_PATIENT";
      payload: Passenger;
    }
  | {
      type: "UPDATE_PATIENT";
      payload: Passenger;
    }
  | {
      type: "SET_DIAGNOSIS_LIST";
      payload: Diagnosis[];
  };


export const setPassengerList = (patientList: Passenger[]): Action => {
  return {
    type: 'SET_PATIENT_LIST',
    payload: patientList
  };
};

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "SET_PATIENT_LIST":
      return {
        ...state,
        passengers: {
          ...action.payload.reduce(
            (memo, patient) => ({ ...memo, [patient.id]: patient }),
            {}
          ),
          ...state.passengers
        }
      };
    case "ADD_PATIENT":
      return {
        ...state,
        passengers: {
          ...state.passengers,
          [action.payload.id]: action.payload
        }
      };
    case "SET_DIAGNOSIS_LIST":
      return {
        ...state,
        diagnosis: {
          ...action.payload.reduce(
            (memo, diagnosis) => ({ ...memo, [diagnosis.code]: diagnosis }),
            {}
          ),
          ...state.diagnosis
        }
      };  
    default:
      return state;
  }
};
