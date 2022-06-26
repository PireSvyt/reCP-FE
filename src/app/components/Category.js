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
import { apiSetCategorySave } from "../api/sets";
import Snack from "./Snack";

export default class Category extends React.Component {
  constructor(props) {
    if (process.env.REACT_APP_DEBUG === "TRUE") {
      console.log("Category.constructor");
    }
    super(props);
    if (process.env.REACT_APP_DEBUG === "TRUE") {
      console.log("Category language = " + this.props.language);
    }
    this.state = {
      category: "",
      openSnack: false,
      snack: undefined
    };
    // Handles
    this.handleClose = this.handleClose.bind(this);
    this.handleSave = this.handleSave.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSnack = this.handleSnack.bind(this);
  }
  render() {
    if (process.env.REACT_APP_DEBUG === "TRUE") {
      console.log("Category.render");
      //console.log("Category.state.category");
      //console.log(this.state.category);
    }
    return (
      <div>
        <Dialog
          id="dialog_category"
          open={this.props.open}
          onClose={this.handleClose}
          fullWidth={true}
        >
          <DialogTitle>
            {appcopy["category"]["title"][this.props.language]}
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
                value={this.state.category || ""}
                onChange={this.handleChange}
                autoComplete="off"
              />
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

  // Handles
  handleClose() {
    if (process.env.REACT_APP_DEBUG === "TRUE") {
      console.log("Category.handleClose");
    }
    this.setState((prevState, props) => ({
      openSnack: true,
      snack: appcopy["category"]["snack"]["discarded"],
      category: ""
    }));
    this.props.onclose();
  }
  handleChange(event, newValue) {
    if (process.env.REACT_APP_DEBUG === "TRUE") {
      console.log("Category.handleChange");
    }
    const target = event.target;
    if (process.env.REACT_APP_DEBUG === "TRUE") {
      //console.log("target");
      //console.log(target);
      console.log("target.name : " + target.name);
      console.log("target.value : " + target.value);
      console.log("newValue : " + newValue);
    }
    // Update
    if (process.env.REACT_APP_DEBUG === "TRUE") {
      console.log("Category.state.category");
      console.log(this.state.category);
    }
    this.setState((prevState, props) => ({
      category: target.value
    }));
  }
  handleSave() {
    if (process.env.REACT_APP_DEBUG === "TRUE") {
      console.log("Category.handleSave");
      console.log("this.state.category");
      console.log(this.state.category);
    }
    // Check inputs
    let save = true;
    let errors = [];
    if (this.state.category === "" || this.state.category === undefined) {
      save = false;
      errors.push(" Nom vide");
    }
    // Save or not?
    if (errors !== [] && process.env.REACT_APP_DEBUG === "TRUE") {
      console.log(errors);
    }
    // Post or publish
    if (save === true) {
      if (process.env.REACT_APP_DEBUG === "TRUE") {
        console.log(this.state.category);
        console.log("POST");
      }
      apiSetCategorySave({
        _id: "",
        name: this.state.category
      }).then((res) => {
        switch (res.status) {
          case 200:
            this.setState((prevState, props) => ({
              category: "",
              openSnack: true,
              snack: appcopy["category"]["snack"]["edited"]
            }));
            this.props.onclose();
            this.props.onedit();
            break;
          case 201:
            this.setState({
              category: "",
              openSnack: true,
              snack: appcopy["category"]["snack"]["saved"]
            });
            this.props.onclose();
            this.props.onedit();
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
  handleSnack(action) {
    if (process.env.REACT_APP_DEBUG === "TRUE") {
      console.log("Category.handleSnack " + action);
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
