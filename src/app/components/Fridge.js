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
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";

import appcopy from "../copy";
import Snack from "./Snack";

export default class Fridge extends React.Component {
  constructor(props) {
    if (process.env.REACT_APP_DEBUG === "TRUE") {
      console.log("Fridge.constructor");
    }
    super(props);
    if (process.env.REACT_APP_DEBUG === "TRUE") {
      console.log("Fridge language = " + this.props.language);
    }
    this.state = {
      recipiesHeight: 300
    };
    // Updates
    this.updateFridgeHeight = this.updateFridgeHeight.bind(this);
    // Handles
    this.handleCloseSnack = this.handleCloseSnack.bind(this);
    this.handleEmpty = this.handleEmpty.bind(this);
    this.handleHave = this.handleHave.bind(this);
    this.handleHavent = this.handleHavent.bind(this);
    this.handleIncrement = this.handleIncrement.bind(this);
  }
  render() {
    if (process.env.REACT_APP_DEBUG === "TRUE") {
      console.log("Fridge.render");
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
              {appcopy["fridge"]["title"][this.props.language]}
            </Typography>
            <IconButton
              edge="start"
              color="inherit"
              onClick={() => {
                if (process.env.REACT_APP_DEBUG === "TRUE") {
                  console.log("Fridge.EmptyIcon.onClick");
                }
                this.handleEmpty();
              }}
              sx={{ m: 1 }}
            >
              <DeleteIcon />
            </IconButton>
          </Toolbar>
        </AppBar>

        <Box style={{ maxHeight: this.state.recipiesHeight, overflow: "auto" }}>
          <List dense={true}>
            {this.props.values.map((ingredient) => (
              <FridgeIngredient
                key={ingredient._id}
                ingredient={ingredient}
                onhave={this.handleHave}
                onhavent={this.handleHavent}
                onincrement={this.handleIncrement}
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
      console.log("Fridge.componentDidMount");
    }
    // Update
    this.updateFridgeHeight();
  }
  componentDidUpdate(prevState) {
    if (process.env.REACT_APP_DEBUG === "TRUE") {
      //console.log("Fridge.componentDidUpdate");
    }
    if (prevState.open !== this.props.open && this.props.open) {
      // Update
    }
  }

  // Updates
  updateFridgeHeight() {
    if (process.env.REACT_APP_DEBUG === "TRUE") {
      console.log("Fridge.updateFridgeHeight");
    }
    this.setState({
      recipiesHeight: window.innerHeight - 145
    });
  }

  // Handles
  handleEmpty(id) {
    if (process.env.REACT_APP_DEBUG === "TRUE") {
      console.log("Fridge.handleEmpty " + id);
    }
    this.props.onreset();
  }
  handleHave(id) {
    if (process.env.REACT_APP_DEBUG === "TRUE") {
      console.log("Fridge.handleHave " + id);
    }
    this.props.onhave(id);
  }
  handleHavent(id) {
    if (process.env.REACT_APP_DEBUG === "TRUE") {
      console.log("Fridge.handleHavent " + id);
    }
    this.props.onhavent(id);
  }
  handleIncrement(id) {
    if (process.env.REACT_APP_DEBUG === "TRUE") {
      console.log("Fridge.handleIncrement " + id);
    }
    console.log("Fridge.handleIncrement TODO " + id);
    //this.props.onincrement(id);
  }
  handleCloseSnack() {
    if (process.env.REACT_APP_DEBUG === "TRUE") {
      console.log("Fridge.handleCloseSnack");
    }
    this.setState((prevState, props) => ({
      snackOpen: false
    }));
  }
}

class FridgeIngredient extends React.Component {
  constructor(props) {
    super(props);
    if (process.env.REACT_APP_DEBUG === "TRUE") {
      console.log("FridgeIngredient.constructor " + this.props.ingredient._id);
    }
    // Handlers
    this.handleHave = this.handleHave.bind(this);
    this.handleHavent = this.handleHavent.bind(this);
    this.handleIncrement = this.handleIncrement.bind(this);
  }
  render() {
    if (process.env.REACT_APP_DEBUG === "TRUE") {
      console.log("FridgeIngredient.render " + this.props.ingredient._id);
    }
    console.log("FridgeIngredient.render " + this.props.ingredient._id);
    console.log(this.props.ingredient);
    return (
      <ListItem key={this.props.ingredient._id}>
        <Card sx={{ width: "100%", padding: "1em" }}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center"
            }}
          >
            <Typography>{this.props.ingredient.name}</Typography>
            <IconButton
              onClick={() => {
                this.handleHave();
              }}
            >
              {this.props.ingredient.quantity <=
                this.props.ingredient.available && <CheckBoxIcon />}
              {(this.props.ingredient.quantity >
                this.props.ingredient.available ||
                this.props.ingredient.available === undefined) && (
                <CheckBoxOutlineBlankIcon />
              )}
            </IconButton>
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            <IconButton
              onClick={() => {
                this.handleIncrement("down");
              }}
              disabled={true}
            >
              <RemoveIcon />
            </IconButton>
            <Typography
              sx={{ width: "8em", textAlign: "center", fontWeight: "bold" }}
            >
              {(this.props.ingredient.available || 0) +
                " / " +
                this.props.ingredient.quantity +
                " " +
                this.props.ingredient.unit}
            </Typography>
            <IconButton
              onClick={() => {
                this.handleIncrement("up");
              }}
              disabled={true}
            >
              <AddIcon />
            </IconButton>
          </Box>
        </Card>
      </ListItem>
    );
  }

  // Handles
  handleHave() {
    if (process.env.REACT_APP_DEBUG === "TRUE") {
      console.log("FridgeIngredient.handleHave " + this.props.ingredient._id);
    }
    this.props.onhave(this.props.ingredient._id);
  }
  handleHavent() {
    if (process.env.REACT_APP_DEBUG === "TRUE") {
      console.log("FridgeIngredient.handleHavent " + this.props.ingredient._id);
    }
    this.props.onhavent(this.props.ingredient._id);
  }
  handleIncrement(newValue) {
    if (process.env.REACT_APP_DEBUG === "TRUE") {
      console.log(
        "FridgeIngredient.handleIncrement " +
          newValue +
          " " +
          this.props.ingredient._id
      );
    }
    this.props.onincrement(this.props.ingredient._id, newValue);
  }
}
