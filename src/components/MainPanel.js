import React from "react";
import DateSelect from "./DateSelect";
import ManualOveride from "./ManualOveride";
import Delete from "./DeleteForm";
import DisplayTomorrow from "./DisplayTomorrow";
import Header from "./Header";

export default function MainPanel() {
  return (
    <div className="main-container">
      <Header
        title="MAIN PANEL"
        route1="/NextSixDays"
        route2="/Status"
        routeName1="Next Days"
        routeName2="Status"
      />
      <div id="add-delete">
        <DateSelect />
        <div id="delete-display-container">
          <Delete />
        </div>
      </div>
      <div className="tomorrow-overide">
        <DisplayTomorrow />
        <ManualOveride />
      </div>
    </div>
  );
}
