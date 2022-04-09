import React from "react";
import ReactDOM from "react-dom";
import {
  Button,
  List,
  ListItem,
  ListItemText,
  ListItemButton,
  TextField,
  Paper
} from "@mui/material";

import recipeview from "./recipeview";
import navigation from "./navigation";
import recipiesAPI from "../api/recipies";
import {
  createIngredient,
  getIngredient,
  deleteIngredient,
  modifyIngredient,
  getIngredients
} from "../api/ingredients";

exports.render = () => {
  const container = document.getElementById("recipeedit");
  ReactDOM.render(
    <div>
      <TextField id="recipeedit_name" label="Ma recette" variant="standard" />
      <TextField id="recipeedit_portions" label="Portions" variant="standard" />
      <Paper>
        <h3>Ingredients</h3>
        <div id="recipeedit_ingredients" />
      </Paper>
      <Paper>
        <h3>Instructions</h3>
        <div id="recipeedit_instructions" />
      </Paper>
      <Button variant="text" onClick={save}>
        Save
      </Button>
    </div>,
    container
  );
};
exports.new = () => {
  //ingredientsAPI.ingredientListRehydrate();

  // Name
  const container_name = document.getElementById("recipeedit_name");
  ReactDOM.render("", container_name);
  // Portions
  const container_portions = document.getElementById("recipeedit_portions");
  ReactDOM.render("", container_portions);
  // Ingredients
  const container_ingredients = document.getElementById(
    "recipeedit_ingredients"
  );
  ReactDOM.render(
    <List>
      <ListItem key={0}>
        <TextField
          id="recipeedit_ingredient_name_0"
          label="Ingrédient"
          variant="standard"
        />
        <TextField
          id="recipeedit_ingredient_quantity_0"
          label="Quantité"
          variant="standard"
        />
        <TextField
          id="recipeedit_ingredient_unit_0"
          label="Unit"
          variant="standard"
        />
        <Button variant="text">Add</Button>
      </ListItem>
    </List>,
    container_ingredients
  );
  // Instructions
  const container_instructions = document.getElementById(
    "recipeedit_instructions"
  );
  ReactDOM.render(
    <List>
      <ListItem key={0}>
        <TextField
          id="recipeedit_instruction_0"
          label="Instruction"
          variant="standard"
        />
        <Button variant="text">Add</Button>
      </ListItem>
    </List>,
    container_instructions
  );
};

function save() {
  // Checks
  var newRecipe = {
    name: "Dummy 7",
    portions: 2,
    ingredients: [],
    scale: 1,
    state: {
      selected: true,
      cooked: false
    }
  };
  // Save via API
  recipiesAPI.createRecipe(newRecipe).then((res) => {
    if (res.status === 201) {
      recipeview.populate(res.data.id);
      navigation.navigates("recipeview");
    } else {
      // Warn
    }
  });
}
