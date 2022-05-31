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
import Recipe from "./Recipe";
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
      snack: undefined
    };
    // Updates
    this.updateRecipiesHeight = this.updateRecipiesHeight.bind(this);
    // Handles
    this.handleOpenRecipe = this.handleOpenRecipe.bind(this);
    this.handleCloseRecipe = this.handleCloseRecipe.bind(this);
    this.handleSaveRecipe = this.handleSaveRecipe.bind(this);
    this.handleCloseSnack = this.handleCloseSnack.bind(this);
  }
  render() {
    return (
      <div>
        <h2>{appcopy["myrecipies"]["title"][this.props.language]}</h2>
        <Fab
          color="primary"
          sx={{
            position: "absolute",
            bottom: 70,
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
            {this.props.values.map((value) => (
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
          language={this.props.language}
        />

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
      console.log("Myrecipies.componentDidMount");
    }
    // Update
    this.updateRecipiesHeight();
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

  // Handlers
  handleOpenRecipe(id) {
    if (process.env.REACT_APP_DEBUG === "TRUE") {
      console.log("Myrecipies.handleOpenRecipe " + id);
    }
    this.setState({
      recipeID: id,
      recipeOpen: true
    });
  }
  handleCloseRecipe() {
    if (process.env.REACT_APP_DEBUG === "TRUE") {
      console.log("Myrecipies.handleCloseRecipe");
    }
    this.setState({
      recipeID: "",
      recipeOpen: false
    });
  }
  handleSaveRecipe() {
    if (process.env.REACT_APP_DEBUG === "TRUE") {
      console.log("Myrecipies.handleSaveRecipe");
    }
    this.props.refreshvalues();
  }
  handleCloseSnack() {
    if (process.env.REACT_APP_DEBUG === "TRUE") {
      console.log("Myrecipies.handleCloseSnack");
    }
    this.setState((prevState, props) => ({
      snackOpen: false
    }));
  }
}
