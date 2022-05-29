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
  IconButton
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

import config from "../config";
import appcopy from "./copy";
import { random_id } from "./toolkit";
import { getRecipe, createRecipe, modifyRecipe } from "./api/recipies";

let emptyRecipe = {
  _id: "",
  name: undefined,
  portions: undefined,
  ingredients: [],
  instructions: [],
  scale: 1,
  state: {
    selected: false,
    cooked: false
  }
};
function getEmptyIngredient() {
  return {
    uid: random_id(),
    _id: "",
    name: "",
    count: null,
    unit: ""
  };
}
let nextables = {};

// NEED TO SET RECIPE AS THIS INSTEAD OF STATE
// NEED TO REWORK COMPONENT DID MOUNT

export default class Recipe extends React.Component {
  constructor(props) {
    if (config.debug) {
      console.log("Recipe.constructor");
    }
    super(props);
    this.state = {
      recipeOpen: this.props.recipeOpen,
      recipe: { ...emptyRecipe },
      ingredients: []
    };
    // Updates
    this.updateIngredients = this.updateIngredients.bind(this);
    // Handles
    this.handleClose = this.handleClose.bind(this);
    this.handleSave = this.handleSave.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleIngredientDelete = this.handleIngredientDelete.bind(this);
    this.handleIngredientChange = this.handleIngredientChange.bind(this);
  }
  render() {
    if (config.debug) {
      console.log("Recipe.render");
      console.log("Recipe.props.recipeID");
      console.log(this.props.recipeID);
      console.log("Recipe.state.recipe");
      console.log(this.state.recipe);
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
                defaultValue={this.state.recipe.name}
                onChange={this.handleChange}
              />

              <TextField
                name="portions"
                label={appcopy["input.portions"][config.app.language]}
                variant="standard"
                defaultValue={this.state.recipe.portions}
                onChange={this.handleChange}
              />

              <h3>
                {appcopy["title.subsection_ingredients"][config.app.language]}
              </h3>
              <List dense={true} name="recipe-ingredientlist">
                {this.state.ingredients.map((ingredient) => (
                  <Ingredient
                    key={ingredient.uid}
                    ingredient={ingredient}
                    nextable={nextables[ingredient.uid]}
                    onchange={this.handleIngredientChange}
                    ondelete={this.handleIngredientDelete}
                  />
                ))}
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
    if (this.state.recipeOpen === true) {
      this.updateIngredients();
    }
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
      if (this.props.recipeID !== "") {
        // Load
        console.log(
          "Recipe.componentDidUpdate.getRecipe " + this.props.recipeID
        );
        getRecipe(this.props.recipeID).then((res) => {
          this.setState((prevState, props) => ({
            recipe: res,
            recipeOpen: this.props.recipeOpen
          }));
        });
      } else {
        this.setState((prevState, props) => ({
          recipeOpen: this.props.recipeOpen,
          recipe: { ...emptyRecipe }
        }));
      }
    }
  }

  // Updates
  updateIngredients() {
    let recipeIngredients = this.state.recipe.ingredients;
    nextables = {};
    for (var i = 0; i < recipeIngredients.length; i++) {
      recipeIngredients[i].uid = random_id();
      this.nextables[this.state.ingredients[i].uid] = false;
    }
    // nextable extra one
    let emptyIngredient = getEmptyIngredient();
    recipeIngredients.push(emptyIngredient);
    nextables[emptyIngredient.uid] = true;
    // update state
    this.setState({
      ingredients: recipeIngredients
    });
  }

