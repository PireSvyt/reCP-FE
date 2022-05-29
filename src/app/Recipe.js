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

import appcopy from "./copy";
import { random_id } from "./toolkit";
import { getRecipe, createRecipe, modifyRecipe } from "./api/recipies";
import { createIngredient } from "./api/ingredients";
import Snack from "./Snack";

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
    name: undefined,
    quantity: undefined,
    unit: undefined,
    nextable: true
  };
}

// NEED TO SET RECIPE AS THIS INSTEAD OF STATE
// NEED TO REWORK COMPONENT DID MOUNT

export default class Recipe extends React.Component {
  constructor(props) {
    if (process.env.REACT_APP_DEBUG === "TRUE") {
      console.log("Recipe.constructor");
    }
    super(props);
    this.state = {
      recipeOpen: this.props.recipeOpen,
      recipe: { ...emptyRecipe },
      snackOpen: false,
      snackSeverity: "warning",
      snackMessage: "Empty",
      snackDuration: 5000
    };
    // Handles
    this.handleClose = this.handleClose.bind(this);
    this.handleSave = this.handleSave.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleIngredientDelete = this.handleIngredientDelete.bind(this);
    this.handleIngredientChange = this.handleIngredientChange.bind(this);
    this.handleCloseSnack = this.handleCloseSnack.bind(this);
  }
  render() {
    if (process.env.REACT_APP_DEBUG === "TRUE") {
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
            {appcopy["recipe"]["title"][process.env.REACT_APP_LANGUAGE]}
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
                label={
                  appcopy["generic"]["input"]["name"][
                    process.env.REACT_APP_LANGUAGE
                  ]
                }
                variant="standard"
                defaultValue={this.state.recipe.name}
                onChange={this.handleChange}
              />

              <TextField
                name="portions"
                label={
                  appcopy["generic"]["input"]["portions"][
                    process.env.REACT_APP_LANGUAGE
                  ]
                }
                variant="standard"
                defaultValue={this.state.recipe.portions}
                onChange={this.handleChange}
              />

              <h3>
                {
                  appcopy["recipe"]["subsection"]["ingredients"][
                    process.env.REACT_APP_LANGUAGE
                  ]
                }
              </h3>
              <List dense={true} name="recipe-ingredientlist">
                {this.state.recipe.ingredients.map((ingredient) => (
                  <Ingredient
                    key={ingredient.uid}
                    ingredient={ingredient}
                    onchange={this.handleIngredientChange}
                    ondelete={this.handleIngredientDelete}
                  />
                ))}
              </List>

              <h3>
                {
                  appcopy["recipe"]["subsection"]["instructions"][
                    process.env.REACT_APP_LANGUAGE
                  ]
                }
              </h3>
              <List dense={true}></List>
            </Box>
          </DialogContent>

          <DialogActions>
            <Button onClick={this.handleClose}>
              {
                appcopy["generic"]["button"]["cancel"][
                  process.env.REACT_APP_LANGUAGE
                ]
              }
            </Button>
            <Button variant="contained" onClick={this.handleSave}>
              {
                appcopy["generic"]["button"]["save"][
                  process.env.REACT_APP_LANGUAGE
                ]
              }
            </Button>
          </DialogActions>
        </Dialog>

        <Snack
          snackOpen={this.state.snackOpen}
          snackMessage={this.state.snackMessage}
          snackDuration={this.state.snackDuration}
          snackSeverity={this.state.snackSeverity}
          onclose={this.handleCloseSnack}
        />
      </div>
    );
  }
  componentDidMount() {
    if (process.env.REACT_APP_DEBUG === "TRUE") {
      console.log("Recipe.componentDidMount");
    }
  }
  componentDidUpdate(prevState) {
    if (process.env.REACT_APP_DEBUG === "TRUE") {
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
          res.ingredients.forEach((ingredient) => {
            ingredient.uid = random_id();
            ingredient.nextable = false;
            ingredient.name = undefined;
            ingredient.unit = undefined;
          });
          res.ingredients.push(getEmptyIngredient());
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

  // Handles
  handleClose() {
    if (process.env.REACT_APP_DEBUG === "TRUE") {
      console.log("Recipe.handleClose");
    }
    this.setState({
      recipe: { ...emptyRecipe }
    });
    this.props.onclose();
  }
  handleChange(event) {
    if (process.env.REACT_APP_DEBUG === "TRUE") {
      console.log("Recipe.handleChange");
    }
    const target = event.target;
    if (process.env.REACT_APP_DEBUG === "TRUE") {
      console.log(target);
    }
    var previousRecipe = this.state.recipe;
    switch (target.name) {
      case "name":
        if (process.env.REACT_APP_DEBUG === "TRUE") {
          console.log("change name : " + target.value);
        }
        previousRecipe.name = target.value;
        break;
      case "portions":
        if (process.env.REACT_APP_DEBUG === "TRUE") {
          console.log("change portions : " + target.value);
        }
        previousRecipe.portions = target.value;
        break;
      default:
        if (process.env.REACT_APP_DEBUG === "TRUE") {
          console.log("/!\\ no match : " + target.name);
        }
    }
    // Update
    if (process.env.REACT_APP_DEBUG === "TRUE") {
      console.log("Recipe.recipe");
      console.log(this.state.recipe);
    }
    this.setState({
      recipe: previousRecipe
    });
  }
  handleSave() {
    if (process.env.REACT_APP_DEBUG === "TRUE") {
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
    // Ingredient checks

    // Save or not?
    if (errors !== []) {
      console.log(errors);
    }
    // Post or publish
    if (save === true) {
      // Polish
      let recipe = this.state.recipe;
      recipe.ingredients.forEach((ingredient) => {
        // Remove ingredient if not complete
        if (
          ingredient.name === undefined ||
          ingredient.name === "" ||
          ingredient.quantity === undefined ||
          ingredient.quantity === "" ||
          ingredient.unit === undefined ||
          ingredient.unit === ""
        ) {
          delete recipe[ingredient];
        }
        // Delete UI attributes
        delete ingredient["uid"];
        delete ingredient["nextable"];
        // Save ingredient if new
        if (ingredient._id === undefined || ingredient._id === "") {
          let newIngredient = ingredient;
          newIngredient.category = "";
          newIngredient.shops = [];
          createIngredient(newIngredient).then((res) => {
            if (res !== undefined) {
              if (res.message === "ingredient enregistré") {
                let snack = {
                  severity: appcopy["recipe"]["snack"]["saved"]["severity"],
                  message:
                    appcopy["recipe"]["snack"]["saved"][
                      process.env.REACT_APP_LANGUAGE
                    ],
                  duration: 3000
                };
                this.props.onclose(snack);
              } else {
                let snack = {
                  severity:
                    appcopy["recipe"]["snack"]["erroroncreation"]["severity"],
                  message:
                    appcopy["recipe"]["snack"]["erroroncreation"][
                      process.env.REACT_APP_LANGUAGE
                    ],
                  duration: 3000
                };
                this.props.onclose(snack);
              }
            } else {
              let snack = {
                severity:
                  appcopy["generic"]["snack"]["errornetwork"]["severity"],
                message:
                  appcopy["generic"]["snack"]["errornetwork"][
                    process.env.REACT_APP_LANGUAGE
                  ],
                duration: 3000
              };
              this.props.onclose(snack);
            }
          });
        }
        // Remove
        delete ingredient["name"];
        delete ingredient["unit"];
      });
      if (process.env.REACT_APP_DEBUG === "TRUE") {
        console.log(this.props.recipeID);
        console.log(this.state.recipe);
      }
      if (this.props.recipeID === "") {
        // POST
        if (process.env.REACT_APP_DEBUG === "TRUE") {
          console.log("POST");
        }
        if (process.env.REACT_APP_DEBUG === false) {
          createRecipe(recipe).then((res) => {
            //this.props.onsave();
            if (res !== undefined) {
              if (res.message === "recette enregistrée") {
                let snack = {
                  severity: appcopy["recipe"]["snack"]["saved"]["severity"],
                  message:
                    appcopy["recipe"]["snack"]["saved"][
                      process.env.REACT_APP_LANGUAGE
                    ],
                  duration: 3000
                };
                this.props.onclose(snack);
              } else {
                let snack = {
                  severity:
                    appcopy["recipe"]["snack"]["erroroncreation"]["severity"],
                  message:
                    appcopy["recipe"]["snack"]["erroroncreation"][
                      process.env.REACT_APP_LANGUAGE
                    ],
                  duration: 3000
                };
                this.props.onclose(snack);
              }
            } else {
              let snack = {
                severity:
                  appcopy["generic"]["snack"]["errornetwork"]["severity"],
                message:
                  appcopy["generic"]["snack"]["errornetwork"][
                    process.env.REACT_APP_LANGUAGE
                  ],
                duration: 3000
              };
              this.props.onclose(snack);
            }
          });
        }
        this.props.onclose();
      } else {
        // PUT
        if (process.env.REACT_APP_DEBUG === "TRUE") {
          console.log("PUT");
        }
        if (process.env.REACT_APP_DEBUG === false) {
          modifyRecipe(this.props.recipeID, recipe).then((res) => {
            //this.props.onsave();
            if (res !== undefined) {
              if (res.message === "recette modifiée") {
                let snack = {
                  severity: appcopy["recipe"]["snack"]["modified"]["severity"],
                  message:
                    appcopy["recipe"]["snack"]["modified"][
                      process.env.REACT_APP_LANGUAGE
                    ],
                  duration: 3000
                };
                this.props.onclose(snack);
              } else {
                let snack = {
                  severity:
                    appcopy["recipe"]["snack"]["erroroncreation"]["severity"],
                  message:
                    appcopy["recipe"]["snack"]["erroroncreation"][
                      process.env.REACT_APP_LANGUAGE
                    ],
                  duration: 3000
                };
                this.props.onclose(snack);
              }
            } else {
              let snack = {
                severity:
                  appcopy["generic"]["snack"]["errornetwork"]["severity"],
                message:
                  appcopy["generic"]["snack"]["errornetwork"][
                    process.env.REACT_APP_LANGUAGE
                  ],
                duration: 3000
              };
              this.props.onclose(snack);
            }
          });
        }
      }
    } else {
      // Snack
      this.setState((prevState, props) => ({
        snackOpen: true,
        snackSeverity: appcopy["generic"]["snack"]["error"]["severity"],
        snackMessage:
          appcopy["generic"]["snack"]["error"][process.env.REACT_APP_LANGUAGE] +
          errors,
        snackDuration: 5000
      }));
    }
  }
  handleIngredientDelete(uid) {
    if (process.env.REACT_APP_DEBUG === "TRUE") {
      console.log("Recipe.handleIngredientDelete " + uid);
    }
    let ingredients = this.state.recipe.ingredients.filter(
      (ingredient) => ingredient.uid !== uid
    );
    let recipe = this.state.recipe;
    recipe.ingredients = ingredients;
    this.setState({
      recipe: recipe
    });
  }
  handleIngredientChange(newIngredientValue) {
    if (process.env.REACT_APP_DEBUG === "TRUE") {
      console.log("Recipe.handleIngredientChange " + newIngredientValue.uid);
      console.log("newIngredientValue");
      console.log(newIngredientValue);
    }
    let currentIngredients = this.state.recipe.ingredients;
    // Nextable management
    if (newIngredientValue.nextable === true) {
      newIngredientValue.nextable = false;
      // nextable extra one
      let emptyIngredient = getEmptyIngredient();
      currentIngredients.push(emptyIngredient);
    }
    // Update
    currentIngredients[newIngredientValue.uid] = newIngredientValue;
    this.setState({
      ingredients: currentIngredients
    });
  }
  handleCloseSnack() {
    if (process.env.REACT_APP_DEBUG === "TRUE") {
      console.log("Recipe.handleCloseSnack");
    }
    this.setState((prevState, props) => ({
      snackOpen: false
    }));
  }
}

class Ingredient extends React.Component {
  constructor(props) {
    super(props);
    if (process.env.REACT_APP_DEBUG === "TRUE") {
      console.log("Ingredient.constructor " + this.props.ingredient.uid);
    }
    // Handlers
    this.handleChange = this.handleChange.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }
  render() {
    if (process.env.REACT_APP_DEBUG === "TRUE") {
      console.log("Ingredient.render " + this.props.ingredient.uid);
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
            disabled={this.props.ingredient.nextable}
          >
            <DeleteIcon disabled={this.props.ingredient.nextable} />
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
            label={
              appcopy["generic"]["input"]["name"][
                process.env.REACT_APP_LANGUAGE
              ]
            }
            variant="standard"
            defaultValue={this.props.ingredient.name}
            onChange={this.handleChange}
          />
          <TextField
            name="count"
            label={
              appcopy["generic"]["input"]["quantity"][
                process.env.REACT_APP_LANGUAGE
              ]
            }
            variant="standard"
            defaultValue={this.props.ingredient.quantity}
            onChange={this.handleChange}
          />
          <TextField
            name="unit"
            label={
              appcopy["generic"]["input"]["unit"][
                process.env.REACT_APP_LANGUAGE
              ]
            }
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
    if (process.env.REACT_APP_DEBUG === "TRUE") {
      console.log("Ingredient.handleChange");
    }
    const target = event.target;
    if (process.env.REACT_APP_DEBUG === "TRUE") {
      console.log(target);
    }
    var updatingIngredient = this.props.ingredient;
    switch (target.name) {
      case "name":
        if (process.env.REACT_APP_DEBUG === "TRUE") {
          console.log("change name : " + target.value);
        }
        updatingIngredient.name = target.value;
        break;
      case "count":
        if (process.env.REACT_APP_DEBUG === "TRUE") {
          console.log("change count : " + target.value);
        }
        updatingIngredient.count = target.value;
        break;
      default:
        if (process.env.REACT_APP_DEBUG === "TRUE") {
          console.log("/!\\ no match : " + target.name);
        }
    }
    // Update
    if (process.env.REACT_APP_DEBUG === "TRUE") {
      console.log("updatingIngredient");
      console.log(updatingIngredient);
    }
    this.props.onchange(updatingIngredient);
  }
  handleDelete() {
    if (process.env.REACT_APP_DEBUG === "TRUE") {
      console.log("Ingredient.handleDelete " + this.props.ingredient.uid);
    }
    this.props.ondelete(this.props.ingredient.uid);
  }
}
