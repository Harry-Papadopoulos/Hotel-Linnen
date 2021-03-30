import "../App.css";
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateAction } from "../assets/globalState";
import DatePicker from "react-date-picker";
import hotelRooms from "../assets/hotelRooms";
import Swal from "sweetalert2";
import {
  stayLength,
  changeSheets,
  changeTowels,
  roomKey,
  changes,
  tomorrowsChanges,
} from "../assets/logic";
import DisplayTomorrow from "./displayTomorrow";

const { ipcRenderer } = window.require("electron");

const accessState = (state) => state;

const globalToShow = useSelector(accessState);

class DateSelect extends React.Component {
  constructor() {
    super();

    this.state = {
      arrival: new Date(),
      departure: new Date(),
      rooms: hotelRooms,
      selectedRoom: "",
      tomorrowsChanges: [],
    };
    this.setArrival = this.setArrival.bind(this);
    this.setDeparture = this.setDeparture.bind(this);
    this.selectRoom = this.selectRoom.bind(this);
    this.calculation = this.calculation.bind(this);
  }

  setArrival(date) {
    this.setState({ arrival: date });
  }

  setDeparture(date) {
    this.setState({ departure: date });
  }

  selectRoom(event) {
    this.setState({ selectedRoom: event.target.value });
    event.preventDefault();
    return false;
  }

  async calculation() {
    if ("101" <= this.state.selectedRoom && this.state.selectedRoom <= "136") {
      let stay = stayLength(this.state.arrival, this.state.departure);
      let sheets = changeSheets(this.state.arrival, stay);
      let towels = changeTowels(this.state.arrival, stay);
      let linnenChanges = changes(sheets, towels);
      let room = roomKey(this.state.selectedRoom);

      await this.setState((prevstate) => ({
        rooms: {
          ...prevstate.rooms,
          [room]: linnenChanges,
        },
      }));

      let tomorrow = tomorrowsChanges(this.state.rooms);
      this.setState({ tomorrowsChanges: tomorrow });

      let exportString = JSON.stringify(this.state.rooms);

      ipcRenderer.send("SEND_ROOM_STATE_TO_MAIN", exportString);

      this.setState({ selectedRoom: "" });
    } else {
      Swal.fire({
        title: "Invalid Room Number",
        text: "Please insert a correct room number.",
        animation: false,
      });
    }
  }

  async componentDidMount() {
    await ipcRenderer.on("SEND_ROOM_STATE_TO_RENDERER", (event, data) => {
      this.setState({ rooms: data });
      let tomorrow = tomorrowsChanges(data);
      this.setState({ tomorrowsChanges: tomorrow });
    });
  }

  render() {
    return (
      <div id="main-container">
        <div className="picker-container">
          <div className="date-picker">
            <text>Arrival Date</text>
            <div>
              <DatePicker
                dayPlaceholder="dd"
                monthPlaceholder="mm"
                yearPlaceholder="yyyy"
                format="dd-MM-y"
                value={this.state.arrival}
                onChange={(date) => this.setArrival(date)}
              />
            </div>
          </div>
          <div className="date-picker">
            <text>Departure Date</text>
            <div>
              <DatePicker
                dayPlaceholder="dd"
                monthPlaceholder="mm"
                yearPlaceholder="yyyy"
                format="dd-MM-y"
                value={this.state.departure}
                onChange={(date) => this.setDeparture(date)}
              />
            </div>
          </div>
          <form className="room-form">
            <input
              type="text"
              value={this.state.selectedRoom}
              name="selectedRoom"
              placeholder="Type in the room"
              onChange={this.selectRoom}
              onSubmit={(event) => {
                event.preventDefault();
              }}
            />
            <button
              type="button"
              value="Calculate"
              onClick={(e) => this.calculation(e)}
            >
              Calculate
            </button>
          </form>
        </div>
        <DisplayTomorrow tomorrowChange={this.state.tomorrowsChanges} />
        <div>
          <text>{}</text>
        </div>
      </div>
    );
  }
}

export default DateSelect;

// Swal.fire({
//   title: "Tomorrow",
//   text: tomorrow[1][0],
//   animation: false,
// });
