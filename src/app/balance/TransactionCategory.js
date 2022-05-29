import * as React from "react";
import {
  Button,
  TextField,
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle
} from "@mui/material";

import appcopy from "../copy";
import { createCategoryTransaction } from "./api/categorytransactions";
import Snack from "../Snack";

export default class TransactionCategory extends React.Component {
  constructor(props) {
    if (process.env.REACT_APP_DEBUG === "TRUE") {
      console.log("TransactionCategory.constructor");
    }
    super(props);
    this.state = {
      transactionCategory: "",
      snackOpen: false,
      snack: undefined
    };
    // Handles
    this.handleClose = this.handleClose.bind(this);
    this.handleSave = this.handleSave.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleCloseSnack = this.handleCloseSnack.bind(this);
  }
  render() {
    if (process.env.REACT_APP_DEBUG === "TRUE") {
      console.log("TransactionCategory.render");
      //console.log("TransactionCategory.state.transactionCategory");
      //console.log(this.state.transactionCategory);
    }
    return (
      <div>
        <Dialog
          id="dialog_transactioncategory"
          open={this.props.open}
          onClose={this.handleClose}
          fullWidth={true}
        >
          <DialogTitle>
            {
              appcopy["transactioncategory"]["title"][
                process.env.REACT_APP_LANGUAGE
              ]
            }
          </DialogTitle>
          <DialogContent>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-evenly"
              }}
            >
              <TextField
                name="name"
                label={
                  appcopy["generic"]["input"]["name"][
                    process.env.REACT_APP_LANGUAGE
                  ]
                }
                variant="standard"
                defaultValue={this.state.transactionCategory}
                onChange={this.handleChange}
              />
            </Box>
          </DialogContent>

          <DialogActions>
            <Button onClick={this.handleClose}>
              {
                appcopy["generic"]["button"]["cancel"][
                  process.env.REACT_APP_LANGUAGE
                ]
              }
            </Button>
            <Button variant="contained" onClick={this.handleSave}>
              {
                appcopy["generic"]["button"]["save"][
                  process.env.REACT_APP_LANGUAGE
                ]
              }
            </Button>
          </DialogActions>
        </Dialog>

        <Snack
          snackOpen={this.state.snackOpen}
          snack={this.state.snack}
          onclose={this.handleCloseSnack}
        />
      </div>
    );
  }
  componentDidUpdate(prevState) {
    if (process.env.REACT_APP_DEBUG === "TRUE") {
      //console.log("TransactionCategory.componentDidUpdate");
      //console.log("TransactionCategory.state");
      //console.log(this.state);
    }
  }

  // Handles
  handleClose() {
    if (process.env.REACT_APP_DEBUG === "TRUE") {
      console.log("TransactionCategory.handleClose");
    }
    this.setState((prevState, props) => ({
      transactionCategory: ""
    }));
    this.props.onclose(appcopy["transactioncategory"]["snack"]["discarded"]);
  }
  handleChange(event, newValue) {
    if (process.env.REACT_APP_DEBUG === "TRUE") {
      console.log("TransactionCategory.handleChange");
    }
    const target = event.target;
    if (process.env.REACT_APP_DEBUG === "TRUE") {
      //console.log("target");
      //console.log(target);
      console.log("target.name : " + target.name);
      console.log("target.value : " + target.value);
      console.log("newValue : " + newValue);
    }
    // Update
    if (process.env.REACT_APP_DEBUG === "TRUE") {
      console.log("TransactionCategory.state.transactionCategory");
      console.log(this.state.transactionCategory);
    }
    this.setState((prevState, props) => ({
      transactionCategory: target.value
    }));
  }
  handleSave() {
    if (process.env.REACT_APP_DEBUG === "TRUE") {
      console.log("TransactionCategory.handleSave");
      console.log("this.state.transactionCategory");
      console.log(this.state.transactionCategory);
    }
    // Check inputs
    let save = true;
    let errors = [];
    if (
      this.state.transactionCategory === "" ||
      this.state.transactionCategory === undefined
    ) {
      save = false;
      errors.push(" Nom vide");
    }
    // Save or not?
    if (errors !== []) {
      console.log(errors);
    }
    // Post or publish
    if (save === true) {
      if (process.env.REACT_APP_DEBUG === "TRUE") {
        console.log(this.state.transactionCategory);
      }
      // POST
      if (process.env.REACT_APP_DEBUG === "TRUE") {
        console.log("POST");
      }
      //if (process.env.REACT_APP_MOCKAPI === "FALSE") {
      createCategoryTransaction({
        name: this.state.transactionCategory
      }).then((res) => {
        //this.props.onsave();
        console.log("res");
        console.log(res);
        if (res !== undefined) {
          if (res.message === "catégorie enregistrée") {
            this.props.onclose(
              appcopy["transactioncategory"]["snack"]["saved"]
            );
          } else {
            this.props.onclose(
              appcopy["transactioncategory"]["snack"]["erroroncreation"]
            );
          }
        } else {
          this.props.onclose(appcopy["generic"]["snack"]["errornetwork"]);
        }
      });
      /*} else {
        this.props.onclose(appcopy["generic"]["snack"]["mockedassaved"]);
      }*/
      this.setState((prevState, props) => ({
        transactionCategory: ""
      }));
    } else {
      // Snack
      this.setState((prevState, props) => ({
        snackOpen: true,
        snack: appcopy["generic"]["snack"]["errornetwork"]
      }));
    }
  }
  handleCloseSnack() {
    if (process.env.REACT_APP_DEBUG === "TRUE") {
      console.log("TransactionCategory.handleCloseSnack");
    }
    this.setState((prevState, props) => ({
      snackOpen: false
    }));
  }
}
