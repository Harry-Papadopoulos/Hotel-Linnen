import hotelRooms from "./hotelRooms";
import { combineReducers } from "redux";

const initialState = {};

const updateAction = (room, changes) => {
  return {
    type: "UPDATE_SCHEDULE",
    room: room,
    changes: changes,
  };
};

const initialLoadAction = (data) => {
  return {
    type: "INITIAL_LOAD",
    payload: data,
  };
};

const deleteAction = (room) => {
  return {
    type: "DELETE",
    payload: room,
  };
};

function updateReducer(state = initialState, action) {
  switch (action.type) {
    case "UPDATE_SCHEDULE":
      let newState = {
        ...state,
        [action.room]: action.changes,
      };
      return newState;
    case "INITIAL_LOAD":
      return action.payload;
    case "DELETE":
      let updatedState = { ...state };
      delete updatedState[action.payload];
      return updatedState;
    default:
      return state;
  }
}

// function deleteReducer(state = initialState, action) {
//   switch (action.type) {
//     case "DELETE":
//       let newState = { ...state };
//       delete newState[action.payload];
//       return newState;
//     default:
//       return state;
//   }
// }

// function initialLoadReducer(state = initialState, action) {
//   switch (action.type) {
//     case "INITIAL_LOAD":
//       return action.payload;
//     default:
//       return state;
//   }
// }

const rootReducer = combineReducers({
  update: updateReducer,
  // delete: deleteReducer,
});

export { updateAction, initialLoadAction, deleteAction, rootReducer };
