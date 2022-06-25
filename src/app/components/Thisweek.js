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
    this.handleCloseSnack = this.handleCloseSnack.bind(this);
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
          <Toolbar onClick={this.props.reloadvalues}>
            <IconButton
              edge="start"
              color="inherit"
              onClick={this.props.openmenu}
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
                this.props.onempty();
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
                this.props.onrenew();
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
                this.props.onadd();
              }}
              sx={{ m: 1 }}
            >
              <AddIcon />
            </IconButton>
          </Toolbar>
        </AppBar>

        <Box style={{ maxHeight: this.state.recipiesHeight, overflow: "auto" }}>
          <List dense={true}>
            {this.props.values.map((recipe) => (
              <ThisweekRecipe
                key={recipe._id}
                recipe={recipe}
                onremove={this.handleRemove}
                onreplace={this.handleReplace}
                onscale={this.handleScale}
                oncook={this.handleCook}
              />
            ))}
          </List>
        </Box>

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
      console.log("Thisweek.componentDidMount");
    }
    // Update
    this.updateRecipiesHeight();
  }
  componentDidUpdate(prevState) {
    if (process.env.REACT_APP_DEBUG === "TRUE") {
      //console.log("Thisweek.componentDidUpdate");
    }
    if (prevState.open !== this.props.open && this.props.open) {
      // Update
    }
  }

  // Updates
  updateRecipiesHeight() {
    if (process.env.REACT_APP_DEBUG === "TRUE") {
      console.log("Thisweek.updateRecipiesHeight");
    }
    this.setState({
      recipiesHeight: window.innerHeight - 145
    });
  }

  // Handles
  handleRemove(id) {
    if (process.env.REACT_APP_DEBUG === "TRUE") {
      console.log("Thisweek.handleRemove " + id);
    }
    this.props.onremove(id);
  }
  handleReplace(id) {
    if (process.env.REACT_APP_DEBUG === "TRUE") {
      console.log("Thisweek.handleReplace " + id);
    }
    this.props.onreplace(id);
  }
  handleCook(id) {
    if (process.env.REACT_APP_DEBUG === "TRUE") {
      console.log("Thisweek.handleCook " + id);
    }
    this.props.oncook(id);
  }
  handleScale(id, command) {
    if (process.env.REACT_APP_DEBUG === "TRUE") {
      console.log("Thisweek.handleScale " + command + " " + id);
    }
    this.props.onscale(id, command);
  }
  handleCloseSnack() {
    if (process.env.REACT_APP_DEBUG === "TRUE") {
      console.log("Thisweek.handleCloseSnack");
    }
    this.setState((prevState, props) => ({
      snackOpen: false
    }));
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
      <ListItem key={this.props.recipe._id}>
        <Card sx={{ width: "100%", padding: "1em" }}>
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
    this.props.onremove(this.props.recipe._id);
  }
  handleReplace() {
    if (process.env.REACT_APP_DEBUG === "TRUE") {
      console.log("ThisweekRecipe.handleReplace " + this.props.recipe._id);
    }
    this.props.onreplace(this.props.recipe._id);
  }
  handleCook() {
    if (process.env.REACT_APP_DEBUG === "TRUE") {
      console.log("ThisweekRecipe.handleCook " + this.props.recipe._id);
    }
    this.props.oncook(this.props.recipe._id);
  }
  handleScale(command) {
    if (process.env.REACT_APP_DEBUG === "TRUE") {
      console.log("ThisweekRecipe.handleScale " + command);
    }
    switch (command) {
      case "down":
        if (this.props.recipe.scale > 1) {
          this.props.onscale(this.props.recipe._id, command);
        }
        break;
      case "up":
        this.props.onscale(this.props.recipe._id, command);
        break;
      default:
    }
  }
}
