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

export default class Categories extends React.Component {
  constructor(props) {
    if (process.env.REACT_APP_DEBUG === "TRUE") {
      console.log("Categories.constructor");
    }
    super(props);
    if (process.env.REACT_APP_DEBUG === "TRUE") {
      console.log("Categories language = " + this.props.language);
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
      console.log("Categories.render");
    }
    return (
      <div>
        <Dialog
          id="dialog_categories"
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
                {appcopy["categories"]["title"][this.props.language]}
              </Typography>
              <IconButton
                edge="start"
                color="inherit"
                onClick={() => {
                  if (process.env.REACT_APP_DEBUG === "TRUE") {
                    console.log("Categories.AddIcon.onClick");
                  }
                  this.props.callback("openItem", { categoryid: "" });
                }}
                sx={{ m: 1 }}
              >
                <AddIcon />
              </IconButton>
            </Toolbar>
          </AppBar>
          <DialogContent>
            <List dense={true}>
              {this.props.values.map((category) => (
                <ListItem key={`${category._id}`} id={`${category._id}`}>
                  <ListItemButton
                    onClick={() => {
                      if (process.env.REACT_APP_DEBUG === "TRUE") {
                        console.log(
                          "Categories.categories.onClick " + category._id
                        );
                      }
                      this.props.callback("openItem", {
                        categoryid: category._id
                      });
                    }}
                  >
                    <ListItemText primary={`${category.name}`} />
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
      console.log("Categories.componentDidMount");
    }
  }
  componentDidUpdate(prevState) {
    if (process.env.REACT_APP_DEBUG === "TRUE") {
      //console.log("Categories.componentDidUpdate");
    }
    if (prevState.open !== this.props.open && this.props.open) {
      // Update
    }
  }

  // Handles
  handleClose() {
    if (process.env.REACT_APP_DEBUG === "TRUE") {
      console.log("Categories.handleClose");
    }
    this.props.callback("closeList");
  }
  handleSnack(action) {
    if (process.env.REACT_APP_DEBUG === "TRUE") {
      console.log("Categories.handleSnack " + action);
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
