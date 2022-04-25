import * as React from "react";
import {
  Button,
  TextField,
  Box,
  Fab,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Radio,
  RadioGroup,
  FormControlLabel,
  Checkbox,
  FormGroup
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import Autocomplete, { createFilterOptions } from "@mui/material/Autocomplete";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
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

let debug = true;
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

export default class DialogTransaction extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: this.props.open,
      transaction: Object.assign({}, emptyTransaction),
      options: []
    };
    // Bindings
    this.handleOpen = this.handleOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleSave = this.handleSave.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.hanldeOpenCategorySelector = this.hanldeOpenCategorySelector.bind(
      this
    );
  }
  render() {
    return (
      <div>
        <Dialog
          id="dialog_transaction"
          open={this.state.open}
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
                defaultValue={this.state.transaction.name}
                onChange={this.handleChange}
              />
              <LocalizationProvider
                dateAdapter={AdapterDateFns}
                locale={frLocale}
              >
                <DesktopDatePicker
                  label=""
                  value={this.state.transaction.date}
                  onChange={(newValue) => this.handleChangeDate(newValue)}
                  renderInput={(params) => <TextField {...params} />}
                />
              </LocalizationProvider>

              <TextField
                name="amount"
                label={appcopy["input.amount"][config.app.language]}
                variant="standard"
                defaultValue={this.state.transaction.amount}
                onChange={this.handleChange}
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
                defaultValue={this.state.transaction.category}
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
  componentDidMount() {
    if (this.props.transaction !== "") {
      // Load
      getTransaction(this.props.transaction).then((res) => {
        this.setState(
          (prevState, props) => ({
            open: prevState.open,
            transaction: res,
            options: prevState.options
          }),
          () => {
            if (debug) {
              console.log("this.state");
              console.log(this.state);
            }
          }
        );
      });
    }
  }
  componentDidUpdate(prevProps) {
    if (prevProps.open === false) {
      if (debug) {
        console.log("componentDidUpdate.open");
      }
      if (this.props.transaction === "") {
        this.setState(
          (prevState, props) => ({
            open: prevState.open,
            transaction: emptyTransaction,
            options: prevState.options
          }),
          () => {
            this.handleOpen();
            if (debug) {
              console.log("this.state");
              console.log(this.state);
            }
          }
        );
      } else {
        // Load
        getTransaction(this.props.transaction).then((res) => {
          this.setState(
            (prevState, props) => ({
              open: prevState.open,
              transaction: res,
              options: prevState.options
            }),
            () => {
              this.handleOpen();
              if (debug) {
                console.log("this.state");
                console.log(this.state);
              }
            }
          );
        });
      }
    }
  }

  // Handles
  handleOpen() {
    if (debug) {
      console.log("DialogTransaction.handleOpen");
    }
    this.setState(
      (prevState, props) => ({
        open: true,
        transaction: prevState.transaction,
        options: prevState.options
      }),
      () => {
        if (debug) {
          console.log("this.state");
          console.log(this.state);
        }
      }
    );
  }
  handleClose() {
    if (debug) {
      console.log("DialogTransaction.handleClose");
    }
    this.setState(
      (prevState, props) => ({
        open: false,
        transaction: prevState.transaction,
        options: prevState.options
      }),
      () => {
        this.props.onclose();
        if (debug) {
          console.log("this.state");
          console.log(this.state);
        }
      }
    );
  }
  handleChange(event, newValue) {
    if (debug) {
      console.log("DialogTransaction.handleChange");
    }
    const target = event.target;
    if (debug) {
      console.log(target);
    }
    var previousTransaction = this.state.transaction;
    switch (target.name) {
      case "name":
        if (debug) {
          console.log("change name " + target.value);
        }
        previousTransaction.name = target.value;
        break;
      case "amount":
        if (debug) {
          console.log("change amount " + target.value);
        }
        previousTransaction.amount = target.value;
        break;
      case "by":
        if (debug) {
          console.log("change by " + target.value);
        }
        previousTransaction.by = target.value;
        break;
      case "for":
        if (debug) {
          console.log("change for " + target.value + " " + target.checked);
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
          console.log("change category " + target.value);
        }
        previousTransaction.category = target.value;
        break;
      default:
        if (debug) {
          console.log("no match " + target.name);
        }
    }

    this.setState(
      (prevState, props) => ({
        open: prevState.open,
        transaction: previousTransaction,
        options: prevState.options
      }),
      () => {
        if (debug) {
          console.log("this.state");
          console.log(this.state);
        }
      }
    );
  }
  handleSave() {
    if (debug) {
      console.log("DialogTransaction.handleSave");
    }
    // Check inputs
    let save = true;
    let errors = [];
    if (this.state.transaction.name === "") {
      save = false;
      errors.push("Nom vide");
    }
    if (this.state.transaction.date === null) {
      save = false;
      errors.push("Date vide");
    }
    if (this.state.transaction.amount === "") {
      save = false;
      errors.push("Montant vide");
    }
    if (this.state.transaction.by === "") {
      save = false;
      errors.push("Payé par vide");
    }
    if (this.state.transaction.for === []) {
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
        console.log(this.props.transaction);
      }
      if (this.props.transaction === "") {
        // POST
        if (debug) {
          console.log("POST");
          console.log(this.state.transaction);
        }
        if (debug === false) {
          createTransaction(this.state.transaction).then(() => {
            this.props.onsave();
          });
        }
        this.setState((prevState, props) => ({
          open: false,
          transaction: prevState.transaction,
          options: prevState.options
        }));
      } else {
        // PUT
        if (debug) {
          console.log("PUT");
          console.log(this.state.transaction);
        }
        if (debug === false) {
          modifyTransaction(
            this.props.transaction,
            this.state.transaction
          ).then(() => {
            this.props.onsave();
          });
        }
        this.setState((prevState, props) => ({
          open: false,
          transaction: prevState.transaction
        }));
      }
    }
  }
  handleChangeDate(newValue) {
    var previousTransaction = this.state.transaction;
    previousTransaction.date = newValue;
    this.setState(
      (prevState, props) => ({
        open: prevState.open,
        transaction: previousTransaction,
        options: prevState.options
      }),
      () => {
        if (debug) {
          console.log("this.state");
          console.log(this.state);
        }
      }
    );
  }
  hanldeOpenCategorySelector() {
    getCategoryTransactions().then((newOptions) => {
      this.setState(
        (prevState, props) => ({
          open: prevState.open,
          transaction: prevState.transaction,
          options: newOptions
        }),
        () => {
          if (debug) {
            console.log("this.state");
            console.log(this.state);
          }
        }
      );
    });
  }
}
