import "./App.css";
import React from "react";
import DateSelect from "./components/dateSelect";
import { HashRouter as Router, Switch, Route, Link } from "react-router-dom";
import Status from "./components/Status";

const electron = window.require("electron");

function App() {
  return (
    <div className="main-app">
      <Router>
        <Switch>
          <Route exact path="/">
            <DateSelect />
            <Link to="/Status">Status</Link>
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
