import * as React from "react";
import {
  Dialog,
  DialogContent,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Box
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import AddIcon from "@mui/icons-material/Add";

import appcopy from "../copy";
import Snack from "./Snack";
import UIShelf from "./uicomponents/uishelf";

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
    // Utils
    this.getShelfName = this.getShelfName.bind(this);
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
            <Box>
              <UIShelf
                shelf={"???"}
                ingredients={this.props.ingredients.filter((ingredient) => {
                  //console.log(" ingredient.shelf : " + ingredient.shelf);
                  return (
                    ingredient.shelf === undefined || ingredient.shelf === ""
                  );
                })}
                shelfs={this.props.shelfs}
                callback={this.props.callback}
                packaging="ingredients"
              />
              {this.props.shelfs.map((shelf) => {
                //console.log(this.props.tertiaryingredients);
                //console.log("SHELF : " + shelf.name);
                // filter
                function filter(ingredient) {
                  //console.log(ingredient);
                  let status = true;
                  //console.log(status);
                  return status;
                }
                //console.log("this.props.ingredients : ");
                //console.log(this.props.ingredients);
                let sublist = this.props.ingredients.filter((ingredient) => {
                  return filter(ingredient) && ingredient.shelf === shelf._id;
                });
                //console.log("sublist : ");
                //console.log(sublist);
                return (
                  <UIShelf
                    shelf={shelf.name}
                    ingredients={sublist}
                    shelfs={this.props.shelfs}
                    callback={this.props.callback}
                    packaging="ingredients"
                  />
                );
              })}
            </Box>
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

  // Utils
  getShelfName(id) {
    if (process.env.REACT_APP_DEBUG === "TRUE") {
      console.log("Ingredient.getShelfName : " + id);
    }
    let selectedshelf = "";
    this.props.shelfs.forEach((shelf) => {
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
