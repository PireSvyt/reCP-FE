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

export default class Shelfs extends React.Component {
  constructor(props) {
    if (process.env.REACT_APP_DEBUG === "TRUE") {
      console.log("Shelfs.constructor");
    }
    super(props);
    if (process.env.REACT_APP_DEBUG === "TRUE") {
      console.log("Shelfs language = " + this.props.language);
    }
    this.state = {
      openSnack: false
    };
    // Handles
    this.handleClose = this.handleClose.bind(this);
    this.handleSnack = this.handleSnack.bind(this);
  }
  render() {
    if (process.env.REACT_APP_DEBUG === "TRUE") {
      console.log("Shelfs.render");
    }
    return (
      <div>
        <Dialog
          id="dialog_shelfs"
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
                {appcopy["shelfs"]["title"][this.props.language]}
              </Typography>
              <IconButton
                edge="start"
                color="inherit"
                onClick={() => {
                  if (process.env.REACT_APP_DEBUG === "TRUE") {
                    console.log("Shelfs.AddIcon.onClick");
                  }
                  this.props.callback("openItem", { shelfid: "" });
                }}
                sx={{ m: 1 }}
              >
                <AddIcon />
              </IconButton>
            </Toolbar>
          </AppBar>
          <DialogContent>
            <List dense={true}>
              {this.props.values.map((shelf) => (
                <ListItem key={`${shelf._id}`} id={`${shelf._id}`}>
                  <ListItemButton
                    onClick={() => {
                      if (process.env.REACT_APP_DEBUG === "TRUE") {
                        console.log("Shelfs.shelfs.onClick " + shelf._id);
                      }
                      this.props.callback("openItem", {
                        shelfid: shelf._id
                      });
                    }}
                  >
                    <ListItemText primary={`${shelf.name}`} />
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
      console.log("Shelfs.componentDidMount");
    }
  }
  componentDidUpdate(prevState) {
    if (process.env.REACT_APP_DEBUG === "TRUE") {
      //console.log("Shelfs.componentDidUpdate");
    }
    if (prevState.open !== this.props.open && this.props.open) {
      // Update
    }
  }

  // Handles
  handleClose() {
    if (process.env.REACT_APP_DEBUG === "TRUE") {
      console.log("Shelfs.handleClose");
    }
    this.props.callback("closeList");
  }
  handleSnack(action) {
    if (process.env.REACT_APP_DEBUG === "TRUE") {
      console.log("Shelfs.handleSnack " + action);
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
