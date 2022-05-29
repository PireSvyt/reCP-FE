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
      snackOpen: false
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
          snackMessage={this.state.snackMessage}
          snackDuration={this.state.snackDuration}
          snackSeverity={this.state.snackSeverity}
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
    let snack = {
      severity:
        appcopy["transactioncategory"]["specific"]["closed"]["severity"],
      message:
        appcopy["transactioncategory"]["specific"]["closed"][
          process.env.REACT_APP_LANGUAGE
        ],
      duration: 1500
    };
    this.props.onclose(snack);
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
      if (process.env.REACT_APP_DEBUG === false) {
        createCategoryTransaction({
          name: this.state.transactionCategory
        }).then((res) => {
          //this.props.onsave();
          console.log("res");
          console.log(res);
          if (res !== undefined) {
            if (res.message === "catégorie enregistrée") {
              let snack = {
                severity:
                  appcopy["transactioncategory"]["snack"]["saved"]["severity"],
                message:
                  appcopy["transactioncategory"]["snack"]["saved"][
                    process.env.REACT_APP_LANGUAGE
                  ],
                duration: 3000
              };
              this.props.onclose(snack);
            } else {
              let snack = {
                severity:
                  appcopy["transactioncategory"]["snack"]["erroroncreation"][
                    "severity"
                  ],
                message:
                  appcopy["transactioncategory"]["snack"]["erroroncreation"][
                    process.env.REACT_APP_LANGUAGE
                  ],
                duration: 1000
              };
              this.props.onclose(snack);
            }
          } else {
            let snack = {
              severity: appcopy["generic"]["snack"]["errornetwork"]["severity"],
              message:
                appcopy["generic"]["snack"]["errornetwork"][
                  process.env.REACT_APP_LANGUAGE
                ],
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
        snackSeverity: appcopy["generic"]["snack"]["errornetwork"]["severity"],
        snackMessage:
          appcopy["generic"]["snack"]["errornetwork"][
            process.env.REACT_APP_LANGUAGE
          ] + errors,
        snackDuration: 5000
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
