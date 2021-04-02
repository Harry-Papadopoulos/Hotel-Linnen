import React from "react";
import DateSelect from "./dateSelect";
import ManualOveride from "./ManualOveride";
import Delete from "./DeleteForm";
import DisplayTomorrow from "./displayTomorrow";
import Header from "./Header";

export default function MainPanel() {
  return (
    <div id="main-container">
      <Header title="MAIN PANEL" route="/Status" routeName="Overview" />
      <div id="add-delete">
        <DateSelect />
        <div id="delete-display-container">
          <Delete />
        </div>
      </div>
      <DisplayTomorrow />
      <ManualOveride />
    </div>
  );
}
