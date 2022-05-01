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
import Autocomplete, { createFilterOptions } from "@mui/material/Autocomplete";
import { MobileDatePicker } from "@mui/x-date-pickers/MobileDatePicker";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import frLocale from "date-fns/locale/fr";

import config from "../../config";
import appcopy from "./copy";
import {
  getTransaction,
  createTransaction,
  modifyTransaction
} from "./api/transactions";
import { getCategoryTransactions } from "./api/categorytransactions";

let debug = false;
const filter = createFilterOptions();
let emptyTransaction = {
  _id: "",
  name: "",
  date: Date(),
  amount: "",
  by: "",
  for: ["Alice", "Pierre"],
  category: ""
};

export default class Transaction extends React.Component {
  constructor(props) {
    if (debug) {
      console.log("Transaction.constructor");
    }
    super(props);
    this.state = {
      transactionOpen: this.props.transactionOpen,
      transactionDate: Date(),
      options: []
    };
    this.transaction = { ...emptyTransaction };
    // Bindings
    this.handleClose = this.handleClose.bind(this);
    this.handleSave = this.handleSave.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.hanldeOpenCategorySelector = this.hanldeOpenCategorySelector.bind(
      this
    );
  }
  render() {
    if (debug) {
      console.log("Transaction.render");
      console.log("Transaction.props.transactionID");
      console.log(this.props.transactionID);
      console.log("Transaction.transaction");
      console.log(this.transaction);
    }
    return (
      <div>
        <Dialog
          id="dialog_transaction"
          open={this.state.transactionOpen}
          onClose={this.handleClose}
          fullWidth={true}
        >
          <DialogTitle>Transaction</DialogTitle>
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
                defaultValue={this.transaction.name}
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
                defaultValue={this.transaction.amount}
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
                defaultValue={this.transaction.by}
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
                defaultValue={this.transaction.category}
                onOpen={this.hanldeOpenCategorySelector}
                onChange={this.handleChange}
                filterOptions={(options, params) => {
                  const filtered = filter(options, params);
                  const { inputValue } = params;
                  // Suggest the creation of a new value
                  const isExisting = this.state.options.some(
                    (option) => inputValue === option.name
                  );
                  if (inputValue !== "" && !isExisting) {
                    filtered.push({
                      inputValue,
                      name: `Add "${inputValue}"`
                    });
                  }
                  return filtered;
                }}
                autoSelect
                clearOnBlur
                handleHomeEndKeys
                options={this.state.options}
                getOptionLabel={(option) => {
                  // Value selected with enter, right from the input
                  if (typeof option === "string") {
                    return option;
                  }
                  // Add "xxx" option created dynamically
                  if (option.inputValue) {
                    return option.inputValue;
                  }
                  // Regular option
                  return option.name;
                }}
                renderOption={(props, option) => (
                  <li {...props} name="category">
                    {option.name}
                  </li>
                )}
                freeSolo
                size="small"
                renderInput={(params) => (
                  <TextField
                    {...params}
                    variant="standard"
                    label={appcopy["input.category"][config.app.language]}
                  />
                )}
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
      </div>
    );
  }
  componentDidUpdate(prevState) {
    if (debug) {
      console.log("Transaction.componentDidUpdate");
      console.log("Transaction.state");
      console.log(this.state);
    }
    if (
      prevState.transactionOpen !== this.props.transactionOpen ||
      prevState.transactionID !== this.props.transactionID
    ) {
      this.transaction = { ...emptyTransaction };
      this.setState((prevState, props) => ({
        transactionDate: Date()
      }));
      if (this.props.transactionID !== "") {
        // Load
        console.log(
          "Transaction.componentDidUpdate.getTransaction " +
            this.props.transactionID
        );
        getTransaction(this.props.transactionID)
          .then((res) => {
            this.transaction = { ...res };
            console.log("this.transaction");
            console.log(this.transaction);
          })
          .then(() => {
            this.setState((prevState, props) => ({
              transactionOpen: this.props.transactionOpen,
              transactionDate: this.transaction.date
            }));
            console.log("this.transaction after set state");
            console.log(this.transaction);
          });
      } else {
        this.setState((prevState, props) => ({
          transactionOpen: this.props.transactionOpen
        }));
      }
    }
  }

  // Handles
  handleClose() {
    if (debug) {
      console.log("Transaction.handleClose");
    }
    this.transaction = { ...emptyTransaction };
    this.props.onclose();
  }
  handleChange(event, newValue) {
    if (debug) {
      console.log("Transaction.handleChange");
    }
    const target = event.target;
    if (debug) {
      console.log(target);
    }
    var previousTransaction = this.transaction;
    switch (target.name) {
      case "name":
        if (debug) {
          console.log("change name : " + target.value);
        }
        previousTransaction.name = target.value;
        break;
      case "date":
        if (debug) {
          console.log("change date : " + target.value);
        }
        previousTransaction.date = target.value;
        this.setState((prevState, props) => ({
          transactionDate: previousTransaction.date
        }));
        break;
      case "amount":
        if (debug) {
          console.log("change amount : " + target.value);
        }
        previousTransaction.amount = target.value;
        break;
      case "by":
        if (debug) {
          console.log("change by : " + target.value);
        }
        previousTransaction.by = target.value;
        break;
      case "for":
        if (debug) {
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
        if (debug) {
          console.log("change category : " + target.value);
        }
        previousTransaction.category = target.value;
        break;
      default:
        if (debug) {
          console.log("/!\\ no match : " + target.name);
        }
    }
    // Update
    if (debug) {
      console.log("Transaction.transaction");
      console.log(this.transaction);
    }
    this.transaction = previousTransaction;
  }
  handleSave() {
    if (debug) {
      console.log("Transaction.handleSave");
    }
    // Check inputs
    let save = true;
    let errors = [];
    if (this.transaction.name === "") {
      save = false;
      errors.push("Nom vide");
    }
    if (this.transaction.date === null) {
      save = false;
      errors.push("Date vide");
    }
    if (this.transaction.amount === "") {
      save = false;
      errors.push("Montant vide");
    }
    if (this.transaction.by === "") {
      save = false;
      errors.push("Payé par vide");
    }
    if (this.transaction.for === []) {
      save = false;
      errors.push("Payé pour vide");
    }
    // Save or not?
    if (errors !== []) {
      console.log(errors);
    }
    // Post or publish
    if (save === true) {
      if (debug) {
        console.log(this.props.transactionID);
        console.log(this.transaction);
      }
      if (this.props.transactionID === "") {
        // POST
        if (debug) {
          console.log("POST");
        }
        if (debug === false) {
          createTransaction(this.transaction).then(() => {
            this.props.onsave();
          });
        }
        this.props.onclose();
      } else {
        // PUT
        if (debug) {
          console.log("PUT");
        }
        if (debug === false) {
          modifyTransaction(this.props.transactionID, this.transaction).then(
            () => {
              this.props.onsave();
            }
          );
        }
        this.props.onclose();
      }
    }
  }
  hanldeOpenCategorySelector() {
    getCategoryTransactions().then((newOptions) => {
      this.setState(
        (prevState, props) => ({
          transactionOpen: prevState.transactionOpen,
          options: newOptions
        }),
        () => {
          if (debug) {
            console.log("Transaction.state");
            console.log(this.state);
          }
        }
      );
    });
  }
}