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
import { apiGetShop } from "../api/gets";
import { apiSetShopSave } from "../api/sets";
import Snack from "./Snack";

let emptyShop = {
  _id: undefined,
  name: undefined
};

export default class Shop extends React.Component {
  constructor(props) {
    if (process.env.REACT_APP_DEBUG === "TRUE") {
      console.log("Shop.constructor");
    }
    super(props);
    if (process.env.REACT_APP_DEBUG === "TRUE") {
      console.log("Shop language = " + this.props.language);
    }
    this.state = {
      shop: { ...emptyShop },
      openSnack: false,
      snack: undefined
    };
    // Handles
    this.handleClose = this.handleClose.bind(this);
    this.handleSave = this.handleSave.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSnack = this.handleSnack.bind(this);
  }
  render() {
    if (process.env.REACT_APP_DEBUG === "TRUE") {
      console.log("Shop.render");
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
            {appcopy["shop"]["title"][this.props.language]}
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
                value={this.state.shop.name || ""}
                onChange={this.handleChange}
                autoComplete="off"
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
          callback={this.handleSnack}
          language={this.props.language}
        />
      </div>
    );
  }
  componentDidMount() {
    if (process.env.REACT_APP_DEBUG === "TRUE") {
      //console.log("Shop.componentDidMount");
    }
  }
  componentDidUpdate(prevState) {
    if (process.env.REACT_APP_DEBUG === "TRUE") {
      //console.log("Shop.componentDidUpdate");
      //console.log("Shop.state");
      //console.log(this.state);
    }
    if (
      prevState.open !== this.props.open ||
      prevState.values !== this.props.values
    ) {
      if (this.props.values !== "") {
        // Load
        apiGetShop(this.props.values).then((res) => {
          switch (res.status) {
            case 200:
              this.setState({
                shop: res.shop
              });
              break;
            case 400:
              this.setState((prevState, props) => ({
                shop: emptyShop,
                openSnack: true,
                snack: appcopy["generic"]["snack"]["errornetwork"]
              }));
              this.props.callback("closeItem");
              break;
            default:
              this.setState((prevState, props) => ({
                shop: emptyShop,
                openSnack: true,
                snack: appcopy["generic"]["snack"]["errorunknown"]
              }));
              this.props.callback("closeItem");
          }
        });
      } else {
        this.setState((prevState, props) => ({
          shop: { ...emptyShop }
        }));
      }
    }
  }

  // Handles
  handleClose() {
    if (process.env.REACT_APP_DEBUG === "TRUE") {
      console.log("Shop.handleClose");
    }
    this.setState((prevState, props) => ({
      shop: { ...emptyShop },
      openSnack: true,
      snack: appcopy["shop"]["snack"]["discarded"]
    }));
    this.props.callback("closeItem");
  }
  handleChange(event, newValue) {
    if (process.env.REACT_APP_DEBUG === "TRUE") {
      console.log("Shop.handleChange");
    }
    const target = event.target;
    if (process.env.REACT_APP_DEBUG === "TRUE") {
      console.log("target.name : " + target.name);
      console.log("target.value : " + target.value);
      console.log("newValue : " + newValue);
    }
    var previousShop = this.state.shop;
    switch (target.name) {
      case "name":
        if (process.env.REACT_APP_DEBUG === "TRUE") {
          console.log("change name : " + target.value);
        }
        previousShop.name = target.value;
        break;
      default:
        if (process.env.REACT_APP_DEBUG === "TRUE") {
          console.log("/!\\ no match : " + target.name);
        }
    }
    // Update
    if (process.env.REACT_APP_DEBUG === "TRUE") {
      console.log("Shop.shop");
      console.log(this.state.shop);
    }
    this.setState((prevState, props) => ({
      shop: previousShop
    }));
  }
  handleSave() {
    if (process.env.REACT_APP_DEBUG === "TRUE") {
      console.log("Shop.handleSave");
      console.log("this.state.shop");
      console.log(this.state.shop);
    }
    // Check inputs
    let save = true;
    let errors = [];
    if (this.state.shop.name === undefined) {
      save = false;
      errors.push(" Nom vide");
    }
    // Save or not?
    if (errors !== [] && process.env.REACT_APP_DEBUG === "TRUE") {
      console.log(errors);
    }
    // Post or publish
    if (save === true) {
      if (process.env.REACT_APP_DEBUG === "TRUE") {
        console.log(this.props.values);
        console.log(this.state.shop);
      }
      apiSetShopSave(this.state.shop).then((res) => {
        switch (res.status) {
          case 201:
            //console.log("default");
            this.setState({
              shop: emptyShop,
              openSnack: true,
              snack: appcopy["shop"]["snack"]["saved"]
            });
            this.props.callback("closeItem");
            break;
          case 200:
            //console.log("modified");
            this.setState((prevState, props) => ({
              shop: emptyShop,
              openSnack: true,
              snack: appcopy["shop"]["snack"]["edited"]
            }));
            this.props.callback("closeItem");
            break;
          case 208: // Already reported https://en.wikipedia.org/wiki/List_of_HTTP_status_codes#4xx_client_errors
            //console.log("name unicity violation");
            this.setState({
              openSnack: true,
              snack: appcopy["shop"]["snack"]["conflict"]
            });
            break;
          case 400:
            //console.log("error");
            //console.log(res);
            this.setState({
              openSnack: true,
              snack: appcopy["generic"]["snack"]["errornetwork"]
            });
            break;
          default:
            //console.log("default");
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
  handleSnack(action) {
    if (process.env.REACT_APP_DEBUG === "TRUE") {
      console.log("Shop.handleSnack " + action);
    }
    switch (action) {
      case "close":
        this.setState((prevState, props) => ({
          openSnack: false
        }));
        break;
      default:
    }
  }
}
