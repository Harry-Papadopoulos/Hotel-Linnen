import { createStore } from "redux";
import hotelRooms from "./hotelRooms";

const initialState = {};

const updateAction = (roomUpdate) => {
  return {
    type: "UPDATE_SCHEDULE",
    payload: roomUpdate,
  };
};

function updateReducer(state = initialState, action) {
  switch (action.type) {
    case "UPDATE_SCHEDULE":
      let newState = {
        ...state,
        [action.payload.key]: [action.payload.changes],
      };
      return newState;
    default:
      return state;
  }
}

export { updateAction, updateReducer };
