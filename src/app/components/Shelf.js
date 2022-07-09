import * as React from "react";
import {
  Button,
  TextField,
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Select,
  Typography,
  OutlinedInput,
  ListItemText,
  Checkbox,
  MenuItem
} from "@mui/material";

import appcopy from "../copy";
import { apiGetShelf, apiGetShops } from "../api/gets";
import { apiSetShelfSave } from "../api/sets";
import Snack from "./Snack";

let emptyShelf = {
  _id: undefined,
  name: undefined,
  shops: []
};

export default class Shelf extends React.Component {
  constructor(props) {
    if (process.env.REACT_APP_DEBUG === "TRUE") {
      console.log("Shelf.constructor");
    }
    super(props);
    if (process.env.REACT_APP_DEBUG === "TRUE") {
      console.log("Shelf language = " + this.props.language);
    }
    this.state = {
      shelf: { ...emptyShelf },
      shopoptions: [],
      openSnack: false,
      snack: undefined
    };
    // Handles
    this.handleClose = this.handleClose.bind(this);
    this.handleSave = this.handleSave.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSnack = this.handleSnack.bind(this);
    // API
    this.apiLoadShops = this.apiLoadShops.bind(this);
  }
  render() {
    if (process.env.REACT_APP_DEBUG === "TRUE") {
      console.log("Shelf.render");
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
            {appcopy["shelf"]["title"][this.props.language]}
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
                value={this.state.shelf.name || ""}
                onChange={this.handleChange}
                autoComplete="off"
              />
              <Select
                multiple
                value={this.state.shelf.shops}
                onChange={(event, newValue) => {
                  //console.log("event.target");
                  //console.log(event.target);
                  //console.log("newValue.props.value");
                  //console.log(newValue.props.value);
                  event.target = {
                    name: "shops",
                    value: newValue.props.value
                  };
                  this.handleChange(event, newValue.props.value);
                }}
                input={
                  <OutlinedInput
                    label={
                      appcopy["generic"]["input"]["shop"][this.props.language]
                    }
                  />
                }
                renderValue={(selected) => {
                  let names = [];
                  this.state.shopoptions.forEach((option) => {
                    if (selected.indexOf(option._id) >= 0) {
                      names.push(option.name);
                    }
                  });
                  //console.log("names");
                  //console.log(names);
                  return names.join(", ");
                }}
              >
                {this.state.shopoptions.map((shop) => (
                  <MenuItem key={shop._id} value={shop._id}>
                    <Checkbox
                      checked={this.state.shelf.shops.indexOf(shop._id) > -1}
                    />
                    <ListItemText primary={shop.name} />
                  </MenuItem>
                ))}
              </Select>
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
      //console.log("Shelf.componentDidMount");
    }
  }
  componentDidUpdate(prevState) {
    if (process.env.REACT_APP_DEBUG === "TRUE") {
      //console.log("Shelf.componentDidUpdate");
      //console.log("Shelf.state");
      //console.log(this.state);
    }
    if (
      prevState.open !== this.props.open ||
      prevState.values !== this.props.values
    ) {
      this.apiLoadShops();
      if (this.props.values !== "") {
        // Load
        apiGetShelf(this.props.values).then((res) => {
          switch (res.status) {
            case 200:
              this.setState({
                shelf: res.shelf
              });
              break;
            case 400:
              this.setState((prevState, props) => ({
                shelf: emptyShelf,
                openSnack: true,
                snack: appcopy["generic"]["snack"]["errornetwork"]
              }));
              this.props.callback("closeItem");
              break;
            default:
              this.setState((prevState, props) => ({
                shelf: emptyShelf,
                openSnack: true,
                snack: appcopy["generic"]["snack"]["errorunknown"]
              }));
              this.props.callback("closeItem");
          }
        });
      } else {
        this.setState((prevState, props) => ({
          shelf: { ...emptyShelf }
        }));
      }
    }
  }

