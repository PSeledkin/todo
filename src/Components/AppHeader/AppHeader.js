import React from "react";
import "./AppHeader.css"
const AppHeader = (props) => {

  return (
  <div className="app-header d-flex">
  <h1>ToDo List</h1>
  <h2>{props.todo} more to do, {props.done} done</h2>
  </div>);
};

export default AppHeader;
