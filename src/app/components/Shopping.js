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

export default class Shopping extends React.Component {
  constructor(props) {
    if (process.env.REACT_APP_DEBUG === "TRUE") {
      console.log("Shopping.constructor");
    }
    super(props);
    if (process.env.REACT_APP_DEBUG === "TRUE") {
      console.log("Shopping language = " + this.props.language);
    }
    this.state = {
      recipiesHeight: 300
    };
    // Updates
    this.updateShoppingHeight = this.updateShoppingHeight.bind(this);
    // Handles
    this.handleSnack = this.handleSnack.bind(this);
    this.handleEmpty = this.handleEmpty.bind(this);
    this.handleTake = this.handleTake.bind(this);
    this.handleAddtofridge = this.handleAddtofridge.bind(this);
  }
  render() {
    if (process.env.REACT_APP_DEBUG === "TRUE") {
      console.log("Shopping.render");
    }
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
              {appcopy["shopping"]["title"][this.props.language]}
            </Typography>
            <IconButton
              edge="start"
              color="inherit"
              onClick={() => {
                if (process.env.REACT_APP_DEBUG === "TRUE") {
                  console.log("Shopping.EmptyIcon.onClick");
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
          <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
            {appcopy["shopping"]["subsection"]["ihavent"][this.props.language]}
          </Typography>
          <Box>
            <List dense={true}>
              {this.props.values.map((ingredient) => {
                if (
                  ingredient.quantity - (ingredient.available || 0) >
                  (ingredient.shopped || 0)
                ) {
                  return (
                    <ListItem key={"totake-" + ingredient._id}>
                      <ShoppingIngredient
                        ingredient={ingredient}
                        callback={this.props.callback}
                      />
                    </ListItem>
                  );
                } else {
                  return <div key={"totake-" + ingredient._id} />;
                }
              })}
            </List>
          </Box>
          <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
            {appcopy["shopping"]["subsection"]["ihave"][this.props.language]}
          </Typography>
          <Box>
            <List dense={true}>
              {this.props.values.map((ingredient) => {
                if (
                  ingredient.quantity - (ingredient.available || 0) <=
                    (ingredient.shopped || 0) &&
                  ingredient.quantity > (ingredient.available || 0)
                ) {
                  return (
                    <ListItem key={"taken-" + ingredient._id}>
                      <ShoppingIngredient
                        ingredient={ingredient}
                        callback={this.props.callback}
                      />
                    </ListItem>
                  );
                } else {
                  return <div key={"taken-" + ingredient._id} />;
                }
              })}
            </List>
          </Box>
          <Button onClick={() => this.handleAddtofridge()}>
            {appcopy["shopping"]["button"]["addtofridge"][this.props.language]}
          </Button>

          <Snack
            snackOpen={this.state.snackOpen}
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
      console.log("Shopping.componentDidMount");
    }
    // Update
    this.updateShoppingHeight();
  }

  // Updates
  updateShoppingHeight() {
    if (process.env.REACT_APP_DEBUG === "TRUE") {
      console.log("Shopping.updateShoppingHeight");
    }
    this.setState({
      recipiesHeight: window.innerHeight - 115
    });
  }

  // Handles
  handleEmpty() {
    if (process.env.REACT_APP_DEBUG === "TRUE") {
      console.log("Shopping.handleEmpty ");
    }
    this.props.callback("empty");
  }
  handleTake(id) {
    if (process.env.REACT_APP_DEBUG === "TRUE") {
      console.log("Shopping.handleTake " + id);
    }
    this.props.callback("take", { ingredientid: id });
  }
  handleAddtofridge() {
    if (process.env.REACT_APP_DEBUG === "TRUE") {
      console.log("Shopping.handleAddtofridge ");
    }
    this.props.callback("addtofridge");
  }
  handleSnack(action) {
    if (process.env.REACT_APP_DEBUG === "TRUE") {
      console.log("Shopping.handleSnack " + action);
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

class ShoppingIngredient extends React.Component {
  constructor(props) {
    super(props);
    if (process.env.REACT_APP_DEBUG === "TRUE") {
      console.log(
        "ShoppingIngredient.constructor " + this.props.ingredient._id
      );
    }
    // Handlers
    this.handleTake = this.handleTake.bind(this);
  }
  render() {
    if (process.env.REACT_APP_DEBUG === "TRUE") {
      console.log("ShoppingIngredient.render " + this.props.ingredient._id);
    }
    return (
      <Card sx={{ width: "100%", pl: "1em", pr: "1em" }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center"
          }}
        >
          <Typography>{this.props.ingredient.name}</Typography>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center"
            }}
          >
            <Typography sx={{ textAlign: "right", pr: "1em" }}>
              {Math.round(
                (this.props.ingredient.quantity -
                  (this.props.ingredient.available || 0)) *
                  10
              ) /
                10 +
                " " +
                this.props.ingredient.unit}
            </Typography>
            <IconButton
              onClick={() => {
                this.handleTake();
              }}
            >
              {this.props.ingredient.quantity -
                (this.props.ingredient.available || 0) <=
                (this.props.ingredient.shopped || 0) && <CheckBoxIcon />}
              {this.props.ingredient.quantity -
                (this.props.ingredient.available || 0) >
                (this.props.ingredient.shopped || 0) && (
                <CheckBoxOutlineBlankIcon />
              )}
            </IconButton>
          </Box>
        </Box>
      </Card>
    );
  }

  // Handles
  handleTake() {
    if (process.env.REACT_APP_DEBUG === "TRUE") {
      console.log("ShoppingIngredient.handleTake " + this.props.ingredient._id);
    }
    this.props.callback("take", { ingredientid: this.props.ingredient._id });
  }
}
