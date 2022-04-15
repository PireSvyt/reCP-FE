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
import recipeedit from "./recipeedit";
import myrecipies from "./myrecipies";
import recipiesAPI from "./api/recipies";
import ingredientsAPI from "./api/ingredients";

let currentRecipe = "";

exports.render = () => {
  const container = document.getElementById("recipeview");
  ReactDOM.render(
    <div>
      <h2 id="recipeview_name">Recipe name</h2>
      <div>
        <Button variant="text" onClick={() => deleteRecipe()}>
          Delete
        </Button>
        <Button variant="text">Edit</Button>
        <Button variant="text">Select</Button>
      </div>
      <Paper>
        <h3 id="recipeview_portions">... portions</h3>
      </Paper>
      <Paper>
        <h3>Ingredients</h3>
        <div id="recipeview_ingredients" />
      </Paper>
      <Paper>
        <h3>Instructions</h3>
        <div id="recipeview_instructions" />
      </Paper>
    </div>,
    container
  );
};
exports.populate = (id) => {
  recipiesAPI.getRecipe(id).then((recipe_res) => {
    currentRecipe = id;
    // Name
    const container_name = document.getElementById("recipeview_name");
    ReactDOM.render(recipe_res.name, container_name);
    // Portions
    const container_portions = document.getElementById("recipeview_portions");
    ReactDOM.render(recipe_res.portions + " portions", container_portions);
    // Ingredients
    const container_ingredients = document.getElementById(
      "recipeview_ingredients"
    );
    let recipeIngredients = recipe_res.ingredients;
    console.log(recipeIngredients);
    recipeIngredients.forEach((recipe_ingredient) => {
      ingredientsAPI
        .getIngredient(recipe_ingredient.id)
        .then(async (list_ingredient) => {
          try {
            console.log(list_ingredient);
            recipe_ingredient.name = list_ingredient.name;
            recipe_ingredient.unit = list_ingredient.unit;
          } catch (err) {
            // Handle Error Here
            console.error(err);
          }
        });
    });
    console.log(recipeIngredients);
    ReactDOM.render(
      <List>
        {recipeIngredients.map((recipe_ing) => (
          <ListItem key={`${recipe_ing._id}`}>
            <ListItemText
              primary={`${recipe_ing.name}`}
              secondary={`${recipe_ing.quantity} ${recipe_ing.unit}`}
            />
          </ListItem>
        ))}
      </List>,
      container_ingredients
    );
    // Instructions
    const container_instructions = document.getElementById(
      "recipeview_instructions"
    );
    ReactDOM.render(
      <List>
        {recipe_res.instructions.map((value) => (
          <ListItem key={`${value.id}`}>
            <ListItemButton>
              <ListItemText primary={`${value}`} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>,
      container_instructions
    );
  });
};
async function ingredientFragment(recipe_ing) {
  console.log(recipe_ing);
  ingredientsAPI.getIngredient(recipe_ing.id).then((ingredient) => {
    console.log(ingredient);
    return (
      <React.Fragment>
        <ListItem key={`${recipe_ing.id}`}>
          <ListItemText
            primary={`${recipe_ing.quantity} ${ingredient.unit} ${ingredient.name}`}
          />
        </ListItem>
      </React.Fragment>
    );
  });
}
function deleteRecipe() {
  recipiesAPI.deleteRecipe(currentRecipe).then((status) => {
    if (status === 200) {
      myrecipies.deleteRecipe(currentRecipe);
      navigation.navigates("myrecipies");
      alert("Recette supprimée");
    } else {
      alert("Erreur lors de la suppression");
    }
  });
}