  // Handles
  handleClose() {
    if (process.env.REACT_APP_DEBUG === "TRUE") {
      console.log("Shelf.handleClose");
    }
    this.setState((prevState, props) => ({
      shelf: { ...emptyShelf },
      openSnack: true,
      snack: appcopy["shelf"]["snack"]["discarded"]
    }));
    this.props.callback("closeItem");
  }
  handleChange(event, newValue) {
    if (process.env.REACT_APP_DEBUG === "TRUE") {
      console.log("Shelf.handleChange");
    }
    const target = event.target;
    if (process.env.REACT_APP_DEBUG === "TRUE") {
      console.log("target.name : " + target.name);
      console.log("target.value : " + target.value);
      console.log("newValue : " + newValue);
    }
    console.log("target.name : " + target.name);
    console.log("target.value : ");
    console.log(target.value);
    var previousShelf = this.state.shelf;
    switch (target.name) {
      case "name":
        if (process.env.REACT_APP_DEBUG === "TRUE") {
          console.log("change name : " + target.value);
        }
        previousShelf.name = target.value;
        break;
      case "shops":
        if (process.env.REACT_APP_DEBUG === "TRUE") {
          console.log("change shop : " + target.value);
        }
        console.log("change shop : ");
        console.log(target.value);
        console.log(" this.state.shelf.shops : ");
        console.log(this.state.shelf.shops);
        console.log(previousShelf.shops.indexOf(target.value));
        if (previousShelf.shops.includes(target.value)) {
          console.log("removing  ");
          previousShelf.shops.splice(
            previousShelf.shops.indexOf(target.value),
            1
          );
        } else {
          console.log("adding  ");
          previousShelf.shops.push(target.value);
        }
        console.log("previousShelf.shops : ");
        console.log(previousShelf.shops);
        break;
      default:
        if (process.env.REACT_APP_DEBUG === "TRUE") {
          console.log("/!\\ no match : " + target.name);
        }
    }
    // Update
    if (process.env.REACT_APP_DEBUG === "TRUE") {
      console.log("Shelf.shelf");
      console.log(this.state.shelf);
    }
    this.setState((prevState, props) => ({
      shelf: previousShelf
    }));
  }
  handleSave() {
    if (process.env.REACT_APP_DEBUG === "TRUE") {
      console.log("Shelf.handleSave");
      console.log("this.state.shelf");
      console.log(this.state.shelf);
    }
    // Check inputs
    let save = true;
    let errors = [];
    if (this.state.shelf.name === undefined) {
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
        console.log(this.state.shelf);
      }
      apiSetShelfSave(this.state.shelf).then((res) => {
        switch (res.status) {
          case 201:
            //console.log("default");
            this.setState({
              shelf: emptyShelf,
              openSnack: true,
              snack: appcopy["shelf"]["snack"]["saved"]
            });
            this.props.callback("closeItem");
            break;
          case 200:
            //console.log("modified");
            this.setState((prevState, props) => ({
              shelf: emptyShelf,
              openSnack: true,
              snack: appcopy["shelf"]["snack"]["edited"]
            }));
            this.props.callback("closeItem");
            break;
          case 208: // Already reported https://en.wikipedia.org/wiki/List_of_HTTP_status_codes#4xx_client_errors
            //console.log("name unicity violation");
            this.setState({
              openSnack: true,
              snack: appcopy["shelf"]["snack"]["conflict"]
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
      console.log("Shelf.handleSnack " + action);
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

  // API
  apiLoadShops() {
    apiGetShops({ need: "shops" }).then((res) => {
      if (res.status === 200) {
        this.setState({
          shopoptions: res.shops
        });
      } else {
        this.setState((prevState, props) => ({
          shopoptions: [],
          openSnack: true,
          snack: appcopy["generic"]["snack"]["errornetwork"]
        }));
      }
    });
  }
}
