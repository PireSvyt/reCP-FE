import * as React from "react";
import { Paper, TextField, Box, Fab } from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";

import config from "../config";
import appcopy from "./copy";
import { createRecipe, getRecipe, modifyRecipe } from "./api/recipies";
import { getIngredient } from "./api/ingredients";
import { recipeview_updateRecipe } from "./Recipeview";
import { navigates } from "./Navbar_2";

let selectedRecipe = "";

export default class Myrecipies extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      recipe: ""
    };
  }

  render() {
    //<ThemeProvider theme={theme}>
    return (
      <div>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            ml: 5,
            mr: 5
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
            <div id="recipeedit_instructions" />
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
  componentDidMount() {}
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

  // Check inputs
  let save = true;
  let errors = [];
  if (recipe.name === "") {
    save = false;
    errors.push("Nom vide");
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
      //createRecipe(recipe);
    } else {
      // PUT
      console.log("PUT");
      //modifyRecipe(recipe._id, recipe);
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
