import * as React from "react";
import {
  Button,
  TextField,
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  DialogContentText,
  List,
  ListItem,
  IconButton,
  AppBar,
  Toolbar,
  Typography
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import CloseIcon from "@mui/icons-material/Close";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";

import appcopy from "./copy";
import { random_id } from "./toolkit";
import Snack from "./Snack";
import { apiGetRecipe } from "./api/gets";
import { apiSetRecipeSave, apiSetRecipeDelete } from "./api/sets";

function getEmptyComponent(type) {
  switch (type) {
    case "recipe":
      return {
        _id: undefined,
        name: undefined,
        portions: undefined,
        ingredients: [
          {
            uid: random_id(),
            _id: "",
            name: undefined,
            quantity: undefined,
            unit: undefined,
            nextable: true
          }
        ],
        instructions: [],
        scale: 1,
        state: {
          selected: false,
          cooked: false
        }
      };
    case "ingredient":
      return {
        uid: random_id(),
        _id: "",
        name: undefined,
        quantity: undefined,
        unit: undefined,
        nextable: true
      };
    default:
      return undefined;
  }
}

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
      recipe: getEmptyComponent("recipe"),
      openSnack: false,
      snack: undefined,
      openConfirm: false,
      confirmContent: { title: "", text: "" }
    };
    // Handles
    this.handleClose = this.handleClose.bind(this);
    this.handleSave = this.handleSave.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleIngredientDelete = this.handleIngredientDelete.bind(this);
    this.handleIngredientChange = this.handleIngredientChange.bind(this);
    this.handleCloseSnack = this.handleCloseSnack.bind(this);
    this.handleCloseConfirm = this.handleCloseConfirm.bind(this);
    this.handleConfirmDelete = this.handleConfirmDelete.bind(this);
  }
  render() {
    if (process.env.REACT_APP_DEBUG === "TRUE") {
      console.log("Recipe.render");
      //console.log(this.state.recipe);
    }
    return (
      <div>
        <Dialog
          id="dialog_recipe"
          open={this.props.open}
          onClose={this.handleClose}
          fullScreen
        >
          <AppBar sx={{ position: "relative" }}>
            <Toolbar>
              <IconButton
                edge="start"
                color="inherit"
                onClick={this.handleClose}
                aria-label="close"
              >
                <CloseIcon />
              </IconButton>
              <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
                {appcopy["recipe"]["title"][this.props.language]}
              </Typography>
              <IconButton
                edge="start"
                color="inherit"
                onClick={this.handleDelete}
                sx={{ m: 1 }}
              >
                <DeleteIcon />
              </IconButton>
              <IconButton
                edge="start"
                color="inherit"
                onClick={this.handleSave}
                sx={{ m: 1 }}
              >
                <SaveIcon />
              </IconButton>
            </Toolbar>
          </AppBar>
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
                defaultValue={this.state.recipe.name}
                onChange={this.handleChange}
                autoComplete="off"
              />

              <TextField
                name="portions"
                label={
                  appcopy["generic"]["input"]["portions"][this.props.language]
                }
                variant="standard"
                defaultValue={this.state.recipe.portions}
                onChange={this.handleChange}
                autoComplete="off"
                type="number"
              />

              <h3>
                {
                  appcopy["recipe"]["subsection"]["ingredients"][
                    this.props.language
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
        </Dialog>

        <ConfirmModal
          open={this.state.openConfirm}
          content={this.state.confirmContent}
          onclose={this.handleCloseConfirm}
          onconfirm={this.handleConfirmDelete}
          language={this.props.language}
        />

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
    if (prevState.open !== this.props.open && this.props.open) {
      if (this.props.recipeid === "") {
        this.setState((prevState, props) => ({
          recipe: getEmptyComponent("recipe")
        }));
      } else {
        apiGetRecipe(this.props.recipeid).then((res) => {
          switch (res.status) {
            case 200:
              res.recipe.ingredients.forEach((ingredient) => {
                ingredient.uid = random_id();
                ingredient.nextable = false;
              });
              res.recipe.ingredients.push(getEmptyComponent("ingredient"));
              this.setState({
                recipe: res.recipe
              });

              break;
            case 206:
              this.setState({
                //recipe: getEmptyComponent("recipe"),
                openSnack: true,
                snack: appcopy["recipe"]["snack"]["206 - inconsistency on load"]
              });
              this.props.onclose();
              break;
            case 400:
              this.setState((prevState, props) => ({
                //recipe: getEmptyComponent("recipe"),
                openSnack: true,
                snack: appcopy["generic"]["snack"]["errornetwork"]
              }));
              this.props.onclose();
              break;
            default:
              this.setState((prevState, props) => ({
                //recipe: getEmptyComponent("recipe"),
                openSnack: true,
                snack: appcopy["generic"]["snack"]["errorunknown"]
              }));
              this.props.onclose();
          }
        });
      }
    }
  }

  // Handles
  handleClose() {
    if (process.env.REACT_APP_DEBUG === "TRUE") {
      console.log("Recipe.handleClose");
    }
    this.setState((prevState, props) => ({
      recipe: getEmptyComponent("recipe")
    }));
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
        previousRecipe.portions = Number(target.value);
        break;
      default:
        if (process.env.REACT_APP_DEBUG === "TRUE") {
          console.log("/!\\ no match : " + target.name);
        }
    }
    // Update
    this.setState((prevState, props) => ({
      recipe: previousRecipe
    }));
    if (process.env.REACT_APP_DEBUG === "TRUE") {
      console.log("Recipe.recipe");
      console.log(this.state.recipe);
    }
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
    // Save or not?
    if (errors !== []) {
      console.log(errors);
    }
    // Post or publish
    if (save === true) {
      // Check
      const recipe = JSON.parse(JSON.stringify(this.state.recipe));
      recipe.ingredients = recipe.ingredients.filter((ingredient) => {
        var isConform =
          ingredient.name !== undefined &&
          ingredient.name !== "" &&
          ingredient.quantity !== undefined &&
          ingredient.quantity > 0 &&
          ingredient.unit !== undefined &&
          ingredient.unit !== "";
        return isConform;
      });
      // Polish
      recipe.ingredients.forEach((ingredient) => {
        if (ingredient.uid) {
          delete ingredient.uid;
          delete ingredient.nextable;
        }
      });

      if (process.env.REACT_APP_DEBUG === "TRUE") {
        console.log(recipe);
      }
      apiSetRecipeSave(recipe).then((res) => {
        switch (res.status) {
          case 200:
            this.setState((prevState, props) => ({
              recipe: getEmptyComponent("recipe"),
              openSnack: true,
              snack: appcopy["recipe"]["snack"]["saved"]
            }));
            this.props.onclose();
            this.props.onsedit();
            break;
          case 201:
            this.setState({
              recipe: getEmptyComponent("recipe"),
              openSnack: true,
              snack: appcopy["recipe"]["snack"]["edited"]
            });
            this.props.onclose();
            this.props.onsedit();
            break;
          case 406:
            this.setState({
              recipe: getEmptyComponent("recipe"),
              openSnack: true,
              snack:
                appcopy["recipe"]["snack"]["406 - issue on new ingredient save"]
            });
            break;
          case 400:
            this.setState({
              openSnack: true,
              snack: appcopy["generic"]["snack"]["errornetwork"]
            });
            break;
          default:
            this.setState((prevState, props) => ({
              openSnack: true,
              snack: appcopy["generic"]["snack"]["errorunknown"]
            }));
        }
      });
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
  handleDelete() {
    if (process.env.REACT_APP_DEBUG === "TRUE") {
      console.log("Recipe.handleDelete");
    }
    this.setState((prevState, props) => ({
      openConfirm: true,
      confirmContent: {
        title:
          appcopy["recipe"]["specific"]["deletionconfirmtitle"][
            this.props.language
          ],
        text:
          appcopy["recipe"]["specific"]["deletionconfirmtext"][
            this.props.language
          ]
      }
    }));
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
    this.setState((prevState, props) => ({
      recipe: recipe
    }));
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
      currentIngredients.push(getEmptyComponent("ingredient"));
    }
    // Update
    currentIngredients[newIngredientValue.uid] = newIngredientValue;
    let recipe = this.state.recipe;
    recipe.ingredients = currentIngredients;
    this.setState((prevState, props) => ({
      recipe: recipe
    }));
  }
  handleCloseSnack() {
    if (process.env.REACT_APP_DEBUG === "TRUE") {
      console.log("Recipe.handleCloseSnack");
    }
    this.setState((prevState, props) => ({
      openSnack: false
    }));
  }
  handleCloseConfirm() {
    if (process.env.REACT_APP_DEBUG === "TRUE") {
      console.log("Recipe.handleCloseConfirm");
    }
    this.setState((prevState, props) => ({
      openConfirm: false
    }));
  }
  handleConfirmDelete() {
    if (process.env.REACT_APP_DEBUG === "TRUE") {
      console.log("Recipe.handleConfirmDelete");
    }
    apiSetRecipeDelete(this.props.recipeid).then((res) => {
      switch (res.status) {
        case 200:
          this.setState((prevState, props) => ({
            openConfirm: false,
            recipe: getEmptyComponent("recipe"),
            openSnack: true,
            snack: appcopy["recipe"]["snack"]["deleted"]
          }));
          this.props.onclose();
          this.props.onsedit();
          break;
        case 400:
          this.setState({
            openSnack: true,
            snack: appcopy["generic"]["snack"]["errornetwork"]
          });
          break;
        default:
          this.setState((prevState, props) => ({
            openSnack: true,
            snack: appcopy["generic"]["snack"]["errorunknown"]
          }));
      }
    });
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
            autoComplete="off"
          />
          <TextField
            name="quantity"
            label={appcopy["generic"]["input"]["quantity"][this.props.language]}
            variant="standard"
            defaultValue={this.props.ingredient.quantity}
            onChange={this.handleChange}
            autoComplete="off"
            type="number"
          />
          <TextField
            name="unit"
            label={appcopy["generic"]["input"]["unit"][this.props.language]}
            variant="standard"
            defaultValue={this.props.ingredient.unit}
            onChange={this.handleChange}
            autoComplete="off"
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
      case "quantity":
        if (process.env.REACT_APP_DEBUG === "TRUE") {
          console.log("change quantity : " + target.value);
        }
        updatingIngredient.quantity = Number(target.value);
        break;
      case "unit":
        if (process.env.REACT_APP_DEBUG === "TRUE") {
          console.log("change unit : " + target.value);
        }
        updatingIngredient.unit = target.value;
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

class ConfirmModal extends React.Component {
  /* Inputs
  open
  text
  title  
  */
  constructor(props) {
    super(props);
    if (process.env.REACT_APP_DEBUG === "TRUE") {
      console.log("ConfirmModal.constructor");
    }
    this.handleClose = this.handleClose.bind(this);
    this.handleConfirm = this.handleConfirm.bind(this);
  }
  render() {
    if (process.env.REACT_APP_DEBUG === "TRUE") {
      console.log("ConfirmModal.render");
    }
    return (
      <Dialog open={this.props.open} onClose={this.handleClose}>
        <DialogTitle>{this.props.content.title}</DialogTitle>
        <DialogContent>
          <DialogContentText>{this.props.content.text}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={this.handleClose}>
            {appcopy["generic"]["button"]["cancel"][this.props.language]}
          </Button>
          <Button onClick={this.handleConfirm} autoFocus>
            {appcopy["generic"]["button"]["confirm"][this.props.language]}
          </Button>
        </DialogActions>
      </Dialog>
    );
  }

  // Handles
  handleClose() {
    if (process.env.REACT_APP_DEBUG === "TRUE") {
      console.log("ConfirmModal.handleClose");
    }
    this.props.onclose();
  }
  handleConfirm() {
    if (process.env.REACT_APP_DEBUG === "TRUE") {
      console.log("ConfirmModal.handleConfirm");
    }
    this.props.onconfirm();
  }
}
