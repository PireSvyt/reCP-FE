import * as React from "react";
import {
  Button,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  TextField,
  Box,
  Card,
  Autocomplete
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";

import appcopy from "../copy";
import Snack from "./Snack";
import UIShelf from "./uicomponents/uishelf";

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
      recipiesHeight: 300,
      listView: "block",
      addingIngredient: "none",
      treeCategories: {}
    };
    // Updates
    this.updateShoppingHeight = this.updateShoppingHeight.bind(this);
    // Handles
    this.handleSnack = this.handleSnack.bind(this);
    this.handleEmpty = this.handleEmpty.bind(this);
    this.handleTake = this.handleTake.bind(this);
    this.handleAddtofridge = this.handleAddtofridge.bind(this);
    this.handleEnableAdd = this.handleEnableAdd.bind(this);
    this.handleListView = this.handleListView.bind(this);
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
                  console.log("Shopping.ListIcon.onClick");
                }
                this.handleListView();
              }}
              sx={{ mr: "0.25em", display: "none" }}
            >
              <FormatListBulletedIcon />
            </IconButton>
            <IconButton
              edge="start"
              color="inherit"
              onClick={() => {
                if (process.env.REACT_APP_DEBUG === "TRUE") {
                  console.log("Shopping.EmptyIcon.onClick");
                }
                this.handleEmpty();
              }}
            >
              <DeleteIcon />
            </IconButton>
          </Toolbar>
        </AppBar>

        <Box style={{ maxHeight: this.state.recipiesHeight, overflow: "auto" }}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between"
            }}
          >
            <Typography sx={{ ml: 2 }} variant="h6" component="div">
              {
                appcopy["shopping"]["subsection"]["ihavent"][
                  this.props.language
                ]
              }
            </Typography>
            <IconButton
              edge="start"
              color="inherit"
              sx={{ mr: 2, display: "none" }}
              onClick={() => {
                if (process.env.REACT_APP_DEBUG === "TRUE") {
                  console.log("Shopping.AddIcon.onClick");
                }
                this.handleEnableAdd();
              }}
            >
              <AddIcon />
            </IconButton>
          </Box>
          <Box>
            {this.props.shelfs.map((shelf) => {
              //console.log(this.props.tertiaryingredients);
              //console.log("SHELF : " + shelf.name);
              // filter
              function filter(ingredient) {
                //console.log(ingredient);
                let status =
                  ingredient.quantity - (ingredient.available || 0) >
                    (ingredient.shopped || 0) &&
                  ingredient.quantity > (ingredient.available || 0);
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
                  packaging="shopping"
                />
              );
            })}
          </Box>
          <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
            {appcopy["shopping"]["subsection"]["ihave"][this.props.language]}
          </Typography>
          <Box>
            {this.props.shelfs.map((shelf) => {
              //console.log(this.props.shelfs);
              //console.log("SHELF : " + shelf.name);
              // filter
              function filter(ingredient) {
                //console.log(ingredient);
                let status =
                  ingredient.quantity - (ingredient.available || 0) <=
                    (ingredient.shopped || 0) &&
                  ingredient.quantity > (ingredient.available || 0);
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
                  packaging="shopping"
                />
              );
            })}
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

  componentDidUpdate(prevState) {
    if (process.env.REACT_APP_DEBUG === "TRUE") {
      console.log("Shopping.componentDidUpdate");
      //console.log("Shopping.state");
      //console.log(this.state);
    }
    if (prevState.ingredients !== this.props.ingredients) {
      //
    }
  }

  // Updates
  updateShoppingHeight() {
    if (process.env.REACT_APP_DEBUG === "TRUE") {
      console.log("Shopping.updateShoppingHeight");
    }
    this.setState({
      recipiesHeight: window.innerHeight - 130
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
  handleListView() {
    if (process.env.REACT_APP_DEBUG === "TRUE") {
      console.log("Shopping.handleListView");
    }
    switch (this.state.listView) {
      case "none":
        this.setState((prevState, props) => ({
          listView: "block"
        }));
        break;
      case "block":
        this.setState((prevState, props) => ({
          listView: "none"
        }));
        break;
      default:
        console.log("Shopping.handleListView unmatched " + this.state.listView);
        this.setState((prevState, props) => ({
          listView: "none"
        }));
    }
  }
  handleEnableAdd() {
    if (process.env.REACT_APP_DEBUG === "TRUE") {
      console.log("Shopping.handleEnableAdd");
    }
    switch (this.state.addingIngredient) {
      case "none":
        this.setState((prevState, props) => ({
          addingIngredient: "block"
        }));
        break;
      case "block":
        this.setState((prevState, props) => ({
          addingIngredient: "none"
        }));
        break;
      default:
        console.log(
          "Shopping.handleEnableAdd unmatched " + this.state.addingIngredient
        );
        this.setState((prevState, props) => ({
          addingIngredient: "none"
        }));
    }
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
