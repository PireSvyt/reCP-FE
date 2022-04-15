import React from "react";
import ReactDOM from "react-dom";
import { Button, Paper } from "@mui/material";

exports.render = () => {
  const container = document.getElementById("thisweek");
  ReactDOM.render(
    <div>
      <h2>Cette semaine</h2>
      <div>
        <Button variant="text" onClick={renewSelection}>
          Renouveler
        </Button>
        <Button variant="text" onClick={addRecipe}>
          Ajouter
        </Button>
      </div>
      <Paper>
        <div id="thisweek_recipelist" />
      </Paper>
      <Paper>
        <h3>Ingrédients</h3>
        <div id="thisweek_recipelist" />
      </Paper>
    </div>,
    container
  );
};
function renewSelection() {
  console.log("TODO RENEW SELECTION");
}
function addRecipe(item) {
  console.log("TODO ADD RECIPE");
}
