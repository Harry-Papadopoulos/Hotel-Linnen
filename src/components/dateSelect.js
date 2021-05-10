import "../App.css";
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateAction, initialLoadAction } from "../assets/globalState";
import DatePicker from "react-date-picker";
import Swal from "sweetalert2";
import {
  stayLength,
  changeSheets,
  changeTowels,
  roomKey,
  changes,
} from "../assets/logic";

const { ipcRenderer } = window.require("electron");

function DateSelect() {
  const update = useSelector((state) => state.update);
  const dispatch = useDispatch();

  const [arrival, setArrival] = useState(new Date());
  const [departure, setDeparture] = useState(new Date());
  const [selectedRoom, setSelectedRoom] = useState("");

  function updateAndSave(room, linnenChanges) {
    return async function (dispatch) {
      await dispatch(updateAction(room, linnenChanges));
      return Promise.resolve();
    };
  }

  async function calculation(e) {
    if ("101" <= selectedRoom && selectedRoom <= "136") {
      let stay = stayLength(arrival, departure);
      let sheets = changeSheets(arrival, stay);
      let towels = changeTowels(arrival, stay);
      let linnenChanges = changes(sheets, towels);
      let room = roomKey(selectedRoom);

      await dispatch(updateAndSave(room, linnenChanges)).then(() => {
        return null;
      });

      setSelectedRoom("");
    } else {
      Swal.fire({
        title: "Invalid Room Number",
        text: "Please insert a correct room number.",
        animation: false,
      });
    }
  }

  useEffect(() => {
    async function initialLoader(dispatch) {
      await ipcRenderer.on("SEND_ROOM_STATE_TO_RENDERER", (event, data) => {
        dispatch(initialLoadAction(data));
      });
    }
    initialLoader(dispatch);
  }, [dispatch]);

  useEffect(() => {
    let exportString = JSON.stringify(update);
    ipcRenderer.send("SEND_ROOM_STATE_TO_MAIN", exportString);
  }, [update]);

  return (
    <div id="add-room-container">
      <h2 className="titles">ADD A NEW ROOM TO THE SCHEDULE:</h2>
      <div className="selection-container">
        <div className="date-picker">
          <p>Arrival Date</p>
          <div>
            <DatePicker
              dayPlaceholder="dd"
              monthPlaceholder="mm"
              yearPlaceholder="yyyy"
              format="dd-MM-y"
              value={arrival}
              onChange={(date) => setArrival(date)}
            />
          </div>
        </div>
        <div className="date-picker">
          <p>Departure Date</p>
          <div>
            <DatePicker
              dayPlaceholder="dd"
              monthPlaceholder="mm"
              yearPlaceholder="yyyy"
              format="dd-MM-y"
              value={departure}
              onChange={(date) => setDeparture(date)}
            />
          </div>
        </div>
        <div className="form-container">
          <label>Input the room No.:</label>
          <form className="room-form">
            <input
              className="inputs"
              type="text"
              value={selectedRoom}
              name="selectedRoom"
              placeholder="Type in the room"
              onChange={(event) => setSelectedRoom(event.target.value)}
              onSubmit={(event) => {
                event.preventDefault();
              }}
            />
            <button
              className="buttons"
              type="button"
              value="Calculate"
              onClick={async (e) => {
                await calculation(e);
              }}
            >
              Update
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default DateSelect;
