import React from "react";
import ReactDOM from "react-dom";

import App from "./app/App";
import appcopy from "./app/copy";

console.log("REACT_APP_DEBUG = '" + process.env.REACT_APP_DEBUG + "'");
console.log("REACT_APP_LANGUAGE = '" + process.env.REACT_APP_LANGUAGE + "'");
console.log(
  "REACT_APP_SERVER_URL = '" + process.env.REACT_APP_SERVER_URL + "'"
);
console.log(
  "Example copy : " +
    appcopy["generic"]["snack"]["errornetwork"][process.env.REACT_APP_LANGUAGE]
);

console.log(process.env);

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
