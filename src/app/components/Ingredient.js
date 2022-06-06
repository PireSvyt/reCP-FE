import * as React from "react";
import {
  Button,
  TextField,
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle
} from "@mui/material";

import appcopy from "../copy";
import { apiGetIngredient } from "../api/gets";
import { apiSetIngredientSave } from "../api/sets";
import Snack from "./Snack";

let emptyIngredient = {
  _id: undefined,
  name: undefined,
  shop: []
};

export default class Ingredient extends React.Component {
  constructor(props) {
    if (process.env.REACT_APP_DEBUG === "TRUE") {
      console.log("Ingredient.constructor");
    }
    super(props);
    if (process.env.REACT_APP_DEBUG === "TRUE") {
      console.log("Ingredient language = " + this.props.language);
    }
    this.state = {
      ingredient: { ...emptyIngredient },
      openSnack: false,
      snack: undefined
    };
    // Handles
    this.handleClose = this.handleClose.bind(this);
    this.handleSave = this.handleSave.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleCloseSnack = this.handleCloseSnack.bind(this);
  }
  render() {
    if (process.env.REACT_APP_DEBUG === "TRUE") {
      console.log("Ingredient.render");
    }
    return (
      <div>
        <Dialog
          id="dialog_transaction"
          open={this.props.open}
          onClose={this.handleClose}
          fullWidth={true}
        >
          <DialogTitle>
            {appcopy["ingredient"]["title"][this.props.language]}
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
                value={this.state.ingredient.name || ""}
                onChange={this.handleChange}
                autoComplete="off"
              />
              <TextField
                name="unit"
                label={appcopy["generic"]["input"]["unit"][this.props.language]}
                variant="standard"
                value={this.state.ingredient.unit || ""}
                onChange={this.handleChange}
                autoComplete="off"
              />
            </Box>
            TODO : shelf, season, shop
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
  componentDidMount() {
    if (process.env.REACT_APP_DEBUG === "TRUE") {
      //console.log("Ingredient.componentDidMount");
    }
  }
  componentDidUpdate(prevState) {
    if (process.env.REACT_APP_DEBUG === "TRUE") {
      //console.log("Ingredient.componentDidUpdate");
      //console.log("Ingredient.state");
      //console.log(this.state);
    }
    if (
      prevState.open !== this.props.open ||
      prevState.ingredientid !== this.props.ingredientid
    ) {
      if (this.props.ingredientid !== "") {
        // Load
        apiGetIngredient(this.props.ingredientid).then((res) => {
          switch (res.status) {
            case 200:
              this.setState({
                ingredient: res.ingredient
              });
              break;
            case 400:
              this.setState((prevState, props) => ({
                ingredient: emptyIngredient,
                openSnack: true,
                snack: appcopy["generic"]["snack"]["errornetwork"]
              }));
              this.props.onclose();
              break;
            default:
              this.setState((prevState, props) => ({
                ingredient: emptyIngredient,
                openSnack: true,
                snack: appcopy["generic"]["snack"]["errorunknown"]
              }));
              this.props.onclose();
          }
        });
      } else {
        this.setState((prevState, props) => ({
          ingredient: { ...emptyIngredient }
        }));
      }
    }
  }

  // Handles
  handleClose() {
    if (process.env.REACT_APP_DEBUG === "TRUE") {
      console.log("Ingredient.handleClose");
    }
    this.setState((prevState, props) => ({
      ingredient: { ...emptyIngredient },
      openSnack: true,
      snack: appcopy["ingredient"]["snack"]["discarded"]
    }));
    this.props.onclose();
  }
  handleChange(event, newValue) {
    if (process.env.REACT_APP_DEBUG === "TRUE") {
      console.log("Ingredient.handleChange");
    }
    const target = event.target;
    if (process.env.REACT_APP_DEBUG === "TRUE") {
      console.log("target.name : " + target.name);
      console.log("target.value : " + target.value);
      console.log("newValue : " + newValue);
    }
    var previousIngredient = this.state.ingredient;
    switch (target.name) {
      case "name":
        if (process.env.REACT_APP_DEBUG === "TRUE") {
          console.log("change name : " + target.value);
        }
        previousIngredient.name = target.value;
        break;
      case "unit":
        if (process.env.REACT_APP_DEBUG === "TRUE") {
          console.log("change unit : " + target.value);
        }
        previousIngredient.unit = target.value;
        break;
      default:
        if (process.env.REACT_APP_DEBUG === "TRUE") {
          console.log("/!\\ no match : " + target.name);
        }
    }
    // Update
    if (process.env.REACT_APP_DEBUG === "TRUE") {
      console.log("Ingredient.ingredient");
      console.log(this.state.ingredient);
    }
    this.setState((prevState, props) => ({
      ingredient: previousIngredient
    }));
  }
  handleSave() {
    if (process.env.REACT_APP_DEBUG === "TRUE") {
      console.log("Ingredient.handleSave");
      console.log("this.state.ingredient");
      console.log(this.state.ingredient);
    }
    // Check inputs
    let save = true;
    let errors = [];
    if (this.state.ingredient.name === undefined) {
      save = false;
      errors.push(" Nom vide");
    }
    if (this.state.ingredient.unit === undefined) {
      save = false;
      errors.push(" Unité vide");
    }
    // Save or not?
    if (errors !== [] && process.env.REACT_APP_DEBUG === "TRUE") {
      console.log(errors);
    }
    // Post or publish
    if (save === true) {
      if (process.env.REACT_APP_DEBUG === "TRUE") {
        console.log(this.props.ingredientid);
        console.log(this.state.ingredient);
      }
      apiSetIngredientSave(this.state.ingredient).then((res) => {
        switch (res.status) {
          case 201:
            this.setState({
              ingredient: emptyIngredient,
              openSnack: true,
              snack: appcopy["ingredient"]["snack"]["saved"]
            });
            this.props.onclose();
            this.props.onedit(this.state.ingredient);
            break;
          case 200:
            this.setState((prevState, props) => ({
              ingredient: emptyIngredient,
              openSnack: true,
              snack: appcopy["ingredient"]["snack"]["edited"]
            }));
            this.props.onclose();
            this.props.onedit(this.state.ingredient);
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
  handleCloseSnack() {
    if (process.env.REACT_APP_DEBUG === "TRUE") {
      console.log("Ingredient.handleCloseSnack");
    }
    this.setState((prevState, props) => ({
      openSnack: false
    }));
  }
}
