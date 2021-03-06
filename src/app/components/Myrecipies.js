import * as React from "react";
import {
  Paper,
  List,
  ListItem,
  ListItemText,
  ListItemButton,
  Fab,
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Box,
  Card
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import EditIcon from "@mui/icons-material/Edit";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";

import appcopy from "../copy";
import Snack from "./Snack";

export default class Myrecipies extends React.Component {
  constructor(props) {
    if (process.env.REACT_APP_DEBUG === "TRUE") {
      console.log("Myrecipies.constructor");
    }
    super(props);
    if (process.env.REACT_APP_DEBUG === "TRUE") {
      console.log("Myrecipies language = " + this.props.language);
    }
    this.state = {
      recipiesHeight: 300,
      recipeID: "",
      recipeOpen: false,
      openSnack: false,
      snack: undefined
    };
    // Updates
    this.updateRecipiesHeight = this.updateRecipiesHeight.bind(this);
    // Handles
    this.handleSnack = this.handleSnack.bind(this);
  }
  render() {
    return (
      <Box>
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
              {appcopy["myrecipies"]["title"][this.props.language]}
            </Typography>
            <IconButton
              edge="start"
              color="inherit"
              onClick={() => {
                if (process.env.REACT_APP_DEBUG === "TRUE") {
                  console.log("Myrecipies.AddIcon.onClick");
                }
                this.props.callback("openRecipe", { recipeid: "" });
              }}
            >
              <AddIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
        <Box style={{ maxHeight: this.state.recipiesHeight, overflow: "auto" }}>
          <List dense={true}>
            {this.props.values.map((recipe) => (
              <ListItem key={"myrecipies-" + recipe._id}>
                <MyrecipiesRecipe
                  recipe={recipe}
                  callback={this.props.callback}
                />
              </ListItem>
            ))}
          </List>
          <Snack
            open={this.state.openSnack}
            snack={this.state.snack}
            callback={this.handleSnack}
            language={this.props.language}
          />
        </Box>
      </Box>
    );
  }
  componentDidMount() {
    if (process.env.REACT_APP_DEBUG === "TRUE") {
      console.log("Myrecipies.componentDidMount");
    }
    // Update
    this.updateRecipiesHeight();
  }

  // Updates
  updateRecipiesHeight() {
    if (process.env.REACT_APP_DEBUG === "TRUE") {
      console.log("Myrecipies.updateRecipiesHeight");
    }
    this.setState({
      recipiesHeight: window.innerHeight - 115
    });
  }

  // Handlers
  handleSnack(action) {
    if (process.env.REACT_APP_DEBUG === "TRUE") {
      console.log("Myrecipies.handleSnack " + action);
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

class MyrecipiesRecipe extends React.Component {
  constructor(props) {
    super(props);
    if (process.env.REACT_APP_DEBUG === "TRUE") {
      console.log("MyrecipiesRecipe.constructor " + this.props.recipe._id);
    }
    // Handlers
    this.handleSelect = this.handleSelect.bind(this);
    this.handleOpen = this.handleOpen.bind(this);
  }
  render() {
    if (process.env.REACT_APP_DEBUG === "TRUE") {
      console.log("MyrecipiesRecipe.render " + this.props.recipe._id);
    }
    return (
      <Card sx={{ width: "100%", pl: "1em", pr: "1em" }}>
        <Typography>{this.props.recipe.name}</Typography>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center"
          }}
        >
          <Typography>{this.props.recipe.portions} portions</Typography>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center"
            }}
          >
            <IconButton
              onClick={() => {
                this.handleOpen();
              }}
            >
              <EditIcon />
            </IconButton>
            <IconButton
              onClick={() => {
                this.handleSelect();
              }}
            >
              {this.props.recipe.selected && <CheckBoxIcon />}
              {!this.props.recipe.selected && <CheckBoxOutlineBlankIcon />}
            </IconButton>
          </Box>
        </Box>
      </Card>
    );
  }

  // Handles
  handleSelect() {
    if (process.env.REACT_APP_DEBUG === "TRUE") {
      console.log("MyrecipiesRecipe.handleSelect " + this.props.recipe._id);
    }
    this.props.callback("selectRecipe", { recipeid: this.props.recipe._id });
  }
  handleOpen() {
    if (process.env.REACT_APP_DEBUG === "TRUE") {
      console.log("MyrecipiesRecipe.handleOpen " + this.props.recipe._id);
    }
    this.props.callback("openRecipe", { recipeid: this.props.recipe._id });
  }
}
