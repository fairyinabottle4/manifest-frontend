import { State } from "./state";
import { Passenger } from "../types";

export type Action =
  | {
      type: "SET_PASSENGER_LIST";
      payload: Passenger[];
    }
  | {
      type: "ADD_PASSENGER";
      payload: Passenger;
    }
  | {
      type: "UPDATE_PASSENGER";
      payload: Passenger;
    };


export const setPassengerList = (passengerList: Passenger[]): Action => {
  return {
    type: 'SET_PASSENGER_LIST',
    payload: passengerList
  };
};

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "SET_PASSENGER_LIST":
      return {
        ...state,
        passengers: {
          ...action.payload.reduce(
            (memo, passenger) => ({ ...memo, [passenger.id]: passenger }),
            {}
          ),
          ...state.passengers
        }
      };
    case "ADD_PASSENGER":
      return {
        ...state,
        passengers: {
          ...state.passengers,
          [action.payload.id]: action.payload
        }
      };
    default:
      return state;
  }
};
