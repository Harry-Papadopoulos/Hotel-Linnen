import React from "react";
import { Link } from "react-router-dom";

export default function Header(props) {
  return (
    <div className="header">
      <div></div>
      <div>
        <h1>{props.title}</h1>
      </div>
      <div>
        <Link to={props.route} color="black" className="links">
          {props.routeName}
        </Link>
      </div>
    </div>
  );
}
