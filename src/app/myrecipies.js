import React from "react";
import ReactDOM from "react-dom";
import { Button, Paper, List, ListItem, ListItemText } from "@mui/material";

import recipies from "../api/recipies";

exports.render = () => {
  const container = document.getElementById("myrecipies");
  ReactDOM.render(
    <div>
      <h2>Mes recettes</h2>
      <div>
        <Button variant="text">New</Button>
      </div>
      <div id="myrecipies_list" />
    </div>,
    container
  );
};

//<Button variant="text" action={list_populate}>

function list_populate() {
  const myrecipies = recipies.getRecipes();
  console.log(myrecipies);
  const container = document.getElementById("myrecipies_list");
  ReactDOM.render(
    <List>
      {myrecipies.map((value) => (
        <ListItem key={value.id} disableGutters>
          <ListItemText primary={`${value.name}`} />
        </ListItem>
      ))}
    </List>,
    container
  );
}
