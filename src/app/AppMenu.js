import * as React from "react";
import {
  Paper,
  Fab,
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  SwipeableDrawer
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";

export default class AppMenu extends React.Component {
  constructor(props) {
    if (process.env.REACT_APP_DEBUG === "TRUE") {
      console.log("AppMenu.constructor");
    }
    super(props);
    if (process.env.REACT_APP_DEBUG === "TRUE") {
      console.log("AppMenu language = " + this.props.language);
    }
    this.state = {
      open: false
    };
    // Handles
    this.handleClick = this.handleClick.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleToggleDrawer = this.handleToggleDrawer.bind(this);
  }
  render() {
    if (process.env.REACT_APP_DEBUG === "TRUE") {
      console.log("AppMenu.render");
    }
    //<Button onClick={(e) => this.handleClick(e)}>Dashboard</Button>
    return (
      <Box
        sx={{
          position: "absolute",
          top: 20,
          right: 20
        }}
      >
        <Fab color="tertiary" onClick={(e) => this.handleClick(e)}>
          <MoreVertIcon />
        </Fab>
        <SwipeableDrawer
          open={this.state.open}
          onClose={this.handleToggleDrawer}
          onOpen={this.handleToggleDrawer}
        >
          <Paper>
            <List>
              {this.props.menulist.map((menuitem) => (
                <ListItem key={menuitem.name} disablePadding>
                  <ListItemButton
                    onClick={() => {
                      this.handleClose();
                      menuitem.callback();
                    }}
                  >
                    <ListItemText primary={menuitem.name} />
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
          </Paper>
        </SwipeableDrawer>
      </Box>
    );
  }
  // Handles
  handleClick(event) {
    if (process.env.REACT_APP_DEBUG === "TRUE") {
      console.log("AppMenu.handleClick");
    }
    this.setState((prevState, props) => ({
      open: true
    }));
  }
  handleClose(event) {
    if (process.env.REACT_APP_DEBUG === "TRUE") {
      console.log("AppMenu.handleClose");
    }
    this.setState((prevState, props) => ({
      open: false
    }));
  }
  handleToggleDrawer() {
    if (process.env.REACT_APP_DEBUG === "TRUE") {
      console.log("AppMenu.handleToggleDrawer");
    }
    this.setState((prevState, props) => ({
      open: !prevState.open
    }));
  }
}
