import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { nextDaysSheetChanges, nextDaysTowelChanges } from "../assets/logic";

export default function DisplayTomorrow() {
  const update = useSelector((state) => state.update);
  const [sheets, setSheets] = useState("");
  const [towels, setTowels] = useState("");

  useEffect(() => {
    setSheets(nextDaysSheetChanges(update));
    setTowels(nextDaysTowelChanges(update));
  }, [update]);

  return (
    <div id="tomorrow-container">
      <p className="titles">TOMORROW'S LINNEN CHANGES:</p>
      <div id="tomorrow">
        <p>
          SHEETS: {sheets}
          {"\n"}
        </p>
        <p>TOWELS: {towels}</p>
      </div>
    </div>
  );
}
