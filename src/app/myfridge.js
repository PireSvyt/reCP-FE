import React from "react";
import ReactDOM from "react-dom";
import {
  Button,
  List,
  ListItem,
  ListItemText,
  ListItemButton,
  Paper
} from "@mui/material";

import navigation from "./navigation";

exports.render = () => {
  const container = document.getElementById("myfridge");
  ReactDOM.render(
    <div>
      <h2>Mon frigo</h2>
      <div>
        <Button variant="text" onClick={renew}>
          Renouveler
        </Button>
      </div>
      <Paper>
        <h3>J'ai besoin de...</h3>
        <div id="fridge_needlist" />
      </Paper>
      <Paper>
        <h3>J'ai déjà...</h3>
        <div id="fridge_ihavelist" />
      </Paper>
    </div>,
    container
  );
};
function renew() {
  console.log("TODO RENEW");
}
