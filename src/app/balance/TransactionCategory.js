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

import config from "../../config";
import appcopy from "../copy";
import { createCategoryTransaction } from "./api/categorytransactions";
import Snack from "../Snack";

export default class TransactionCategory extends React.Component {
  constructor(props) {
    if (config.debug) {
      console.log("TransactionCategory.constructor");
    }
    super(props);
    this.state = {
      transactionCategory: "",
      snackOpen: false
    };
    // Handles
    this.handleClose = this.handleClose.bind(this);
    this.handleSave = this.handleSave.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleCloseSnack = this.handleCloseSnack.bind(this);
  }
  render() {
    if (config.debug) {
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
              appcopy["title.subsection_transactioncategory"][
                config.app.language
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
                label={appcopy["input.name"][config.app.language]}
                variant="standard"
                defaultValue={this.state.transactionCategory}
                onChange={this.handleChange}
              />
            </Box>
          </DialogContent>

          <DialogActions>
            <Button onClick={this.handleClose}>
              {appcopy["button.cancel"][config.app.language]}
            </Button>
            <Button variant="contained" onClick={this.handleSave}>
              {appcopy["button.save"][config.app.language]}
            </Button>
          </DialogActions>
        </Dialog>

        <Snack
          snackOpen={this.state.snackOpen}
          snackMessage={this.state.snackMessage}
          snackDuration={this.state.snackDuration}
          snackSeverity={this.state.snackSeverity}
          onclose={this.handleCloseSnack}
        />
      </div>
    );
  }
  componentDidUpdate(prevState) {
    if (config.debug) {
      //console.log("TransactionCategory.componentDidUpdate");
      //console.log("TransactionCategory.state");
      //console.log(this.state);
    }
  }

  // Handles
  handleClose() {
    if (config.debug) {
      console.log("TransactionCategory.handleClose");
    }
    this.setState((prevState, props) => ({
      transactionCategory: ""
    }));
    let snack = {
      severity: appcopy["snack.categoryclosed"]["severity"],
      message: appcopy["snack.categoryclosed"][config.app.language],
      duration: 1500
    };
    this.props.onclose(snack);
  }
  handleChange(event, newValue) {
    if (config.debug) {
      console.log("TransactionCategory.handleChange");
    }
    const target = event.target;
    if (config.debug) {
      //console.log("target");
      //console.log(target);
      console.log("target.name : " + target.name);
      console.log("target.value : " + target.value);
      console.log("newValue : " + newValue);
    }
    // Update
    if (config.debug) {
      console.log("TransactionCategory.state.transactionCategory");
      console.log(this.state.transactionCategory);
    }
    this.setState((prevState, props) => ({
      transactionCategory: target.value
    }));
  }
  handleSave() {
    if (config.debug) {
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
      if (config.debug) {
        console.log(this.state.transactionCategory);
      }
      // POST
      if (config.debug) {
        console.log("POST");
      }
      if (config.debug === false) {
        createCategoryTransaction({
          name: this.state.transactionCategory
        }).then((res) => {
          //this.props.onsave();
          console.log("res");
          console.log(res);
          if (res !== undefined) {
            if (res.message === "catégorie enregistrée") {
              let snack = {
                severity: appcopy["snack.categorysaved"]["severity"],
                message: appcopy["snack.categorysaved"][config.app.language],
                duration: 3000
              };
              this.props.onclose(snack);
            } else {
              let snack = {
                severity: appcopy["snack.categoryduplicated"]["severity"],
                message:
                  appcopy["snack.categoryduplicated"][config.app.language],
                duration: 1000
              };
              this.props.onclose(snack);
            }
          } else {
            let snack = {
              severity: appcopy["snack.errornetwork"]["severity"],
              message: appcopy["snack.errornetwork"][config.app.language],
              duration: 1000
            };
            this.props.onclose(snack);
          }
        });
      }
      this.setState((prevState, props) => ({
        transactionCategory: ""
      }));
    } else {
      // Snack
      this.setState((prevState, props) => ({
        snackOpen: true,
        snackSeverity: appcopy["snack.error"]["severity"],
        snackMessage: appcopy["snack.error"][config.app.language] + errors,
        snackDuration: 5000
      }));
    }
  }
  handleCloseSnack() {
    if (config.debug) {
      console.log("TransactionCategory.handleCloseSnack");
    }
    this.setState((prevState, props) => ({
      snackOpen: false
    }));
  }
}
