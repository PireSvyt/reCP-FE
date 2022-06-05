import * as React from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  List,
  ListItem,
  ListItemText,
  ListItemButton
} from "@mui/material";

import appcopy from "../copy";
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
          <List dense={true}>
            {this.props.values.map((ingredient) => (
              <ListItem key={`${ingredient._id}`} id={`${ingredient._id}`}>
                <ListItemButton
                  onClick={() => {
                    if (process.env.REACT_APP_DEBUG === "TRUE") {
                      console.log(
                        "Ingredients.ingredients.onClick " + ingredient._id
                      );
                    }
                    this.props.openingredient(ingredient._id);
                  }}
                >
                  <ListItemText
                    primary={`${ingredient.name}`}
                    secondary={`${ingredient.unit}, ${ingredient.category}`}
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
  }
  componentDidUpdate(prevState) {
    if (process.env.REACT_APP_DEBUG === "TRUE") {
      //console.log("Ingredients.componentDidUpdate");
    }
    if (prevState.open !== this.props.open && this.props.open) {
      // Update
    }
  }

  // Handles
  handleClose() {
    if (process.env.REACT_APP_DEBUG === "TRUE") {
      console.log("Ingredients.handleClose");
    }
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
