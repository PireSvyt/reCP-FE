import * as React from "react";
import {
  Paper,
  TextField,
  Box,
  Fab,
  List,
  ListItem,
  ListItemText
} from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";

import config from "../config";
import appcopy from "./copy";
import { createRecipe, getRecipe, modifyRecipe } from "./api/recipies";
import { getIngredient } from "./api/ingredients";
import { recipeview_updateRecipe } from "./Recipeview";
import { navigates } from "./navigation";
import { random_id } from "./toolkit";

let selectedRecipe = "";
let newIngredientInput = [random_id()];
let newInstructionInput = [];

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
        <Box
          sx={{
            display: "flex",
            flexDirection: "column"
          }}
        >
          <TextField
            id="recipeedit_name"
            label="Ma recette"
            variant="standard"
          />
          <TextField
            id="recipeedit_portions"
            label="Portions"
            variant="standard"
          />
          <Paper>
            <h3>
              {appcopy["title.subsection_ingredients"][config.app.language]}
            </h3>
            <div id="recipeedit_ingredients" />
          </Paper>
          <Paper>
            <h3>
              {appcopy["title.subsection_instructions"][config.app.language]}
            </h3>
            <List dense={true} id="recipeedit_instructions">
              {getNewInstructionInput()}
            </List>
          </Paper>
          <Fab
            color="primary"
            sx={{ position: "fixed", top: 20, right: 20 }}
            onClick={save}
          >
            <SaveIcon />
          </Fab>
        </Box>
      </div>
    );
  }
  componentDidMount() {
    //setupNewInstructionInput();
  }
}

function getNewIngredientInput() {}
function getNewInstructionInput() {
  let nextIngredientIID = random_id();
  newInstructionInput.push(nextIngredientIID);
  return (
    <ListItem key={`${nextIngredientIID}`}>
      <TextField
        id={nextIngredientIID}
        label="Instruction"
        variant="standard"
      />
    </ListItem>
  );
}
function setupNewInstructionInput() {
  const instList = document.getElementById("recipeedit_instructions");
  instList.append(getNewInstructionInput());
}

function save() {
  // Checks
  var recipe = {
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
  };
  recipe._id = selectedRecipe;
  recipe.name = document.getElementById("recipeedit_name").value;
  recipe.portions = document.getElementById("recipeedit_portions").value;
  // Ingredients
  // Instructions
  newInstructionInput.forEach((instruction) => {
    if (instruction !== "") {
      recipe.instructions.push(document.getElementById(instruction).value);
    }
  });

  // Check inputs
  let save = true;
  let errors = [];
  if (recipe.name === "") {
    save = false;
    errors.push("Nom vide");
  }
  if (recipe.portions === null) {
    save = false;
    errors.push("Portions vide");
  }

  // TODO : Sncakbar

  // Save or not?
  if (errors !== []) {
    console.log(errors);
  }

  // Post or publish
  if (save === true) {
    console.log(recipe);
    if (recipe._id === "") {
      // POST
      console.log("POST");
      createRecipe(recipe);
    } else {
      // PUT
      console.log("PUT");
      modifyRecipe(recipe._id, recipe);
    }
    recipeview_updateRecipe(recipe._id);
    navigates("recipeview");
  }
}

export function recipeedit_updateRecipe(recipe_req) {
  function openRecipeUpdate(recipe_res) {
    // Name
    document.getElementById("recipeedit_name").value = recipe_res.name;
    // Portions
    document.getElementById("recipeedit_portions").value = recipe_res.portions;
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
      name: "",
      portions: "",
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
