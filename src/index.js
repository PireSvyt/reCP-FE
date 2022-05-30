import React from "react";
import ReactDOM from "react-dom";

import App from "./app/App";
import appcopy from "./app/copy";

console.log("NODE_ENV = '" + process.env.NODE_ENV + "'");
console.log("REACT_APP_DEBUG = '" + process.env.REACT_APP_DEBUG + "'");
console.log(
  "REACT_APP_SERVER_URL = '" + process.env.REACT_APP_SERVER_URL + "'"
);
console.log("REACT_APP_LANGUAGE = '" + process.env.REACT_APP_LANGUAGE + "'");

var SELECTED_LANGUAGE = "EN";
switch (process.env.NODE_ENV) {
  case "development":
    SELECTED_LANGUAGE = "EN";
    break;
  case "preview":
    SELECTED_LANGUAGE = process.env.REACT_APP_LANGUAGE;
    break;
  case "production":
    SELECTED_LANGUAGE = process.env.REACT_APP_LANGUAGE;
    break;
  default:
    SELECTED_LANGUAGE = "EN";
}
console.log("SELECTED_LANGUAGE = '" + SELECTED_LANGUAGE + "'");

console.log(
  "Example copy : " +
    appcopy["generic"]["snack"]["errornetwork"][SELECTED_LANGUAGE]
);

console.log(process.env);

ReactDOM.render(
  <App language={SELECTED_LANGUAGE} />,
  document.getElementById("root")
);
