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
import CachedIcon from "@mui/icons-material/Cached";

import config from "../../config";
import appcopy from "../copy";
import { getRecipes } from "../api/recipies";

import navigation from "../navigation";
import { recipeview_updateRecipe } from "../recipeview/Recipeview";
import { recipeedit_updateRecipe } from "../recipeedit/Recipeedit";

export default class Myrecipies extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      recipe: ""
    };
  }
  render() {
    return (
      <div>
        <h2>{appcopy["title.section_myrecipies"][config.app.language]}</h2>
        <Paper elevation={3}>
          <div id="myrecipies_list" />
        </Paper>
        <Fab
          color="secondary"
          sx={{ position: "fixed", top: 20, right: 20 }}
          onClick={updateMyrecipies}
        >
          <CachedIcon />
        </Fab>
        <Fab
          color="primary"
          sx={{ position: "fixed", bottom: 70, right: 20 }}
          onClick={() => {
            recipeedit_updateRecipe("");
            navigation.navigates("recipeedit");
          }}
        >
          <AddIcon />
        </Fab>
      </div>
    );
  }
  componentDidMount() {
    updateMyrecipies();
  }
}

export function updateMyrecipies() {
  getRecipes().then((res) => {
    const container = document.getElementById("myrecipies_list");
    ReactDOM.render(
      <List>
        {res.map((value) => (
          <ListItem key={`${value._id}`} id={`${value._id}`}>
            <ListItemButton
              onClick={() => {
                recipeview_updateRecipe(value._id);
                navigation.navigates("recipeview");
              }}
            >
              <ListItemText
                primary={`${value.name}`}
                secondary={`${value.portions} portions`}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>,
      container
    );
  });
}
