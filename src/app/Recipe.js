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
import { createRecipe, modifyRecipe } from "./api/recipies";
import { createIngredient } from "./api/ingredients";
import Snack from "./Snack";

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
    if (process.env.REACT_APP_DEBUG === "TRUE") {
      console.log("Recipe language = " + this.props.language);
    }
    this.state = {
      openSnack: false,
      snack: undefined
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
      console.log(this.props.values);
    }
    return (
      <div>
        <Dialog
          id="dialog_recipe"
          open={this.props.open}
          onClose={this.handleClose}
          fullWidth={true}
        >
          <DialogTitle>
            {appcopy["recipe"]["title"][this.props.language]}
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
                label={appcopy["generic"]["input"]["name"][this.props.language]}
                variant="standard"
                defaultValue={this.props.values.name}
                onChange={this.handleChange}
              />

              <TextField
                name="portions"
                label={
                  appcopy["generic"]["input"]["portions"][this.props.language]
                }
                variant="standard"
                defaultValue={this.props.values.portions}
                onChange={this.handleChange}
              />

              <h3>
                {
                  appcopy["recipe"]["subsection"]["ingredients"][
                    this.props.language
                  ]
                }
              </h3>
              <List dense={true} name="recipe-ingredientlist">
                {this.props.values.ingredients.map((ingredient) => (
                  <Ingredient
                    key={ingredient.uid}
                    ingredient={ingredient}
                    onchange={this.handleIngredientChange}
                    ondelete={this.handleIngredientDelete}
                    language={this.props.language}
                  />
                ))}
              </List>

              <h3>
                {
                  appcopy["recipe"]["subsection"]["instructions"][
                    this.props.language
                  ]
                }
              </h3>
              <List dense={true}></List>
            </Box>
          </DialogContent>

          <DialogActions>
            <Button onClick={this.handleClose}>
              {appcopy["generic"]["button"]["cancel"][this.props.language]}
            </Button>
            <Button variant="contained" onClick={this.handleSave}>
              {appcopy["generic"]["button"]["save"][this.props.language]}
            </Button>
          </DialogActions>
        </Dialog>

        <Snack
          open={this.state.openSnack}
          snack={this.state.snack}
          onclose={this.handleCloseSnack}
          language={this.props.language}
        />
      </div>
    );
  }
  componentDidUpdate(prevState) {
    if (process.env.REACT_APP_DEBUG === "TRUE") {
      //console.log("Recipe.componentDidUpdate");
    }
    if (prevState.open !== this.props.open) {
      this.props.values.ingredients.forEach((ingredient) => {
        ingredient.uid = random_id();
        ingredient.nextable = false;
        ingredient.name = undefined;
        ingredient.unit = undefined;
      });
      //this.props.values.ingredients.push(getEmptyIngredient());
    }
  }

  // Handles
  handleClose() {
    if (process.env.REACT_APP_DEBUG === "TRUE") {
      console.log("Recipe.handleClose");
    }
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
    var previousRecipe = this.props.values;
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
      console.log(this.props.values);
    }
    this.props.onchange(previousRecipe);
  }
  handleSave() {
    if (process.env.REACT_APP_DEBUG === "TRUE") {
      console.log("Recipe.handleSave");
    }
    // Check inputs
    let save = true;
    let errors = [];
    if (this.props.values.name === undefined) {
      save = false;
      errors.push("Nom vide");
    }
    if (this.props.values.portions === undefined) {
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
      let recipe = this.props.values;
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
                this.props.onclose(appcopy["recipe"]["snack"]["saved"]);
              } else {
                this.props.onclose(
                  appcopy["recipe"]["snack"]["erroroncreation"]
                );
              }
            } else {
              this.props.onclose(appcopy["generic"]["snack"]["errornetwork"]);
            }
          });
        }
        // Remove
        delete ingredient["name"];
        delete ingredient["unit"];
      });
      if (process.env.REACT_APP_DEBUG === "TRUE") {
        console.log(this.props.values);
      }
      if (this.props.values._id === "") {
        // POST
        if (process.env.REACT_APP_DEBUG === "TRUE") {
          console.log("POST");
        }
        //if (process.env.REACT_APP_DEBUG === "FALSE") {
        createRecipe(this.props.values).then((res) => {
          //this.props.onsave();
          if (res !== undefined) {
            if (res.message === "recette enregistrée") {
              this.props.onclose(appcopy["recipe"]["snack"]["saved"]);
            } else {
              this.props.onclose(appcopy["recipe"]["snack"]["erroroncreation"]);
            }
          } else {
            this.props.onclose(appcopy["generic"]["snack"]["errornetwork"]);
          }
        });
        /*} else {
          this.props.onclose(appcopy["generic"]["snack"]["mockedassaved"]);
        }*/
      } else {
        // PUT
        if (process.env.REACT_APP_DEBUG === "TRUE") {
          console.log("PUT");
        }
        //if (process.env.REACT_APP_DEBUG === "FALSE") {
        modifyRecipe(this.props.values._id, this.props.values).then((res) => {
          //this.props.onsave();
          if (res !== undefined) {
            if (res.message === "recette modifiée") {
              this.props.onclose(appcopy["recipe"]["snack"]["edited"]);
            } else {
              this.props.onclose(appcopy["recipe"]["snack"]["erroroncreation"]);
            }
          } else {
            this.props.onclose(appcopy["generic"]["snack"]["errornetwork"]);
          }
        });
        /*} else {
          this.props.onclose(appcopy["generic"]["snack"]["mockedassaved"]);
        }*/
      }
    } else {
      // Snack
      var snack = appcopy["generic"]["snack"]["error"];
      snack.message =
        appcopy["generic"]["snack"]["error"][this.props.language] + errors;
      this.setState((prevState, props) => ({
        openSnack: true,
        snack: snack
      }));
    }
  }
  handleIngredientDelete(uid) {
    if (process.env.REACT_APP_DEBUG === "TRUE") {
      console.log("Recipe.handleIngredientDelete " + uid);
    }
    let ingredients = this.props.values.ingredients.filter(
      (ingredient) => ingredient.uid !== uid
    );
    let recipe = this.props.values;
    recipe.ingredients = ingredients;
    this.props.onchange(recipe);
  }
  handleIngredientChange(newIngredientValue) {
    if (process.env.REACT_APP_DEBUG === "TRUE") {
      console.log("Recipe.handleIngredientChange " + newIngredientValue.uid);
      console.log("newIngredientValue");
      console.log(newIngredientValue);
    }
    let currentIngredients = this.props.values.ingredients;
    // Nextable management
    if (newIngredientValue.nextable === true) {
      newIngredientValue.nextable = false;
      // nextable extra one
      let emptyIngredient = getEmptyIngredient();
      currentIngredients.push(emptyIngredient);
    }
    // Update
    currentIngredients[newIngredientValue.uid] = newIngredientValue;
    let recipe = this.props.values;
    recipe.ingredients = currentIngredients;
    this.props.onchange(recipe);
  }
  handleCloseSnack() {
    if (process.env.REACT_APP_DEBUG === "TRUE") {
      console.log("Recipe.handleCloseSnack");
    }
    this.setState((prevState, props) => ({
      openSnack: false
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
            label={appcopy["generic"]["input"]["name"][this.props.language]}
            variant="standard"
            defaultValue={this.props.ingredient.name}
            onChange={this.handleChange}
          />
          <TextField
            name="count"
            label={appcopy["generic"]["input"]["quantity"][this.props.language]}
            variant="standard"
            defaultValue={this.props.ingredient.quantity}
            onChange={this.handleChange}
          />
          <TextField
            name="unit"
            label={appcopy["generic"]["input"]["unit"][this.props.language]}
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
