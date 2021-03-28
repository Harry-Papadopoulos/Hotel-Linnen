import React, { useEffect } from "react";
import { Link } from "react-router-dom";

export default function Status() {
  return (
    <div>
      <text>This is the status.</text>
      <Link to="/">Date Picker</Link>
    </div>
  );
}
