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
  ListItemButton,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Fab
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import CloseIcon from "@mui/icons-material/Close";
//import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import AddIcon from "@mui/icons-material/Add";

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
      open: false,
      openSnack: false
    };
    // Handles
    this.handleClose = this.handleClose.bind(this);
    this.handleSnack = this.handleSnack.bind(this);
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
                {appcopy["ingredients"]["title"][this.props.language]}
              </Typography>
              <IconButton
                edge="start"
                color="inherit"
                onClick={() => {
                  if (process.env.REACT_APP_DEBUG === "TRUE") {
                    console.log("Ingredients.AddIcon.onClick");
                  }
                  this.props.callback("openItem", { ingredientid: "" });
                }}
                sx={{ m: 1 }}
              >
                <AddIcon />
              </IconButton>
            </Toolbar>
          </AppBar>
          <DialogContent>
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
                      this.props.callback("openItem", {
                        ingredientid: ingredient._id
                      });
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
          </DialogContent>
        </Dialog>

        <Snack
          language={this.props.language}
          open={this.state.snackOpen}
          snack={this.state.snack}
          callback={this.handleSnack}
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
    this.props.callback("closeList");
  }
  handleSnack(action) {
    if (process.env.REACT_APP_DEBUG === "TRUE") {
      console.log("Ingredients.handleSnack " + action);
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
