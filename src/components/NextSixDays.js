import React from "react";
import { useSelector } from "react-redux";
import { displayForNextDays } from "../Assets/Logic";
import Header from "./Header";

export default function NextSixDays() {
  const update = useSelector((state) => state.update);

  return (
    <div className="main-container">
      <Header
        title="CHANGES FOR NEXT 6 DAYS"
        route1="/"
        route2="/Status"
        routeName1="Main Panel"
        routeName2="Status"
      />
      <div id="six-days-content">
        {displayForNextDays(update).map((item) => (
          <div className="six-day-display">
            <h3>{item[0]}</h3>
            <p>
              <span>Sheets:</span> {item[1]}
            </p>
            <p>
              <span>Towels:</span> {item[2]}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
