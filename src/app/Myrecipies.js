import * as React from "react";
import ReactDOM from "react-dom";
import {
  Paper,
  List,
  ListItem,
  ListItemText,
  ListItemButton,
  Fab
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

import config from "../config";
import appcopy from "./copy";
import { getRecipies } from "./api/recipies";
import Recipe from "./Recipe";

export default class Myrecipies extends React.Component {
  constructor(props) {
    if (config.debug) {
      console.log("Myrecipies.constructor");
    }
    super(props);
    this.state = {
      recipiesHeight: 300,
      recipeID: "",
      recipeOpen: false,
      recipies: []
    };
    // Updates
    this.updateRecipiesHeight = this.updateRecipiesHeight.bind(this);
    this.updateRecipies = this.updateRecipies.bind(this);
    // Handles
    this.handleOpenRecipe = this.handleOpenRecipe.bind(this);
    this.handleCloseRecipe = this.handleCloseRecipe.bind(this);
    this.handleSaveRecipe = this.handleSaveRecipe.bind(this);
  }
  render() {
    return (
      <div>
        <h2>{appcopy["title.section_myrecipies"][config.app.language]}</h2>
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
              if (config.debug) {
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
                    if (config.debug) {
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
      </div>
    );
  }
  componentDidMount() {
    if (config.debug) {
      console.log("Myrecipies.componentDidMount");
    }
    // Update
    this.updateRecipiesHeight();
    this.updateRecipies();
  }

  // Updates
  updateRecipiesHeight() {
    if (config.debug) {
      console.log("Myrecipies.updateTabHeight");
    }
    this.setState({
      recipiesHeight: window.innerHeight - 180
    });
  }
  updateRecipies() {
    if (config.debug) {
      console.log("Myrecipies.updateSummary");
    }
    getRecipies().then((res) => {
      this.setState({
        recipies: res
      });
    });
  }

  // Handlers
  handleOpenRecipe(id) {
    if (config.debug) {
      console.log("Balance.handleOpenRecipe " + id);
    }
    this.setState({
      recipeID: id,
      recipeOpen: true
    });
  }
  handleCloseRecipe() {
    if (config.debug) {
      console.log("Balance.handleCloseRecipe");
    }
    this.setState({
      recipeID: "",
      recipeOpen: false
    });
  }
  handleSaveRecipe() {
    if (config.debug) {
      console.log("Balance.handleSaveRecipe");
    }
    this.updateRecipies();
  }
}
