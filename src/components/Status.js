import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { makeStatusStrings } from "../Assets/Logic";
import Header from "./Header";

export default function Status() {
  const update = useSelector((state) => state.update);

  const [roomList, setRoomList] = useState([]);

  useEffect(() => {
    setRoomList(makeStatusStrings(update));
  }, [update]);

  return (
    <div className="main-container">
      <Header
        title="STATUS OF ALL ROOMS"
        route1="/"
        route2="NextSixDays"
        routeName1="Main Panel"
        routeName2="Next Days"
      />
      <div id="status-content">
        <div>
          <div id="all-rooms-display">
            {roomList.map((item) => (
              <p>
                <span>{item[0]}:</span> <span>Sheets - </span>
                {item[1]} , <span>Towels - </span> {item[2]}
              </p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
