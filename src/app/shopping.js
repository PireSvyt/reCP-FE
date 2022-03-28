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

//import navigation from "./navigation";

exports.render = () => {
  const container = document.getElementById("myshopping");
  ReactDOM.render(
    <div>
      <h2>Mes courses</h2>
      <div>
        <Button variant="text" onClick={renew}>
          Renouveler
        </Button>
      </div>
      <Paper>
        <h3>Je dois prendre...</h3>
        <div id="shopping_shoppinglist" />
      </Paper>
      <Paper>
        <h3>J'ai pris...</h3>
        <div id="shopping_shoppedlist" />
      </Paper>
    </div>,
    container
  );
};
function renew() {
  console.log("TODO RENEW");
}
