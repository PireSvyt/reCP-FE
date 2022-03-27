import React from "react";
import ReactDOM from "react-dom";
import {
  Button,
  List,
  ListItem,
  ListItemText,
  ListItemButton
} from "@mui/material";

import navigation from "./navigation";
import recipeview from "./recipeview";
import recipeedit from "./recipeedit";
import recipiesAPI from "../api/recipies";

exports.render = () => {
  const container = document.getElementById("myrecipies");
  ReactDOM.render(
    <div>
      <h2>Mes recettes</h2>
      <div>
        <Button variant="text" onClick={clickNew}>
          New
        </Button>
      </div>
      <div id="myrecipies_list" />
    </div>,
    container
  );
};

function update() {
  recipiesAPI.getRecipes().then((res) => {
    const container = document.getElementById("myrecipies_list");
    ReactDOM.render(
      <List>
        {res.map((value) => (
          <ListItem key={`${value._id}`} id={`${value._id}`}>
            <ListItemButton onClick={() => clickRecipe(value._id)}>
              <ListItemText
                primary={`${value.name}`}
                secondary={`${value.portions} portions`}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>,
      container
    );
  });
}
exports.update = update;
function clickRecipe(item) {
  recipeview.populate(item);
  navigation.navigates("recipeview");
}
function clickNew() {
  recipeedit.new();
  navigation.navigates("recipeedit");
}

exports.deleteRecipe = (id) => {
  const recipe = document.getElementById(id);
  recipe.parentElement.removeChild(recipe);
};
