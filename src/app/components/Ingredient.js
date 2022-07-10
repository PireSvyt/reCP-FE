import * as React from "react";
import {
  Button,
  TextField,
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Autocomplete
} from "@mui/material";

import appcopy from "../copy";
import { apiGetIngredient } from "../api/gets";
import { apiSetIngredientSave } from "../api/sets";
import Snack from "./Snack";

let emptyIngredient = {
  _id: undefined,
  name: undefined,
  unit: undefined,
  category: undefined,
  shelf: undefined
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
      shelf: "",
      componentHeight: undefined,
      openSnack: false,
      snack: undefined
    };
    // Updates
    this.updateComponentHeight = this.updateComponentHeight.bind(this);
    // Utils
    this.getShelfName = this.getShelfName.bind(this);
    // Handles
    this.handleClose = this.handleClose.bind(this);
    this.handleSave = this.handleSave.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSnack = this.handleSnack.bind(this);
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
          <DialogContent
            sx={{
              height: this.state.componentHeight
            }}
          >
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
              <Autocomplete
                sx={{
                  width: "100%"
                }}
                disablePortal
                options={this.props.secondaryvalues}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    variant="standard"
                    label={
                      appcopy["generic"]["input"]["shelf"][this.props.language]
                    }
                  />
                )}
                renderOption={(props, option) => (
                  <li {...props}>{option.name}</li>
                )}
                value={this.state.shelf}
                onChange={(event, newValue) => {
                  event.target = {
                    name: "shelf",
                    value: newValue
                  };
                  this.handleChange(event, newValue);
                }}
                getOptionLabel={(option) => {
                  var shorlist = this.props.secondaryvalues.filter(function (
                    value,
                    index,
                    arr
                  ) {
                    if (typeof option === "string") {
                      return value.name === option;
                    } else {
                      return value.name === option.name;
                    }
                  });
                  if (shorlist.length === 1) {
                    return shorlist[0].name;
                  } else {
                    return "";
                  }
                }}
              />
              TODO : season
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
          callback={this.handleSnack}
          language={this.props.language}
        />
      </div>
    );
  }
  componentDidMount() {
    if (process.env.REACT_APP_DEBUG === "TRUE") {
      //console.log("Ingredient.componentDidMount");
    }
    this.updateComponentHeight();
  }
  componentDidUpdate(prevState) {
    if (process.env.REACT_APP_DEBUG === "TRUE") {
      //console.log("Ingredient.componentDidUpdate");
      //console.log("Ingredient.state");
      //console.log(this.state);
    }
    if (
      prevState.open !== this.props.open ||
      prevState.values !== this.props.values
    ) {
      if (this.props.values !== "") {
        // Load
        apiGetIngredient(this.props.values).then((res) => {
          switch (res.status) {
            case 200:
              console.log("loaded ingredient");
              console.log(res.ingredient);
              this.setState({
                ingredient: res.ingredient,
                shelf: this.getShelfName(res.ingredient.shelf)
              });
              break;
            case 400:
              this.setState((prevState, props) => ({
                ingredient: emptyIngredient,
                shelf: "",
                openSnack: true,
                snack: appcopy["generic"]["snack"]["errornetwork"]
              }));
              this.props.onclose();
              break;
            default:
              this.setState((prevState, props) => ({
                ingredient: emptyIngredient,
                shelf: "",
                openSnack: true,
                snack: appcopy["generic"]["snack"]["errorunknown"]
              }));
              this.props.callback("closeItem");
          }
        });
      } else {
        this.setState((prevState, props) => ({
          ingredient: { ...emptyIngredient },
          shelf: ""
        }));
      }
    }
  }

  // Updates
  updateComponentHeight() {
    if (process.env.REACT_APP_DEBUG === "TRUE") {
      console.log("Thisweek.updateComponentHeight");
    }
    this.setState({
      componentHeight: window.innerHeight - 115
    });
  }

  // Utils
  getShelfName(id) {
    if (process.env.REACT_APP_DEBUG === "TRUE") {
      console.log("Ingredient.getShelfName : " + id);
    }
    let selectedshelf = "";
    this.props.secondaryvalues.forEach((shelf) => {
      if (id === shelf._id) {
        selectedshelf = shelf.name;
      }
    });
    //console.log("shelf");
    //console.log(shelf);
    return selectedshelf;
  }

  // Handles
  handleClose() {
    if (process.env.REACT_APP_DEBUG === "TRUE") {
      console.log("Ingredient.handleClose");
    }
    this.setState((prevState, props) => ({
      ingredient: { ...emptyIngredient },
      shelf: "",
      openSnack: true,
      snack: appcopy["ingredient"]["snack"]["discarded"]
    }));
    this.props.callback("closeItem");
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
      case "shelf":
        if (process.env.REACT_APP_DEBUG === "TRUE") {
          console.log("change shelf : " + target.value._id);
        }
        previousIngredient.shelf = target.value._id;
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
      ingredient: previousIngredient,
      shelf: this.getShelfName(previousIngredient.shelf)
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
        console.log(this.props.values);
        console.log(this.state.ingredient);
      }
      apiSetIngredientSave(this.state.ingredient).then((res) => {
        switch (res.status) {
          case 201:
            //console.log("default");
            this.setState({
              ingredient: emptyIngredient,
              shelf: "",
              openSnack: true,
              snack: appcopy["ingredient"]["snack"]["saved"]
            });
            this.props.callback("closeItem");
            break;
          case 200:
            //console.log("modified");
            this.setState((prevState, props) => ({
              ingredient: emptyIngredient,
              shelf: "",
              openSnack: true,
              snack: appcopy["ingredient"]["snack"]["edited"]
            }));
            this.props.callback("closeItem");
            break;
          case 208: // Already reported https://en.wikipedia.org/wiki/List_of_HTTP_status_codes#4xx_client_errors
            //console.log("name unicity violation");
            this.setState({
              openSnack: true,
              snack: appcopy["ingredient"]["snack"]["conflict"]
            });
            break;
          case 400:
            //console.log("error");
            //console.log(res);
            this.setState({
              openSnack: true,
              snack: appcopy["generic"]["snack"]["errornetwork"]
            });
            break;
          default:
            //console.log("default");
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
  handleSnack(action) {
    if (process.env.REACT_APP_DEBUG === "TRUE") {
      console.log("Ingredient.handleSnack " + action);
    }
    switch (action) {
      case "close":
        this.setState((prevState, props) => ({
          openSnack: false
        }));
        break;
      default:
    }
  }
}
