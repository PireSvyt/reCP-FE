import React from "react";
import ReactDOM from "react-dom";

import Balance from "./app/balance/Balance";

const rootElement = document.getElementById("root");
ReactDOM.render(
  <React.Fragment>
    <Balance />
  </React.Fragment>,
  rootElement
);
