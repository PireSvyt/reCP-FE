import * as React from "react";
import { ListItem, IconButton, Typography, Box } from "@mui/material";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

import { random_id } from "../toolkit";

import UIIngredient from "./uiingredient";

export default class UIShelf extends React.Component {
  constructor(props) {
    super(props);
    if (process.env.REACT_APP_DEBUG === "TRUE") {
      console.log("UIShelf.constructor");
    }
    this.state = {
      open: "block"
    };
    // Handlers
    this.handleCollapseDeploy = this.handleCollapseDeploy.bind(this);
  }
  render() {
    if (process.env.REACT_APP_DEBUG === "TRUE") {
      console.log("UIShelf.render " + this.props.shelf);
    }
    return (
      <Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between"
          }}
        >
          <Typography sx={{ fontWeight: "bold" }}>
            {this.props.shelf}
          </Typography>
          <IconButton
            edge="start"
            color="inherit"
            onClick={() => {
              if (process.env.REACT_APP_DEBUG === "TRUE") {
                console.log("UIShelf.collapsedeploy.onClick");
              }
              this.handleCollapseDeploy();
            }}
            sx={{ mr: "0.25em" }}
          >
            {this.state.open === "block" && <KeyboardArrowDownIcon />}
            {this.state.open !== "block" && <KeyboardArrowRightIcon />}
          </IconButton>
        </Box>
        <Box sx={{ display: this.state.open }}>
          {this.props.ingredients.map((ingredient) => {
            //console.log("ingredient");
            //console.log(ingredient);
            return (
              <ListItem key={ingredient._id + "-" + random_id()}>
                <UIIngredient
                  ingredient={ingredient}
                  callback={this.props.callback}
                  packaging={this.props.packaging}
                  shelfs={this.props.shelfs}
                />
              </ListItem>
            );
          })}
        </Box>
      </Box>
    );
  }

  // Handles
  handleCollapseDeploy() {
    if (process.env.REACT_APP_DEBUG === "TRUE") {
      console.log("UIShelf.handleCollapseDeploy ");
    }
    if (this.state.open === "none") {
      this.setState((prevState, props) => ({
        open: "block"
      }));
    } else {
      this.setState((prevState, props) => ({
        open: "none"
      }));
    }
  }
}
