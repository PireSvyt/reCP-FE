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

import appcopy from "./copy";
import Snack from "./Snack";

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
      open: false
    };
    // Handles
    this.handleClose = this.handleClose.bind(this);
    this.handleCloseSnack = this.handleCloseSnack.bind(this);
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
  componentDidUpdate(prevState) {
    if (process.env.REACT_APP_DEBUG === "TRUE") {
    }
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
  handleCloseSnack() {
    if (process.env.REACT_APP_DEBUG === "TRUE") {
      console.log("Ingredients.handleCloseSnack");
    }
    this.setState((prevState, props) => ({
      snackOpen: false
    }));
  }
}
