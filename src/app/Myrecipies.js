import * as React from "react";
import {
  Paper,
  List,
  ListItem,
  ListItemText,
  ListItemButton,
  Fab
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

import appcopy from "./copy";
import { getRecipies } from "./api/recipies";
import Recipe from "./Recipe";
import Snack from "./Snack";

export default class Myrecipies extends React.Component {
  constructor(props) {
    if (process.env.REACT_APP_DEBUG === "TRUE") {
      console.log("Myrecipies.constructor");
    }
    super(props);
    this.state = {
      recipiesHeight: 300,
      recipeID: "",
      recipeOpen: false,
      recipies: [],
      snack: undefined
    };
    // Updates
    this.updateRecipiesHeight = this.updateRecipiesHeight.bind(this);
    this.updateRecipies = this.updateRecipies.bind(this);
    // Handles
    this.handleOpenRecipe = this.handleOpenRecipe.bind(this);
    this.handleCloseRecipe = this.handleCloseRecipe.bind(this);
    this.handleSaveRecipe = this.handleSaveRecipe.bind(this);
    this.handleCloseSnack = this.handleCloseSnack.bind(this);
  }
  render() {
    return (
      <div>
        <h2>
          {appcopy["myrecipies"]["title"][process.env.REACT_APP_LANGUAGE]}
        </h2>
        <Fab
          color="primary"
          sx={{
            position: "absolute",
            top: 20,
            right: 20
          }}
        >
          <AddIcon
            onClick={() => {
              if (process.env.REACT_APP_DEBUG === "TRUE") {
                console.log("Myrecipies.AddIcon.onClick");
              }
              this.handleOpenRecipe("");
            }}
          />
        </Fab>
        <Paper
          elevation={3}
          style={{ maxHeight: this.state.recipiesHeight, overflow: "auto" }}
        >
          <List dense={true}>
            {this.state.recipies.map((value) => (
              <ListItem key={`${value._id}`} id={`${value._id}`}>
                <ListItemButton
                  onClick={() => {
                    if (process.env.REACT_APP_DEBUG === "TRUE") {
                      console.log("Myrecipies.recipies.onClick " + value._id);
                    }
                    this.handleOpenRecipe(value._id);
                  }}
                >
                  <ListItemText
                    primary={`${value.name}`}
                    secondary={`${value.portions} portions`}
                  />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Paper>
        <Recipe
          recipeID={this.state.recipeID}
          recipeOpen={this.state.recipeOpen}
          onsave={() => {} /*this.handleSaveRecipe*/}
          onclose={this.handleCloseRecipe}
        />

        <Snack
          snackOpen={this.state.snackOpen}
          snack={this.state.snack}
          onclose={this.handleCloseSnack}
        />
      </div>
    );
  }
  componentDidMount() {
    if (process.env.REACT_APP_DEBUG === "TRUE") {
      console.log("Myrecipies.componentDidMount");
    }
    // Update
    this.updateRecipiesHeight();
    this.updateRecipies();
  }

  // Updates
  updateRecipiesHeight() {
    if (process.env.REACT_APP_DEBUG === "TRUE") {
      console.log("Myrecipies.updateTabHeight");
    }
    this.setState({
      recipiesHeight: window.innerHeight - 180
    });
  }
  updateRecipies() {
    if (process.env.REACT_APP_DEBUG === "TRUE") {
      console.log("Myrecipies.updateSummary");
    }
    getRecipies().then((res) => {
      if (res !== undefined) {
        this.setState({
          recipies: res
        });
      } else {
        // Snack
        this.setState((prevState, props) => ({
          snack: appcopy["generic"]["snack"]["errornetwork"]
        }));
      }
    });
  }

  // Handlers
  handleOpenRecipe(id) {
    if (process.env.REACT_APP_DEBUG === "TRUE") {
      console.log("Balance.handleOpenRecipe " + id);
    }
    this.setState({
      recipeID: id,
      recipeOpen: true
    });
  }
  handleCloseRecipe() {
    if (process.env.REACT_APP_DEBUG === "TRUE") {
      console.log("Balance.handleCloseRecipe");
    }
    this.setState({
      recipeID: "",
      recipeOpen: false
    });
  }
  handleSaveRecipe() {
    if (process.env.REACT_APP_DEBUG === "TRUE") {
      console.log("Balance.handleSaveRecipe");
    }
    this.updateRecipies();
  }
  handleCloseSnack() {
    if (process.env.REACT_APP_DEBUG === "TRUE") {
      console.log("Recipe.handleCloseSnack");
    }
    this.setState((prevState, props) => ({
      snackOpen: false
    }));
  }
}
