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
              this.props.openrecipe("");
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
                    this.props.openrecipe(value._id);
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

        <Snack
          open={this.state.openSnack}
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
  handleCloseSnack() {
    if (process.env.REACT_APP_DEBUG === "TRUE") {
      console.log("Myrecipies.handleCloseSnack");
    }
    this.setState((prevState, props) => ({
      openSnack: false
    }));
  }
}