  // Handles
  handleClose() {
    if (config.debug) {
      console.log("Recipe.handleClose");
    }
    this.setState({
      recipe: { ...emptyRecipe }
    });
    this.props.onclose();
  }
  handleChange(event) {
    if (config.debug) {
      console.log("Recipe.handleChange");
    }
    const target = event.target;
    if (config.debug) {
      console.log(target);
    }
    var previousRecipe = this.state.recipe;
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
      console.log(this.state.recipe);
    }
    this.setState({
      recipe: previousRecipe
    });
  }
  handleSave() {
    if (config.debug) {
      console.log("Recipe.handleSave");
    }
    // Check inputs
    let save = true;
    let errors = [];
    if (this.state.recipe.name === undefined) {
      save = false;
      errors.push("Nom vide");
    }
    if (this.state.recipe.portions === undefined) {
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
        console.log(this.state.recipe);
      }
      if (this.props.recipeID === "") {
        // POST
        if (config.debug) {
          console.log("POST");
        }
        if (config.debug === false) {
          createRecipe(this.state.recipe).then(() => {
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
          modifyRecipe(this.props.recipeID, this.state.recipe).then(() => {
            this.props.onsave();
          });
        }
        this.props.onclose();
      }
    }
  }
  handleIngredientDelete(uid) {
    if (config.debug) {
      console.log("Recipe.handleIngredientDelete " + uid);
    }
    this.setState({
      ingredients: this.state.ingredients.filter(
        (ingredient) => ingredient.uid !== uid
      )
    });
  }
  handleIngredientChange(newIngredientValue) {
    if (config.debug) {
      console.log("Recipe.handleIngredientChange " + newIngredientValue.uid);
      console.log("newIngredientValue");
      console.log(newIngredientValue);
    }
    let currentIngredients = this.state.ingredients;
    // Nextable management
    if (nextables[newIngredientValue.uid] === true) {
      nextables[newIngredientValue.uid] = false;
      // nextable extra one
      let emptyIngredient = getEmptyIngredient();
      currentIngredients.push(emptyIngredient);
      nextables[emptyIngredient.uid] = true;
    }
    // Update
    currentIngredients[newIngredientValue.uid] = newIngredientValue;
    this.setState({
      ingredients: currentIngredients
    });
  }
}

class Ingredient extends React.Component {
  constructor(props) {
    super(props);
    if (config.debug) {
      console.log("Ingredient.constructor " + this.props.ingredient.uid);
      console.log("this.props.nextable");
      console.log(this.props.nextable);
    }
    // Handlers
    this.handleChange = this.handleChange.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }
  render() {
    if (config.debug) {
      console.log("Ingredient.render " + this.props.ingredient.uid);
      console.log("this.props.nextable");
      console.log(this.props.nextable);
    }
    return (
      <ListItem
        key={this.props.ingredient.uid}
        secondaryAction={
          <IconButton
            edge="end"
            onClick={() => {
              this.handleDelete();
            }}
            disabled={this.props.nextable}
          >
            <DeleteIcon disabled={this.props.nextable} />
          </IconButton>
        }
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "ro  qqw",
            justifyContent: "space-evenly"
          }}
        >
          <TextField
            name="name"
            label={appcopy["input.name"][config.app.language]}
            variant="standard"
            defaultValue={this.props.ingredient.name}
            onChange={this.handleChange}
          />
          <TextField
            name="count"
            label={appcopy["input.count"][config.app.language]}
            variant="standard"
            defaultValue={this.props.ingredient.count}
            onChange={this.handleChange}
          />
          <TextField
            name="unit"
            label={appcopy["input.unit"][config.app.language]}
            variant="standard"
            defaultValue={this.props.ingredient.unit}
            onChange={this.handleChange}
          />
        </Box>
      </ListItem>
    );
  }

  // Handlers()
  handleChange(event) {
    if (config.debug) {
      console.log("Ingredient.handleChange");
    }
    const target = event.target;
    if (config.debug) {
      console.log(target);
    }
    var updatingIngredient = this.props.ingredient;
    switch (target.name) {
      case "name":
        if (config.debug) {
          console.log("change name : " + target.value);
        }
        updatingIngredient.name = target.value;
        break;
      case "count":
        if (config.debug) {
          console.log("change count : " + target.value);
        }
        updatingIngredient.count = target.value;
        break;
      default:
        if (config.debug) {
          console.log("/!\\ no match : " + target.name);
        }
    }
    // Update
    if (config.debug) {
      console.log("updatingIngredient");
      console.log(updatingIngredient);
    }
    this.props.onchange(updatingIngredient);
  }
  handleDelete() {
    if (config.debug) {
      console.log("Ingredient.handleDelete " + this.props.ingredient.uid);
    }
    // Check inputs
    let deleteIngredient = true;
    if (this.props.ingredient.name === "") {
      deleteIngredient = false;
    }
    if (
      this.props.ingredient.quantity === null ||
      this.props.ingredient.quantity === ""
    ) {
      deleteIngredient = false;
    }
    // Delete or not?
    if (deleteIngredient === true) {
      this.props.ondelete(this.props.ingredient.uid);
    }
  }
}
