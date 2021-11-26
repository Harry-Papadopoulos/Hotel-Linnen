import "./App.css";
import "./Responsive.css";
import React from "react";
import DateSelect from "./Components/DateSelect";
import MainPanel from "./Components/MainPanel";
import { HashRouter as Router, Switch, Route } from "react-router-dom";
import NextSixDays from "./Components/NextSixDays";
import Status from "./Components/Status";

const electron = window.require("electron");

function App() {
  return (
    <div className="main-app">
      <Router>
        <Switch>
          <Route exact path="/">
            <MainPanel />
          </Route>
          <Route path="/NextSixDays">
            <NextSixDays />
          </Route>
          <Route path="/Status">
            <Status />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
