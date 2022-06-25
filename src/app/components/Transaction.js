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
  InputAdornment,
  Autocomplete,
  Typography
} from "@mui/material";
import { MobileDatePicker } from "@mui/x-date-pickers/MobileDatePicker";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import frLocale from "date-fns/locale/fr";

import appcopy from "../copy";
import { apiGetTransaction, apiGetCategories } from "../api/gets";
import { apiSetTransactionSave } from "../api/sets";
import Snack from "./Snack";

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
    if (process.env.REACT_APP_DEBUG === "TRUE") {
      console.log("Transaction language = " + this.props.language);
    }
    this.state = {
      transactionDate: Date(),
      options: [],
      transaction: { ...emptyTransaction },
      openSnack: false,
      snack: undefined
    };
    // Handles
    this.handleClose = this.handleClose.bind(this);
    this.handleSave = this.handleSave.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleCloseSnack = this.handleCloseSnack.bind(this);
    this.apiLoadCategories = this.apiLoadCategories.bind(this);
  }
  render() {
    if (process.env.REACT_APP_DEBUG === "TRUE") {
      console.log("Transaction.render");
      //console.log("Transaction.props.transactionid");
      //console.log(this.props.transactionid);
      //console.log("Transaction.state.transaction");
      //console.log(this.state.transaction);
    }
    return (
      <div>
        <Dialog
          id="dialog_transaction"
          open={this.props.open}
          onClose={this.handleClose}
          fullWidth={true}
        >
          <DialogTitle>
            {appcopy["transaction"]["title"][this.props.language]}
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
                label={appcopy["generic"]["input"]["name"][this.props.language]}
                variant="standard"
                value={this.state.transaction.name || ""}
                onChange={this.handleChange}
                autoComplete="off"
              />
              <LocalizationProvider
                dateAdapter={AdapterDateFns}
                locale={frLocale}
              >
                <MobileDatePicker
                  name="date"
                  label={
                    appcopy["generic"]["input"]["date"][this.props.language]
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
                  appcopy["generic"]["input"]["quantity"][this.props.language]
                }
                variant="standard"
                value={this.state.transaction.amount || ""}
                onChange={this.handleChange}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">€</InputAdornment>
                  )
                }}
                autoComplete="off"
                type="number"
              />

              <RadioGroup
                name="by"
                onChange={this.handleChange}
                value={this.state.transaction.by || ""}
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-evenly",
                  alignItems: "center"
                }}
              >
                <Typography variant="h6">
                  {
                    appcopy["transaction"]["specific"]["by"][
                      this.props.language
                    ]
                  }
                </Typography>
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
                  justifyContent: "space-evenly",
                  alignItems: "center"
                }}
              >
                <Typography variant="h6">
                  {
                    appcopy["transaction"]["specific"]["for"][
                      this.props.language
                    ]
                  }
                </Typography>
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
                        this.props.language
                      ]
                    }
                  />
                )}
                renderOption={(props, option) => (
                  <li {...props}>{option.name}</li>
                )}
                value={this.state.transaction.category || ""}
                onChange={(event, newValue) => {
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
                    if (typeof option === "string") {
                      return value.name === option;
                    } else {
                      return value.name === option.name;
                    }
                  });
                  if (shorlist.length === 1) {
                    return shorlist[0].name;
                  } else {
                    return "";
                  }
                }}
              />
            </Box>
          </DialogContent>

          <DialogActions>
            <Button onClick={this.handleClose}>
              {appcopy["generic"]["button"]["cancel"][this.props.language]}
            </Button>
            <Button variant="contained" onClick={this.handleSave}>
              {appcopy["generic"]["button"]["save"][this.props.language]}
            </Button>
          </DialogActions>
        </Dialog>

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
      //console.log("Transaction.componentDidMount");
    }
    this.apiLoadCategories();
  }
  componentDidUpdate(prevState) {
    if (process.env.REACT_APP_DEBUG === "TRUE") {
      //console.log("Transaction.componentDidUpdate");
      //console.log("Transaction.state");
      //console.log(this.state);
    }
    if (
      prevState.open !== this.props.open ||
      prevState.transactionid !== this.props.transactionid
    ) {
      if (this.props.transactionid !== "") {
        // Load
        apiGetTransaction(this.props.transactionid).then((res) => {
          switch (res.status) {
            case 200:
              this.setState({
                transaction: res.transaction,
                transactionDate: res.transaction.date
              });
              break;
            case 404:
              this.setState((prevState, props) => ({
                transaction: emptyTransaction,
                openSnack: true,
                snack:
                  appcopy["transaction"]["snack"][
                    "404 - issue on find category"
                  ]
              }));
              this.props.onclose();
              break;
            case 400:
              this.setState((prevState, props) => ({
                transaction: emptyTransaction,
                openSnack: true,
                snack: appcopy["generic"]["snack"]["errornetwork"]
              }));
              this.props.onclose();
              break;
            default:
              this.setState((prevState, props) => ({
                transaction: emptyTransaction,
                openSnack: true,
                snack: appcopy["generic"]["snack"]["errorunknown"]
              }));
              this.props.onclose();
          }
        });
      } else {
        this.setState((prevState, props) => ({
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
      transaction: { ...emptyTransaction },
      openSnack: true,
      snack: appcopy["transaction"]["snack"]["discarded"]
    }));
    this.props.onclose();
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
        console.log(this.props.transactionid);
        console.log(this.state.transaction);
      }
      apiSetTransactionSave(this.state.transaction).then((res) => {
        switch (res.status) {
          case 201:
            this.setState({
              transaction: emptyTransaction,
              openSnack: true,
              snack: appcopy["transaction"]["snack"]["saved"]
            });
            this.props.onclose();
            this.props.onedit();
            break;
          case 200:
            this.setState((prevState, props) => ({
              transaction: emptyTransaction,
              openSnack: true,
              snack: appcopy["transaction"]["snack"]["edited"]
            }));
            this.props.onclose();
            this.props.onedit();
            break;
          case 206:
            this.setState({
              openSnack: true,
              snack:
                appcopy["transaction"]["snack"]["206 - category inconsistency"]
            });
            break;
          case 400:
            this.setState({
              openSnack: true,
              snack: appcopy["generic"]["snack"]["errornetwork"]
            });
            break;
          default:
            this.setState((prevState, props) => ({
              openSnack: true,
              snack: appcopy["generic"]["snack"]["errorunknown"]
            }));
        }
      });
    } else {
      // Snack
      var snack = appcopy["generic"]["snack"]["error"];
      snack.message =
        appcopy["generic"]["snack"]["error"][this.props.language] + errors;
      this.setState((prevState, props) => ({
        openSnack: true,
        snack: snack
      }));
    }
  }
  handleCloseSnack() {
    if (process.env.REACT_APP_DEBUG === "TRUE") {
      console.log("Transaction.handleCloseSnack");
    }
    this.setState((prevState, props) => ({
      openSnack: false
    }));
  }

  // API
  apiLoadCategories() {
    apiGetCategories({ need: "transactiondropdown" }).then((res) => {
      if (res.status === 200) {
        this.setState({
          options: res.categories
        });
      } else {
        this.setState((prevState, props) => ({
          options: [],
          openSnack: true,
          snack: appcopy["generic"]["snack"]["errornetwork"]
        }));
      }
    });
  }
}
