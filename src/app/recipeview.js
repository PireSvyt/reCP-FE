import React from "react";
import ReactDOM from "react-dom";
import { Button, Paper, List, ListItem, ListItemText } from "@mui/material";

exports.render = () => {
  const container = document.getElementById("recipeview");
  ReactDOM.render(
    <div>
      <h2 id="recipeview_name">Recipe name</h2>
      <div>
        <Button variant="text">Delete</Button>
        <Button variant="text">Edit</Button>
        <Button variant="text">Select</Button>
      </div>
      <Paper>
        <h4>... portions</h4>
      </Paper>
      <Paper>
        <h3>Ingredients</h3>
        <div id="recipeview_ingredients" />
      </Paper>
      <Paper>
        <h3>Instructions</h3>
        <div id="recipeview_instructions" />
      </Paper>
    </div>,
    container
  );
};

exports.ingredients_populate = () => {
  const container = document.getElementById("recipeview_ingredients");
  ReactDOM.render(
    <List>
      {[1, 2, 3].map((value) => (
        <ListItem key={value} disableGutters>
          <ListItemText primary={`Line item ${value}`} />
        </ListItem>
      ))}
    </List>,
    container
  );
};
