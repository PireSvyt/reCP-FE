import * as React from "react";
import {
  Button,
  TextField,
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  List,
  ListItem,
  ListItemText,
  ListItemButton,
  Fab,
  IconButton
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

import config from "../config";
import appcopy from "./copy";
import { random_id } from "./toolkit";
import { getRecipe, createRecipe, modifyRecipe } from "./api/recipies";

let emptyRecipe = {
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

export default class Recipe extends React.Component {
  constructor(props) {
    if (config.debug) {
      console.log("Recipe.constructor");
    }
    super(props);
    this.state = {
      recipeOpen: this.props.recipeOpen
    };
    this.recipe = { ...emptyRecipe };
    // Handles
    this.handleClose = this.handleClose.bind(this);
    this.handleSave = this.handleSave.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleAddIngredient = this.handleAddIngredient.bind(this);
    this.handleDeleteIngredient = this.handleDeleteIngredient.bind(this);
  }
  render() {
    if (config.debug) {
      console.log("Recipe.render");
      console.log("Recipe.props.recipeID");
      console.log(this.props.recipeID);
      console.log("Recipe.recipe");
      console.log(this.recipe);
    }
    return (
      <div>
        <Dialog
          id="dialog_recipe"
          open={this.state.recipeOpen}
          onClose={this.handleClose}
          fullWidth={true}
        >
          <DialogTitle>
            {appcopy["title.subsection_recipe"][config.app.language]}
          </DialogTitle>
          <DialogContent>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-evenly"
              }}
            >
              <TextField
                name="name"
                label={appcopy["input.name"][config.app.language]}
                variant="standard"
                defaultValue={this.recipe.name}
                onChange={this.handleChange}
              />

              <TextField
                name="portions"
                label={appcopy["input.portions"][config.app.language]}
                variant="standard"
                defaultValue={this.recipe.portions}
                onChange={this.handleChange}
              />

              <h3>
                {appcopy["title.subsection_ingredients"][config.app.language]}
              </h3>
              <List name="recipe-ingredientlist">
                <Ingredient
                  id={random_id()}
                  setableIngredient={true}
                  oningredienttoadd={console.log("TODO oningredienttoadd")}
                  onchange={console.log("TODO onchange")}
                  ondelete={console.log("TODO ondelete")}
                />
              </List>

              <h3>
                {appcopy["title.subsection_instructions"][config.app.language]}
              </h3>
              <List dense={true}></List>
            </Box>
          </DialogContent>

          <DialogActions>
            <Button onClick={this.handleClose}>
              {appcopy["button.cancel"][config.app.language]}
            </Button>
            <Button variant="contained" onClick={this.handleSave}>
              {appcopy["button.save"][config.app.language]}
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
  componentDidMount() {
    if (config.debug) {
      console.log("Recipe.componentDidMount");
    }
    // Add empty inputs
    //this.handleAddIngredient();
  }
  componentDidUpdate(prevState) {
    if (config.debug) {
      console.log("Recipe.componentDidUpdate");
      console.log("Recipe.state");
      console.log(this.state);
    }
    if (
      prevState.recipeOpen !== this.props.recipeOpen ||
      prevState.recipeID !== this.props.recipeID
    ) {
      this.recipe = { ...emptyRecipe };
      this.setState((prevState, props) => ({
        recipeDate: Date()
      }));
      if (this.props.recipeID !== "") {
        // Load
        console.log(
          "Recipe.componentDidUpdate.getRecipe " + this.props.recipeID
        );
        getRecipe(this.props.recipeID)
          .then((res) => {
            this.recipe = { ...res };
            console.log("this.recipe");
            console.log(this.recipe);
          })
          .then(() => {
            this.setState((prevState, props) => ({
              recipeOpen: this.props.recipeOpen,
              recipeDate: this.recipe.date
            }));
            console.log("this.recipe after set state");
            console.log(this.recipe);
          });
      } else {
        this.setState((prevState, props) => ({
          recipeOpen: this.props.recipeOpen
        }));
      }
    }
  }

  // Handles
  handleClose() {
    if (config.debug) {
      console.log("Recipe.handleClose");
    }
    this.recipe = { ...emptyRecipe };
    this.props.onclose();
  }
  handleChange(event, newValue) {
    if (config.debug) {
      console.log("Recipe.handleChange");
    }
    const target = event.target;
    if (config.debug) {
      console.log(target);
    }
    var previousRecipe = this.recipe;
    switch (target.name) {
      case "name":
        if (config.debug) {
          console.log("change name : " + target.value);
        }
        previousRecipe.name = target.value;
        break;
      case "portions":
        if (config.debug) {
          console.log("change portions : " + target.value);
        }
        previousRecipe.portions = target.value;
        break;
      default:
        if (config.debug) {
          console.log("/!\\ no match : " + target.name);
        }
    }
    // Update
    if (config.debug) {
      console.log("Recipe.recipe");
      console.log(this.recipe);
    }
    this.recipe = previousRecipe;
  }
  handleSave() {
    if (config.debug) {
      console.log("Recipe.handleSave");
    }
    // Check inputs
    let save = true;
    let errors = [];
    if (this.recipe.name === "") {
      save = false;
      errors.push("Nom vide");
    }
    if (this.recipe.portions === null) {
      save = false;
      errors.push("Portions vide");
    }
    // Save or not?
    if (errors !== []) {
      console.log(errors);
    }
    // Post or publish
    if (save === true) {
      if (config.debug) {
        console.log(this.props.recipeID);
        console.log(this.recipe);
      }
      if (this.props.recipeID === "") {
        // POST
        if (config.debug) {
          console.log("POST");
        }
        if (config.debug === false) {
          createRecipe(this.recipe).then(() => {
            this.props.onsave();
          });
        }
        this.props.onclose();
      } else {
        // PUT
        if (config.debug) {
          console.log("PUT");
        }
        if (config.debug === false) {
          modifyRecipe(this.props.recipeID, this.recipe).then(() => {
            this.props.onsave();
          });
        }
        this.props.onclose();
      }
    }
  }
  handleAddIngredient() {
    if (config.debug) {
      console.log("Recipe.handleAddIngredient");
    }

    // Capture elements
    //const ingredientList = document.get("recipe-ingredientlist");
    const ingredientList = document.querySelector(
      '[name="recipe-ingredientlist"]'
    );

    console.log("ingredientList");
    console.log(ingredientList);
    ingredientList.appendChild(
      <Ingredient
        id={random_id()}
        setableIngredient={true}
        oningredienttoadd={console.log("TODO oningredienttoadd")}
        onchange={console.log("TODO onchange")}
        ondelete={console.log("TODO ondelete")}
      />
    );
  }
  handleDeleteIngredient(event) {
    if (config.debug) {
      console.log("Recipe.handleDeleteIngredient");
    }
    console.log("event.target");
    console.log(event.target);
  }
}

let emptyIngredient = {
  _id: "",
  name: "",
  count: null,
  unit: ""
};

class Ingredient extends React.Component {
  /*
  props {
      boolean setableIngredient to trigger addition of the next ingrdedient by parent
      callback onchange to save ingredient inputs
      callback oningredienttoadd to add the next ingredient (and set the setableIngredient to false)
      callback ondelete to remove ingredient row by parent
  }
  */
  constructor(props) {
    super(props);
    this.state = {
      setableIngredient: this.props.setableIngredient
    };
    this.ingredient = { ...emptyIngredient };
    // Handlers
    this.handleChange = this.handleChange.bind(this);
  }
  render() {
    return (
      <ListItem
        secondaryAction={
          <IconButton edge="end">
            <DeleteIcon onClick={this.props.ondelete} />
          </IconButton>
        }
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-evenly"
          }}
        >
          <TextField
            name="name"
            label={appcopy["input.name"][config.app.language]}
            variant="standard"
            defaultValue={this.ingredient.name}
            onChange={this.handleChange}
          />
          <TextField
            name="count"
            label={appcopy["input.quantity"][config.app.language]}
            variant="standard"
            defaultValue={this.ingredient.count}
            onChange={this.handleChange}
          />
          <TextField
            name="unit"
            label={appcopy["input.unit"][config.app.language]}
            variant="standard"
            defaultValue={this.ingredient.unit}
            onChange={this.handleChange}
          />
        </Box>
      </ListItem>
    );
  }

  // Handlers()
  handleChange(event, newValue) {
    if (config.debug) {
      console.log("Ingredient.handleChange");
    }
    const target = event.target;
    if (config.debug) {
      console.log(target);
    }
    var previousIngredient = this.ingredient;
    switch (target.name) {
      case "name":
        if (config.debug) {
          console.log("change name : " + target.value);
        }
        previousIngredient.name = target.value;
        break;
      case "count":
        if (config.debug) {
          console.log("change count : " + target.value);
        }
        previousIngredient.count = target.value;
        break;
      default:
        if (config.debug) {
          console.log("/!\\ no match : " + target.name);
        }
    }
    // Update
    if (config.debug) {
      console.log("Ingredient.ingredient");
      console.log(this.ingredient);
    }
    this.ingredient = previousIngredient;
    //this.props.onchange(this.ingredient);

    //  Add next ingredient
    if (this.state.setableIngredient) {
      console.log("this");
      console.log(this);
      this.props.oningredienttoadd();
    }
  }
}
