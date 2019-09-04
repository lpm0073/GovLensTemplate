import React from "react";
import ReactDOM from "react-dom";
import DataProvider from "./DataProvider";
import MyTable from "./Table";
import Form from "./Form";
import APIService from "./APIService"

const App = () => (
  <React.Fragment>
  <MyTable />
  </React.Fragment>
);
const wrapper = document.getElementById("app");
wrapper ? ReactDOM.render(<App />, wrapper) : null;
