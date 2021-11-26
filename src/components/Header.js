import React from "react";
import { Link } from "react-router-dom";

export default function Header(props) {
  return (
    <div className="header">
      <div></div>

      <h1 className="page-title">{props.title}</h1>

      <div id="links-container">
        <div className="link-box">
          <Link to={props.route1} color="black" className="links">
            {props.routeName1}
          </Link>
        </div>
        <div className="link-box">
          <Link to={props.route2} color="black" className="links">
            {props.routeName2}
          </Link>
        </div>
      </div>
    </div>
  );
}
