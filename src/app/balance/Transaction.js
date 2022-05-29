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
    if (process.env.REACT_APP_DEBUG === "TRUE") {
      console.log("Transaction.constructor");
    }
    super(props);
    this.state = {
      transactionOpen: this.props.transactionOpen,
      transactionDate: Date(),
      options: [],
      transaction: { ...emptyTransaction },
      snackOpen: false,
      snack: undefined
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
    if (process.env.REACT_APP_DEBUG === "TRUE") {
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
            {appcopy["transaction"]["title"][process.env.REACT_APP_LANGUAGE]}
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
                defaultValue={this.state.transaction.name}
                onChange={this.handleChange}
              />
              <LocalizationProvider
                dateAdapter={AdapterDateFns}
                locale={frLocale}
              >
                <MobileDatePicker
                  name="date"
                  label={
                    appcopy["generic"]["input"]["date"][
                      process.env.REACT_APP_LANGUAGE
                    ]
                  }
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
                label={
                  appcopy["generic"]["input"]["quantity"][
                    process.env.REACT_APP_LANGUAGE
                  ]
                }
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
                <h4>
                  {
                    appcopy["transaction"]["specific"]["by"][
                      process.env.REACT_APP_LANGUAGE
                    ]
                  }
                </h4>
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
                <h4>
                  {
                    appcopy["transaction"]["specific"]["for"][
                      process.env.REACT_APP_LANGUAGE
                    ]
                  }
                </h4>
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
                    label={
                      appcopy["transaction"]["specific"]["category"][
                        process.env.REACT_APP_LANGUAGE
                      ]
                    }
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
    if (process.env.REACT_APP_DEBUG === "TRUE") {
      console.log("Transaction.handleClose");
    }
    this.setState((prevState, props) => ({
      transaction: { ...emptyTransaction }
    }));
    this.props.onclose(appcopy["transaction"]["snack"]["discarded"]);
  }
  handleChange(event, newValue) {
    if (process.env.REACT_APP_DEBUG === "TRUE") {
      console.log("Transaction.handleChange");
    }
    const target = event.target;
    if (process.env.REACT_APP_DEBUG === "TRUE") {
      //console.log("target");
      //console.log(target);
      console.log("target.name : " + target.name);
      console.log("target.value : " + target.value);
      console.log("newValue : " + newValue);
    }
    var previousTransaction = this.state.transaction;
    switch (target.name) {
      case "name":
        if (process.env.REACT_APP_DEBUG === "TRUE") {
          console.log("change name : " + target.value);
        }
        previousTransaction.name = target.value;
        break;
      case "date":
        if (process.env.REACT_APP_DEBUG === "TRUE") {
          console.log("change date : " + target.value);
        }
        previousTransaction.date = target.value;
        this.setState((prevState, props) => ({
          transactionDate: previousTransaction.date
        }));
        break;
      case "amount":
        if (process.env.REACT_APP_DEBUG === "TRUE") {
          console.log("change amount : " + target.value);
        }
        previousTransaction.amount = target.value;
        break;
      case "by":
        if (process.env.REACT_APP_DEBUG === "TRUE") {
          console.log("change by : " + target.value);
        }
        previousTransaction.by = target.value;
        break;
      case "for":
        if (process.env.REACT_APP_DEBUG === "TRUE") {
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
        if (process.env.REACT_APP_DEBUG === "TRUE") {
          console.log("change category : " + target.value);
        }
        previousTransaction.category = target.value;
        break;
      default:
        if (process.env.REACT_APP_DEBUG === "TRUE") {
          console.log("/!\\ no match : " + target.name);
        }
    }
    // Update
    if (process.env.REACT_APP_DEBUG === "TRUE") {
      console.log("Transaction.transaction");
      console.log(this.state.transaction);
    }
    this.setState((prevState, props) => ({
      transaction: previousTransaction
    }));
  }
  handleSave() {
    if (process.env.REACT_APP_DEBUG === "TRUE") {
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
    if (errors !== [] && process.env.REACT_APP_DEBUG === "TRUE") {
      console.log(errors);
    }
    // Post or publish
    if (save === true) {
      if (process.env.REACT_APP_DEBUG === "TRUE") {
        console.log(this.props.transactionID);
        console.log(this.state.transaction);
      }
      if (this.props.transactionID === "") {
        // POST
        if (process.env.REACT_APP_DEBUG === "TRUE") {
          console.log("POST");
        }
        //if (process.env.REACT_APP_DEBUG === "FALSE") {
        createTransaction(this.state.transaction).then((res) => {
          //this.props.onsave();
          if (res !== undefined) {
            if (res.message === "transaction enregistrée") {
              this.props.onclose(appcopy["transaction"]["snack"]["saved"]);
            } else {
              this.props.onclose(
                appcopy["transaction"]["snack"]["erroroncreation"]
              );
            }
          } else {
            this.props.onclose(appcopy["generic"]["snack"]["errornetwork"]);
          }
        });
        /*} else {
          this.props.onclose(appcopy["generic"]["snack"]["mockedassaved"]);
        }*/
      } else {
        // PUT
        if (process.env.REACT_APP_DEBUG === "TRUE") {
          console.log("PUT");
        }
        //if (process.env.REACT_APP_MOCKAPI === "FALSE") {
        modifyTransaction(
          this.props.transactionID,
          this.state.transaction
        ).then((res) => {
          //this.props.onsave();
          if (res !== undefined) {
            if (res.message === "transaction modifiée") {
              this.props.onclose(appcopy["transaction"]["snack"]["modified"]);
            } else {
              this.props.onclose(
                appcopy["transaction"]["snack"]["erroroncreation"]
              );
            }
          } else {
            this.props.onclose(appcopy["generic"]["snack"]["errornetwork"]);
          }
        });
        /*} else {
          this.props.onclose(appcopy["generic"]["snack"]["mockedassaved"]);
        }*/
      }
    } else {
      // Snack
      var snack = appcopy["generic"]["snack"]["error"];
      snack.message =
        appcopy["generic"]["snack"]["error"][process.env.REACT_APP_LANGUAGE] +
        errors;
      this.setState((prevState, props) => ({
        snackOpen: true,
        snack: snack
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
    if (process.env.REACT_APP_DEBUG === "TRUE") {
      console.log("Transaction.handleCloseSnack");
    }
    this.setState((prevState, props) => ({
      snackOpen: false
    }));
  }
}
