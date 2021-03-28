import React, { useState, useEffect } from "react";
import { tomorrowString } from "../assets/logic";

export default function DisplayTomorrow(props) {
  const [sheets, setSheets] = useState("");
  const [towels, setTowels] = useState("");

  useEffect(() => {
    let roomChanges = tomorrowString(props.tomorrowChange);
    setSheets(roomChanges[0]);
    setTowels(roomChanges[1]);
  });

  return (
    <div id="tomorrow-container">
      <text className="titles">TOMORROW'S LINNEN CHANGES:</text>
      <div id="tomorrow">
        <text>
          {sheets}
          {"\n"}
        </text>
        <text>{towels}</text>
      </div>
    </div>
  );
}
