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
  ListItemButton
} from "@mui/material";

import appcopy from "./copy";
import Snack from "./Snack";
import { getIngredients } from "./api/ingredients";

var ingredientList = [];
export { ingredientList };

export default class Ingredients extends React.Component {
  constructor(props) {
    if (process.env.REACT_APP_DEBUG === "TRUE") {
      console.log("Ingredients.constructor");
    }
    super(props);
    if (process.env.REACT_APP_DEBUG === "TRUE") {
      console.log("Ingredients language = " + this.props.language);
    }
    this.state = {
      open: false,
      ingredients: ingredientList
    };
    // Updates
    this.updateIngredients = this.updateIngredients.bind(this);
    // Handles
    this.handleClose = this.handleClose.bind(this);
    this.handleCloseSnack = this.handleCloseSnack.bind(this);
    this.handleOpenIngredient = this.handleOpenIngredient.bind(this);
    this.handleCloseIngredient = this.handleCloseIngredient.bind(this);
    this.handleSaveIngredient = this.handleSaveIngredient.bind(this);
  }
  render() {
    if (process.env.REACT_APP_DEBUG === "TRUE") {
      console.log("Ingredients.render");
    }
    return (
      <div>
        <Dialog
          id="dialog_ingredients"
          open={this.props.open}
          onClose={this.handleClose}
          fullWidth={true}
        >
          <DialogTitle>
            {appcopy["ingredients"]["title"][this.props.language]}
          </DialogTitle>
          <DialogContent></DialogContent>
          <List dense={true}>
            {this.state.ingredients.map((ingredient) => (
              <ListItem key={`${ingredient._id}`} id={`${ingredient._id}`}>
                <ListItemButton
                  onClick={() => {
                    if (process.env.REACT_APP_DEBUG === "TRUE") {
                      console.log(
                        "Ingredients.ingredients.onClick " + ingredient._id
                      );
                    }
                    this.handleOpenIngredient(ingredient._id);
                  }}
                >
                  <ListItemText
                    primary={`${ingredient.name}`}
                    secondary={`${ingredient.unit}, ${ingredient.category}, ${ingredient.shops}`}
                  />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
          <DialogActions>
            <Button variant="contained" onClick={this.handleClose}>
              {appcopy["generic"]["button"]["close"][this.props.language]}
            </Button>
          </DialogActions>
        </Dialog>

        <Snack
          snackOpen={this.state.snackOpen}
          snack={this.state.snack}
          onclose={this.handleCloseSnack}
          language={this.props.language}
        />
      </div>
    );
  }
  componentDidMount() {
    if (process.env.REACT_APP_DEBUG === "TRUE") {
      console.log("Ingredients.componentDidMount");
    }
    // Update
    this.updateIngredients();
  }
  componentDidUpdate(prevState) {
    if (process.env.REACT_APP_DEBUG === "TRUE") {
      //console.log("Ingredients.componentDidUpdate");
    }
    if (prevState.open !== this.props.open) {
      // Update
      this.updateIngredients();
    }
  }

  // Updates
  updateIngredients() {
    if (process.env.REACT_APP_DEBUG === "TRUE") {
      console.log("Ingredients.updateIngredients");
    }
    loadIngredients().then((outcome) => {
      console.log(outcome);
      if (outcome.status === "loaded") {
        this.setState({
          ingredients: outcome.res
        });
      } else {
        this.setState((prevState, props) => ({
          snack: appcopy["generic"]["snack"]["errornetwork"]
        }));
      }
    });
  }

  // Handles
  handleClose() {
    if (process.env.REACT_APP_DEBUG === "TRUE") {
      console.log("Ingredients.handleClose");
    }
    this.setState((prevState, props) => ({
      Ingredients: ""
    }));
    this.props.onclose(undefined);
  }
  handleOpenIngredient(id) {
    if (process.env.REACT_APP_DEBUG === "TRUE") {
      console.log("Ingredients.handleOpenIngredient " + id);
    }
    this.setState({
      recipeID: id,
      recipeOpen: true
    });
  }
  handleCloseIngredient() {
    if (process.env.REACT_APP_DEBUG === "TRUE") {
      console.log("Ingredients.handleCloseIngredient");
    }
    this.setState({
      recipeID: "",
      recipeOpen: false
    });
  }
  handleSaveIngredient() {
    if (process.env.REACT_APP_DEBUG === "TRUE") {
      console.log("Ingredients.handleSaveIngredient");
    }
    this.updateIngredients();
  }
  handleCloseSnack() {
    if (process.env.REACT_APP_DEBUG === "TRUE") {
      console.log("Ingredients.handleCloseSnack");
    }
    this.setState((prevState, props) => ({
      snackOpen: false
    }));
  }
}

export async function loadIngredients() {
  if (process.env.REACT_APP_DEBUG === "TRUE") {
    console.log("Ingredients.loadIngredients");
  }
  getIngredients().then((res) => {
    if (res !== undefined) {
      return { status: "success", res: res };
    } else {
      // Snack
      return { status: "error", res: [] };
    }
  });
}
