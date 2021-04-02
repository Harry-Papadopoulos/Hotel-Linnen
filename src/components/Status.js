import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { makeStatusStrings } from "../assets/logic";
import Header from "./Header";

export default function Status() {
  const update = useSelector((state) => state.update);

  const [roomList, setRoomList] = useState([]);

  useEffect(() => {
    setRoomList(makeStatusStrings(update));
  }, [update]);

  return (
    <div>
      <Header
        title="STATUS OF ALL ROOM LINNEN CHANGES"
        route="/"
        routeName="Main Panel"
      />
      <div id="status-content">
        <h2 className="titles">ROOM STATUS:</h2>
        <div>
          <div id="all-rooms-display">
            {roomList.map((item) => (
              <p>{item}</p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
