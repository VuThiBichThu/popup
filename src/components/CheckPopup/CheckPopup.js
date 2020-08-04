import React, { Component } from "react";
import "./CheckPopup.css";
import "bootstrap/dist/css/bootstrap.min.css";
import logo1 from "./yes-border.jpg";
import logo2 from "./no-border.jpg";
import { Col, Row, Button, Label, Input } from "reactstrap";
import axios from "axios";
import { OverflowDetector } from "react-overflow";
// import moment from "moment";

class CheckPopup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isDone: null,
      note: "",
      err: false,
    };
  }
  chooseDoneOption = () => {
    this.setState({
      isDone: true,
      err: false,
    });
  };
  chooseUnDoneOption = () => {
    this.setState({
      isDone: false,
      err: false,
    });
  };
  getNote = (note) => {
    this.setState({ note });
  };

  handleSubmit = (event) => {
    event.preventDefault();

    this.state.isDone === null
      ? this.setState({ err: true })
      : this.setState({ err: false });
    const information = {
      isDone: this.state.isDone,
      note: this.state.note,
    };

    if (this.state.isDone !== null) {
      console.log(information);
      axios
        .post(`localhost/api/v1/records`, { information })
        .then((res) => {
          console.log(res);
          console.log(res.data);
          this.props.closePopup();
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  render() {
    const { err } = this.state;
    let validationError = null;
    if (err) {
      validationError = (
        <label className="warning">Please choose a option!</label>
      );
    }
    let linkDoneStyle;
    let linkUnDoneStyle;
    if (this.state.isDone !== null) {
      if (this.state.isDone) {
        linkDoneStyle = { border: "2px solid #4CAF50" };
      } else {
        linkUnDoneStyle = { border: "2px solid #e91313" };
      }
    }

    return (
      <div className="checkpopup">
        <OverflowDetector
          className="checkpopup_inner "
          style={{ width: "600px", height: "450px" }}
        >
          <br></br>
          <div className="center">
            <label>Today</label>
            <h5> {this.props.text} </h5>
          </div>
          <Row>
            <Col md={6}>
              <img
                src={logo1}
                alt="logo1"
                className=" img button1"
                style={linkDoneStyle}
                onClick={() => {
                  this.chooseDoneOption();
                }}
              />
            </Col>
            <Col md={6}>
              <img
                src={logo2}
                alt="logo2"
                className="img button2"
                style={linkUnDoneStyle}
                onClick={() => {
                  this.chooseUnDoneOption();
                }}
              />
            </Col>
          </Row>
          {validationError}
          <br></br>
          <Label>
            <b>Add note</b>
          </Label>
          <Input
            type="textarea"
            id="sloganText"
            name="sologan"
            style={{ height: 100 }}
            onChange={(event) => this.getNote(event.target.value)}
          />
          <br></br>
          <Button color="secondary" onClick={this.props.closePopup}>
            CANCEL
          </Button>{" "}
          <Button
            type="submit"
            color="primary"
            onClick={(event) => this.handleSubmit(event)}
          >
            SAVE
          </Button>{" "}
        </OverflowDetector>
      </div>
    );
  }
}

export default CheckPopup;
