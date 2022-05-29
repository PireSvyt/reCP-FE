import * as React from "react";
import {
  Button,
  TextField,
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Radio,
  RadioGroup,
  FormControlLabel,
  Checkbox,
  FormGroup,
  InputAdornment
} from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";
import { MobileDatePicker } from "@mui/x-date-pickers/MobileDatePicker";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import frLocale from "date-fns/locale/fr";

import config from "../../config";
import appcopy from "../copy";
import {
  getTransaction,
  createTransaction,
  modifyTransaction
} from "./api/transactions";
import { getCategoryTransactions } from "./api/categorytransactions";
import Snack from "../Snack";

let emptyTransaction = {
  _id: undefined,
  name: undefined,
  date: Date(),
  amount: undefined,
  by: undefined,
  for: ["Alice", "Pierre"],
  category: undefined
};

export default class Transaction extends React.Component {
  constructor(props) {
    if (config.debug) {
      console.log("Transaction.constructor");
    }
    super(props);
    this.state = {
      transactionOpen: this.props.transactionOpen,
      transactionDate: Date(),
      options: [],
      transaction: { ...emptyTransaction },
      snackOpen: false,
      snackSeverity: "warning",
      snackMessage: "Empty",
      snackDuration: 5000
    };
    // Handles
    this.handleClose = this.handleClose.bind(this);
    this.handleSave = this.handleSave.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.hanldeOpenCategorySelector = this.hanldeOpenCategorySelector.bind(
      this
    );
    this.handleCloseSnack = this.handleCloseSnack.bind(this);
    // Preload
    getCategoryTransactions().then((newOptions) => {
      this.setState((prevState, props) => ({
        options: newOptions
      }));
    });
  }
  render() {
    if (config.debug) {
      console.log("Transaction.render");
      //console.log("Transaction.props.transactionID");
      //console.log(this.props.transactionID);
      //console.log("Transaction.state.transaction");
      //console.log(this.state.transaction);
    }
    return (
      <div>
        <Dialog
          id="dialog_transaction"
          open={this.state.transactionOpen}
          onClose={this.handleClose}
          fullWidth={true}
        >
          <DialogTitle>
            {appcopy["title.subsection_transaction"][config.app.language]}
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
                defaultValue={this.state.transaction.name}
                onChange={this.handleChange}
              />
              <LocalizationProvider
                dateAdapter={AdapterDateFns}
                locale={frLocale}
              >
                <MobileDatePicker
                  name="date"
                  label=""
                  value={this.state.transactionDate}
                  onChange={(newValue) => {
                    this.setState((prevState, props) => ({
                      transactionDate: newValue
                    }));
                  }}
                  onAccept={(newValue) => {
                    this.handleChange({
                      target: { name: "date", value: newValue }
                    });
                  }}
                  renderInput={(params) => <TextField {...params} />}
                />
              </LocalizationProvider>

              <TextField
                name="amount"
                label={appcopy["input.amount"][config.app.language]}
                variant="standard"
                defaultValue={this.state.transaction.amount}
                onChange={this.handleChange}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">€</InputAdornment>
                  )
                }}
              />

              <RadioGroup
                name="by"
                onChange={this.handleChange}
                defaultValue={this.state.transaction.by}
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-evenly"
                }}
              >
                <h4>{appcopy["text.by"][config.app.language]}</h4>
                <FormControlLabel
                  value="Alice"
                  control={<Radio />}
                  label="Alice"
                />
                <FormControlLabel
                  value="Pierre"
                  control={<Radio />}
                  label="Pierre"
                />
                <FormControlLabel
                  value=""
                  control={<Radio />}
                  label="None"
                  sx={{ display: "none" }}
                />
              </RadioGroup>

              <FormGroup
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-evenly"
                }}
              >
                <h4>{appcopy["text.for"][config.app.language]}</h4>
                <FormControlLabel
                  control={
                    <Checkbox
                      value="Alice"
                      name="for"
                      onChange={this.handleChange}
                      defaultChecked={true}
                    />
                  }
                  label="Alice"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      value="Pierre"
                      name="for"
                      onChange={this.handleChange}
                      defaultChecked={true}
                    />
                  }
                  label="Pierre"
                />
              </FormGroup>

              <Autocomplete
                disablePortal
                id="combo-box-demo"
                options={this.state.options}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    variant="standard"
                    label={appcopy["input.category"][config.app.language]}
                  />
                )}
                renderOption={(props, option) => (
                  <li {...props}>{option.name}</li>
                )}
                defaultValue={this.state.transaction.category}
                onOpen={this.hanldeOpenCategorySelector}
                onChange={(event, newValue) => {
                  /*console.log("event.target");
                  console.log(event.target);
                  console.log("newValue");
                  console.log(newValue);*/
                  event.target = {
                    name: "category",
                    value: newValue.name
                  };
                  this.handleChange(event, newValue.name);
                }}
                getOptionLabel={(option) => {
                  var shorlist = this.state.options.filter(function (
                    value,
                    index,
                    arr
                  ) {
                    /*console.log("value");
                    console.log(value);
                    console.log("value");
                    console.log(value);*/
                    if (typeof option === "string") {
                      return value.name === option;
                    } else {
                      return value.name === option.name;
                    }
                  });
                  if (shorlist.length === 1) {
                    return shorlist[0].name;
                  }
                  /*console.log("option");
                  console.log(option);
                  console.log("shorlist");
                  console.log(shorlist);*/
                }}
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
      //console.log("Transaction.componentDidUpdate");
      //console.log("Transaction.state");
      //console.log(this.state);
    }
    if (
      prevState.transactionOpen !== this.props.transactionOpen ||
      prevState.transactionID !== this.props.transactionID
    ) {
      if (this.props.transactionID !== "") {
        // Load
        console.log(
          "Transaction.componentDidUpdate.getTransaction " +
            this.props.transactionID
        );
        getTransaction(this.props.transactionID)
          .then((res) => {
            this.setState((prevState, props) => ({
              transaction: { ...res }
            }));
          })
          .then(() => {
            this.setState((prevState, props) => ({
              transactionOpen: this.props.transactionOpen,
              transactionDate: this.state.transaction.date
            }));
          });
      } else {
        this.setState((prevState, props) => ({
          transactionOpen: this.props.transactionOpen,
          transactionDate: Date(),
          transaction: { ...emptyTransaction }
        }));
      }
    }
  }

  // Handles
  handleClose() {
    if (config.debug) {
      console.log("Transaction.handleClose");
    }
    this.setState((prevState, props) => ({
      transaction: { ...emptyTransaction }
    }));
    let snack = {
      severity: "info",
      message: "Transaction fermée",
      duration: 1500
    };
    this.props.onclose(snack);
  }
  handleChange(event, newValue) {
    if (config.debug) {
      console.log("Transaction.handleChange");
    }
    const target = event.target;
    if (config.debug) {
      //console.log("target");
      //console.log(target);
      console.log("target.name : " + target.name);
      console.log("target.value : " + target.value);
      console.log("newValue : " + newValue);
    }
    var previousTransaction = this.state.transaction;
    switch (target.name) {
      case "name":
        if (config.debug) {
          console.log("change name : " + target.value);
        }
        previousTransaction.name = target.value;
        break;
      case "date":
        if (config.debug) {
          console.log("change date : " + target.value);
        }
        previousTransaction.date = target.value;
        this.setState((prevState, props) => ({
          transactionDate: previousTransaction.date
        }));
        break;
      case "amount":
        if (config.debug) {
          console.log("change amount : " + target.value);
        }
        previousTransaction.amount = target.value;
        break;
      case "by":
        if (config.debug) {
          console.log("change by : " + target.value);
        }
        previousTransaction.by = target.value;
        break;
      case "for":
        if (config.debug) {
          console.log("change for : " + target.value + " " + target.checked);
        }
        previousTransaction.for = previousTransaction.for.filter(function (
          value,
          index,
          arr
        ) {
          return value !== target.value;
        });
        if (target.checked === true) {
          previousTransaction.for.push(target.value);
        }
        break;
      case "category":
        if (config.debug) {
          console.log("change category : " + target.value);
        }
        previousTransaction.category = target.value;
        break;
      default:
        if (config.debug) {
          console.log("/!\\ no match : " + target.name);
        }
    }
    // Update
    if (config.debug) {
      console.log("Transaction.transaction");
      console.log(this.state.transaction);
    }
    this.setState((prevState, props) => ({
      transaction: previousTransaction
    }));
  }
  handleSave() {
    if (config.debug) {
      console.log("Transaction.handleSave");
      console.log("this.state.transaction");
      console.log(this.state.transaction);
    }
    // Check inputs
    let save = true;
    let errors = [];
    if (this.state.transaction.name === undefined) {
      save = false;
      errors.push(" Nom vide");
    }
    if (this.state.transaction.date === undefined) {
      save = false;
      errors.push(" Date vide");
    }
    if (this.state.transaction.amount === undefined) {
      save = false;
      errors.push(" Montant vide");
    }
    if (this.state.transaction.by === undefined) {
      save = false;
      errors.push(" Payé par vide");
    }
    if (this.state.transaction.for === []) {
      save = false;
      errors.push(" Payé pour vide");
    }
    if (this.state.transaction.category === undefined) {
      save = false;
      errors.push(" Catégorie vide");
    }
    // Save or not?
    if (errors !== []) {
      console.log(errors);
    }
    // Post or publish
    if (save === true) {
      if (config.debug) {
        console.log(this.props.transactionID);
        console.log(this.state.transaction);
      }
      if (this.props.transactionID === "") {
        // POST
        if (config.debug) {
          console.log("POST");
        }
        if (config.debug === false) {
          createTransaction(this.state.transaction).then((res) => {
            //this.props.onsave();
            if (res !== undefined) {
              if (res.message === "transaction enregistrée") {
                let snack = {
                  severity: appcopy["snack.transactionsaved"]["severity"],
                  message:
                    appcopy["snack.transactionsaved"][config.app.language],
                  duration: 3000
                };
                this.props.onclose(snack);
              } else {
                let snack = {
                  severity: appcopy["snack.transactionduplicated"]["severity"],
                  message:
                    appcopy["snack.transactionduplicated"][config.app.language],
                  duration: 3000
                };
                this.props.onclose(snack);
              }
            } else {
              let snack = {
                severity: appcopy["snack.errornetwork"]["severity"],
                message: appcopy["snack.errornetwork"][config.app.language],
                duration: 3000
              };
              this.props.onclose(snack);
            }
          });
        }
      } else {
        // PUT
        if (config.debug) {
          console.log("PUT");
        }
        if (config.debug === false) {
          modifyTransaction(
            this.props.transactionID,
            this.state.transaction
          ).then((res) => {
            //this.props.onsave();
            if (res !== undefined) {
              if (res.message === "transaction modifiée") {
                let snack = {
                  severity: appcopy["snack.transactionmodified"]["severity"],
                  message:
                    appcopy["snack.transactionmodified"][config.app.language],
                  duration: 3000
                };
                this.props.onclose(snack);
              } else {
                let snack = {
                  severity: appcopy["snack.transactionduplicated"]["severity"],
                  message:
                    appcopy["snack.transactionduplicated"][config.app.language],
                  duration: 3000
                };
                this.props.onclose(snack);
              }
            } else {
              let snack = {
                severity: appcopy["snack.errornetwork"]["severity"],
                message: appcopy["snack.errornetwork"][config.app.language],
                duration: 3000
              };
              this.props.onclose(snack);
            }
          });
        }
      }
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
  hanldeOpenCategorySelector() {
    getCategoryTransactions().then((newOptions) => {
      this.setState((prevState, props) => ({
        options: newOptions
      }));
    });
  }
  handleCloseSnack() {
    if (config.debug) {
      console.log("Transaction.handleCloseSnack");
    }
    this.setState((prevState, props) => ({
      snackOpen: false
    }));
  }
}
