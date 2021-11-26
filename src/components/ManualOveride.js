import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateAction } from "../Assets/GlobalState";
import DatePicker from "react-date-picker";
import Swal from "sweetalert2";
import { roomKey } from "../Assets/Logic";

export default function ManualOveride() {
  const update = useSelector((state) => state.update);
  const dispatch = useDispatch();

  const [roomToHandle, setRoomToHandle] = useState("");
  const [dateToOveride, setDateToOveride] = useState(new Date());
  const [linnenType, setLinnenType] = useState("");
  const [changes, setChanges] = useState({ sheets: [], towels: [] });

  function addToStore(room, changes) {
    return async function (dispatch) {
      await dispatch(updateAction(room, changes));
      return Promise.resolve();
    };
  }

  async function overideRoom(e) {
    if ("101" <= roomToHandle && roomToHandle <= "136" && linnenType) {
      let room = roomKey(roomToHandle);
      await dispatch(addToStore(room, changes)).then(() => {
        return null;
      });
      setRoomToHandle("");
    } else {
      Swal.fire({
        title: "Invalid Room or Linnen Type",
        text: "Please check the room number or linnen type.",
        animation: false,
      });
    }
  }

  async function insertChange() {
    if ("101" <= roomToHandle && roomToHandle <= "136" && linnenType) {
      let date = dateToOveride.toDateString();
      await setChanges(() => {
        let newChanges = changes;
        return {
          ...newChanges,
          [linnenType]: [...newChanges[linnenType], date],
        };
      });
    } else {
      Swal.fire({
        title: "Invalid Room or Linnen Type",
        text: "Please check the room number or linnen type.",
        animation: false,
      });
    }
  }

  return (
    <div id="overide-container">
      <h2 className="titles">MANUALLY OVERIDE THE SCHEDULE:</h2>
      <div id="overide-form-container">
        <form id="overide-form">
          <label className="labels">Input the room No.:</label>
          <input
            className="inputs"
            type="text"
            value={roomToHandle}
            name="overideForm"
            placeholder="Type in the room"
            onChange={(event) => setRoomToHandle(event.target.value)}
            onSubmit={(event) => {
              event.preventDefault();
            }}
          />

          <label className="labels">Linnen type:</label>
          <select
            className="inputs"
            value={linnenType}
            onChange={(event) => setLinnenType(event.target.value)}
            name="linnenType"
          >
            <option value="choose"> </option>
            <option value="sheets">Sheets</option>
            <option value="towels">Towels</option>
          </select>

          <div className="date-picker">
            <label className="labels">Choose date:</label>
            <div>
              <DatePicker
                dayPlaceholder="dd"
                monthPlaceholder="mm"
                yearPlaceholder="yyyy"
                format="dd-MM-y"
                value={dateToOveride}
                onChange={(date) => setDateToOveride(date)}
              />
            </div>
          </div>
          <div id="overide-buttons">
            <button
              className="buttons"
              type="button"
              value="Add"
              onClick={async (e) => {
                await insertChange(e);
              }}
            >
              Add
            </button>
            <button
              className="buttons"
              type="button"
              value="Overide"
              onClick={async (e) => {
                await overideRoom(e);
              }}
            >
              Overide
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
