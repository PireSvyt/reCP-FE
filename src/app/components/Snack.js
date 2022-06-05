import * as React from "react";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

/*
SEVERITY
error
warning
info
success
*/

function getDymmySnack() {
  return {
    duration: 1000,
    message: "DUMMY SNACK MESSAGE",
    severity: "warning",
    FR: "DUMMY SNACK FR",
    EN: "DUMMY SNACK EN"
  };
}

export default class Snack extends React.Component {
  constructor(props) {
    if (process.env.REACT_APP_DEBUG === "TRUE") {
      console.log("Snack.constructor");
    }
    super(props);
    if (process.env.REACT_APP_DEBUG === "TRUE") {
      console.log("Snack language = " + this.props.language);
    }
    this.state = {
      snack: getDymmySnack()
    };
    // Handles
    this.handleClose = this.handleClose.bind(this);
  }
  render() {
    if (process.env.REACT_APP_DEBUG === "TRUE") {
      console.log("Snack.render");
    }
    return (
      <Snackbar
        open={this.props.open}
        autoHideDuration={this.state.snack.duration}
        onClose={this.handleClose}
      >
        <Alert
          onClose={this.handleClose}
          severity={this.state.snack.severity}
          sx={{ width: "100%" }}
        >
          {this.state.snack.message}
        </Alert>
      </Snackbar>
    );
  }
  componentDidUpdate(prevState) {
    if (process.env.REACT_APP_DEBUG === "TRUE") {
      console.log("Snack.componentDidUpdate");
      console.log("Snack.state");
      console.log(this.state);
    }
    if (
      prevState.snackOpen !== this.props.snackOpen ||
      prevState.snack !== this.props.snack
    ) {
      // Add optional inputs
      var newSnack = this.props.snack;
      if (newSnack !== undefined) {
        if (newSnack.duration === undefined) {
          newSnack.duration = 3000;
        }
        if (newSnack.severity === undefined) {
          newSnack.severity = "info";
        }
        if (newSnack.message === undefined) {
          newSnack.message = newSnack[this.props.language];
        }
        this.setState((prevState, props) => ({
          snack: newSnack
        }));
      }
    }
  }

  // Handles
  handleClose(event, reason) {
    if (process.env.REACT_APP_DEBUG === "TRUE") {
      console.log("Snack.handleClose");
    }
    if (reason !== "clickaway") {
      this.props.onclose();
    }
  }
}
