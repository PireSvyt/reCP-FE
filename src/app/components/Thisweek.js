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
  Fab,
  TextField,
  Box,
  DialogContentText,
  Card,
  CardContent,
  CardActions
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import CloseIcon from "@mui/icons-material/Close";
//import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import TuneIcon from "@mui/icons-material/Tune";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import NoMealsIcon from "@mui/icons-material/NoMeals";
import AutoStoriesIcon from "@mui/icons-material/AutoStories";

import appcopy from "../copy";
import Snack from "./Snack";

export default class Thisweek extends React.Component {
  constructor(props) {
    if (process.env.REACT_APP_DEBUG === "TRUE") {
      console.log("Thisweek.constructor");
    }
    super(props);
    if (process.env.REACT_APP_DEBUG === "TRUE") {
      console.log("Thisweek language = " + this.props.language);
    }
    this.state = {
      recipiesHeight: 300
    };
    // Updates
    this.updateRecipiesHeight = this.updateRecipiesHeight.bind(this);
    // Handles
    this.handleSnack = this.handleSnack.bind(this);
    this.handleRemove = this.handleRemove.bind(this);
    this.handleReplace = this.handleReplace.bind(this);
    this.handleCook = this.handleCook.bind(this);
    this.handleScale = this.handleScale.bind(this);
  }
  render() {
    if (process.env.REACT_APP_DEBUG === "TRUE") {
      console.log("Thisweek.render");
    }
    return (
      <div>
        <AppBar sx={{ position: "relative" }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={() => this.props.callback("openMenu")}
            >
              <MoreVertIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              {appcopy["thisweek"]["title"][this.props.language]}
            </Typography>
            <IconButton
              edge="start"
              color="inherit"
              onClick={() => {
                if (process.env.REACT_APP_DEBUG === "TRUE") {
                  console.log("Thisweek.EmptyIcon.onClick");
                }
                this.props.callback("empty");
              }}
              sx={{ m: 1 }}
            >
              <DeleteIcon />
            </IconButton>
            {/*
            <IconButton
              edge="start"
              color="inherit"
              onClick={() => {
                if (process.env.REACT_APP_DEBUG === "TRUE") {
                  console.log("Thisweek.RestartAltIcon.onClick");
                }
                this.props.callback("renew");
              }}
              sx={{ m: 1 }}
            >
              <RestartAltIcon />
            </IconButton> */}
            <IconButton
              edge="start"
              color="inherit"
              onClick={() => {
                if (process.env.REACT_APP_DEBUG === "TRUE") {
                  console.log("Thisweek.AddIcon.onClick");
                }
                this.props.callback("add");
              }}
              sx={{ m: 1 }}
            >
              <AddIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
        <Box style={{ maxHeight: this.state.recipiesHeight, overflow: "auto" }}>
          <Box>
            <List dense={true}>
              {this.props.values.map((recipe) => (
                <ThisweekRecipe
                  key={"need-" + recipe._id}
                  recipe={recipe}
                  callback={this.props.callback}
                />
              ))}
            </List>
          </Box>
          <Snack
            snackOpen={this.state.snackOpen}
            snack={this.state.snack}
            callback={this.handleSnack}
            language={this.props.language}
          />
        </Box>
      </div>
    );
  }
  componentDidMount() {
    if (process.env.REACT_APP_DEBUG === "TRUE") {
      console.log("Thisweek.componentDidMount");
    }
    // Update
    this.updateRecipiesHeight();
  }

  // Updates
  updateRecipiesHeight() {
    if (process.env.REACT_APP_DEBUG === "TRUE") {
      console.log("Thisweek.updateRecipiesHeight");
    }
    this.setState({
      recipiesHeight: window.innerHeight - 115
    });
  }

  // Handles
  handleRemove(id) {
    if (process.env.REACT_APP_DEBUG === "TRUE") {
      console.log("Thisweek.handleRemove " + id);
    }
    this.props.callback("remove", { recipeid: id });
  }
  handleReplace(id) {
    if (process.env.REACT_APP_DEBUG === "TRUE") {
      console.log("Thisweek.handleReplace " + id);
    }
    this.props.callback("replace", { recipeid: id });
  }
  handleCook(id) {
    if (process.env.REACT_APP_DEBUG === "TRUE") {
      console.log("Thisweek.handleCook " + id);
    }
    this.props.callback("cook", { recipeid: id });
  }
  handleScale(id, command) {
    if (process.env.REACT_APP_DEBUG === "TRUE") {
      console.log("Thisweek.handleScale " + command + " " + id);
    }
    this.props.callback("scale", { recipeid: id, increment: command });
  }
  handleSnack(action) {
    if (process.env.REACT_APP_DEBUG === "TRUE") {
      console.log("Thisweek.handleSnack " + action);
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

class ThisweekRecipe extends React.Component {
  constructor(props) {
    super(props);
    if (process.env.REACT_APP_DEBUG === "TRUE") {
      console.log("ThisweekRecipe.constructor " + this.props.recipe._id);
    }
    // Handlers
    this.handleRemove = this.handleRemove.bind(this);
    this.handleReplace = this.handleReplace.bind(this);
    this.handleCook = this.handleCook.bind(this);
    this.handleScale = this.handleScale.bind(this);
  }
  render() {
    if (process.env.REACT_APP_DEBUG === "TRUE") {
      console.log("ThisweekRecipe.render " + this.props.recipe._id);
    }
    return (
      <ListItem key={"need-" & this.props.recipe._id}>
        <Card sx={{ width: "100%", pl: "1em", pr: "1em" }}>
          <Typography>{this.props.recipe.name}</Typography>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between"
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "flex-end"
              }}
            >
              <IconButton
                onClick={() => {
                  this.handleRemove();
                }}
              >
                <DeleteIcon />
              </IconButton>
              <IconButton
                onClick={() => {
                  this.handleReplace();
                }}
                disabled={true}
              >
                <RestartAltIcon />
              </IconButton>
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "flex-end",
                alignItems: "center"
              }}
            >
              <IconButton
                onClick={() => {
                  this.handleScale("down");
                }}
                disabled={this.props.recipe.scale === 1}
              >
                <RemoveIcon />
              </IconButton>
              <Typography sx={{ width: "2.5em", textAlign: "center" }}>
                {this.props.recipe.scale}
              </Typography>
              <IconButton
                onClick={() => {
                  this.handleScale("up");
                }}
              >
                <AddIcon />
              </IconButton>
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "flex-end",
                alignItems: "center"
              }}
            >
              <IconButton
                onClick={() => {
                  this.handleScale("down");
                }}
                disabled={true}
              >
                <AutoStoriesIcon />
              </IconButton>
              {/*<IconButton
              onClick={() => {
                this.handleCook();
              }}
            >
              <RestaurantIcon />
              {/*this.props.recipe.cooked && <RestaurantIcon />}
              {!this.props.recipe.cooked && <NoMealsIcon />
            </IconButton>*/}
            </Box>
          </Box>
        </Card>
      </ListItem>
    );
  }

  // Handles
  handleRemove() {
    if (process.env.REACT_APP_DEBUG === "TRUE") {
      console.log("ThisweekRecipe.handleRemove " + this.props.recipe._id);
    }
    this.props.callback("remove", { recipeid: this.props.recipe._id });
  }
  handleReplace() {
    if (process.env.REACT_APP_DEBUG === "TRUE") {
      console.log("ThisweekRecipe.handleReplace " + this.props.recipe._id);
    }
    this.props.callback("replace", { recipeid: this.props.recipe._id });
  }
  handleCook() {
    if (process.env.REACT_APP_DEBUG === "TRUE") {
      console.log("ThisweekRecipe.handleCook " + this.props.recipe._id);
    }
    this.props.callback("cook", { recipeid: this.props.recipe._id });
  }
  handleScale(command) {
    if (process.env.REACT_APP_DEBUG === "TRUE") {
      console.log("ThisweekRecipe.handleScale " + command);
    }
    switch (command) {
      case "down":
        if (this.props.recipe.scale > 1) {
          this.props.callback("scale", {
            recipeid: this.props.recipe._id,
            increment: command
          });
        }
        break;
      case "up":
        this.props.callback("scale", {
          recipeid: this.props.recipe._id,
          increment: command
        });
        break;
      default:
    }
  }
}
