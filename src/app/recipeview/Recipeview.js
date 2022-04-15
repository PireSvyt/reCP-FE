import * as React from "react";
import ReactDOM from "react-dom";
import {
  Button,
  Paper,
  List,
  ListItem,
  ListItemText,
  ListItemButton
} from "@mui/material";

import config from "../../config";
import appcopy from "../copy";
import { getRecipe, deleteRecipe } from "../api/recipies";
import { getIngredient } from "../api/ingredients";
import { updateMyrecipies } from "../myrecipies/Myrecipies";
import { recipeedit_updateRecipe } from "../recipeedit/Recipeedit";

import navigation from "../navigation";

let selectedRecipe = "";

export default class Myrecipies extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      recipe: ""
    };
  }

  render() {
    return (
      <div>
        <h2 id="recipeview_name">Recipe name</h2>
        <div>
          <Button
            variant="text"
            onClick={(event) => {
              recipeview_deleteRecipe(selectedRecipe);
            }}
          >
            {appcopy["button.delete"][config.app.language]}
          </Button>
          <Button
            variant="text"
            onClick={() => {
              recipeedit_updateRecipe(selectedRecipe);
              navigation.navigates("recipeedit");
            }}
          >
            {appcopy["button.edit"][config.app.language]}
          </Button>
          <Button variant="text">
            {appcopy["button.select"][config.app.language]}
          </Button>
        </div>
        <Paper>
          <h3 id="recipeview_portions">... portions</h3>
        </Paper>
        <Paper>
          <h3>
            {appcopy["title.subsection_ingredients"][config.app.language]}
          </h3>
          <div id="recipeview_ingredients" />
        </Paper>
        <Paper>
          <h3>
            {appcopy["title.subsection_instructions"][config.app.language]}
          </h3>
          <div id="recipeview_instructions" />
        </Paper>
      </div>
    );
  }
  componentDidMount() {}
}

function recipeview_deleteRecipe() {
  //console.log("recipeview_deleteRecipe " + selectedRecipe);
  deleteRecipe(selectedRecipe).then((status) => {
    if (status === 200) {
      updateMyrecipies();
      navigation.navigates("myrecipies");
    } else {
      alert("Erreur lors de la suppression");
    }
  });
}

export function recipeview_updateRecipe(recipe_req) {
  function openRecipeUpdate(recipe_res) {
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
    recipeIngredients.forEach((recipe_ingredient) => {
      getIngredient(recipe_ingredient._id).then(async (list_ingredient) => {
        try {
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
          <ListItem key={`${value._id}`}>
            <ListItemButton>
              <ListItemText primary={`${value}`} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>,
      container_instructions
    );
  }

  if (recipe_req !== "") {
    // Load
    getRecipe(recipe_req).then((recipe_res) => {
      selectedRecipe = recipe_res._id;
      openRecipeUpdate(recipe_res);
    });
  } else {
    selectedRecipe = "";
    openRecipeUpdate({
      _id: "",
      name: "",
      portions: null,
      ingredients: [],
      instructions: [],
      scale: 1,
      state: {
        selected: false,
        cooked: false
      }
    });
  }
}
