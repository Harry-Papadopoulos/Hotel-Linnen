import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { deleteAction } from "../assets/globalState";
import Swal from "sweetalert2";
import { roomKey } from "../assets/logic";

export default function Delete() {
  const update = useSelector((state) => state.update);
  const dispatch = useDispatch();

  const [roomToDelete, setRoomToDelete] = useState("");

  function deleteFromStore(room) {
    return async function (dispatch) {
      await dispatch(deleteAction(room));
      return Promise.resolve();
    };
  }

  async function deleteRoom(e) {
    if ("101" <= roomToDelete && roomToDelete <= "136") {
      let room = roomKey(roomToDelete);
      await dispatch(deleteFromStore(room)).then(() => {
        return null;
      });
      setRoomToDelete("");
    } else {
      Swal.fire({
        title: "Invalid Room Number",
        text: "Please insert a correct room number.",
        animation: false,
      });
    }
  }

  return (
    <div className="delete-container">
      <h2 className="titles">DELETE A ROOM FROM THE CHANGE SCHEDULE:</h2>
      <div className="form-container">
        <form className="room-form">
          <input
            className="inputs"
            type="text"
            value={roomToDelete}
            name="deleteRoom"
            placeholder="Type in the room"
            onChange={(event) => setRoomToDelete(event.target.value)}
            onSubmit={(event) => {
              event.preventDefault();
            }}
          />
          <button
            className="buttons"
            type="button"
            value="Delete"
            onClick={async (e) => {
              await deleteRoom(e);
            }}
          >
            Delete
          </button>
        </form>
      </div>
    </div>
  );
}
