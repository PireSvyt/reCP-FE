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

export default class Snack extends React.Component {
  constructor(props) {
    if (process.env.REACT_APP_DEBUG === "TRUE") {
      console.log("Snack.constructor");
    }
    super(props);
    this.state = {
      snackOpen: this.props.snackOpen
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
        open={this.props.snackOpen}
        autoHideDuration={this.props.snackDuration}
        onClose={this.handleClose}
      >
        <Alert
          onClose={this.handleClose}
          severity={this.props.snackSeverity}
          sx={{ width: "100%" }}
        >
          {this.props.snackMessage}
        </Alert>
      </Snackbar>
    );
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
