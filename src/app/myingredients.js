import React from "react";
import ReactDOM from "react-dom";
import {
  Button,
  List,
  ListItem,
  ListItemText,
  ListItemButton
} from "@mui/material";

import {
  createIngredient,
  getIngredient,
  deleteIngredient,
  modifyIngredient,
  getIngredients
} from "../api/ingredients";

exports.render = () => {
  const container = document.getElementById("myingredients");
  ReactDOM.render(
    <div>
      <h2>Mes ingrédients</h2>
      <div>
        <Button variant="text" onClick={clickNew}>
          New
        </Button>
      </div>
      <div id="myingreidents_list" />
    </div>,
    container
  );
};

function update() {
  getIngredients().then((res) => {
    const container = document.getElementById("myingreidents_list");
    function getListItem(value) {
      return (
        <ListItem key={`${value._id}`}>
          <ListItemButton onClick={() => clickIngredient(value._id)}>
            <ListItemText
              primary={`${value.name} ${value.unit}`}
              secondary={`${value._id}`}
            />
          </ListItemButton>
        </ListItem>
      );
    }

    if (Array.isArray(res)) {
      ReactDOM.render(
        <List>{res.forEach((value) => getListItem(value))}</List>,
        container
      );
    }
  });
}
exports.update = update;
function clickNew() {
  console.log("TODO NEW INGREDIENT");
}
function clickIngredient(item) {
  console.log("TODO CLICK INGREDIENT");
}
