import React, { Component } from "react";
import "./CreatePopup.css";
import "bootstrap/dist/css/bootstrap.min.css";
import DateCircle from "./../DateCircle/DateCircle";
import ColorCircle from "./../ColorCircle/ColorCircle";
import { Col, Row, Button, Label, Input } from "reactstrap";

import Switch from "react-switch";
import axios from "axios";
import { OverflowDetector } from "react-overflow";
import moment from "moment";
class CreatePopup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nametask: "",
      isValidName: false,
      slogan: "",
      color: "#F17013",
      startdate: "",
      isValidStartDate: false,
      enddate: "",
      isValidEndDate: false,
      checked: false,

      listDays: [
        {
          day: "Mon",
          isChecked: false,
        },
        {
          day: "Tue",
          isChecked: false,
        },
        {
          day: "Wed",
          isChecked: false,
        },
        {
          day: "Thu",
          isChecked: false,
        },
        {
          day: "Fri",
          isChecked: false,
        },
        {
          day: "Sat",
          isChecked: false,
        },
        {
          day: "Sun",
          isChecked: false,
        },
      ],
      isValidListDays: false,
      isDone: false,

      isTouchedName: false,
      isTouchedDays: false,
      isTouchedStartD: false,
      isTouchedEndD: false,
    };
  }
  checkFinish = (isValidN, isValidD, isValidE) => {
    let isFinish;
    isFinish = isValidN && isValidD && isValidE;
 
    this.setState({ isDone: isFinish });
  };

  getName = (nametask) => {
    let isValidN;
    if (nametask.trim() !== "") {
      isValidN = true;
      this.setState({ nametask, isValidName: isValidN });
    } else {
      isValidN = false;
      this.setState({ isValidName: isValidN });
    }
    this.setState({ isTouchedName: true });
    this.checkFinish(
      isValidN,
      this.state.isValidListDays,
      this.state.isValidEndDate
    );
  };
  getSlogan = (slogan) => {
    if (slogan.trim() !== "") {
      this.setState({ slogan });
    }
  };

  getStartDate = (startdate) => {
    let isValid;
    const startD = moment(startdate).valueOf();
    const endD = moment(this.state.enddate).valueOf();
    const startDate = moment(startdate)._i;
    if (endD) {
      isValid = endD - startD > 0;
      if (isValid && startD) {
        this.setState({ startdate: startDate, isValidStartDate: true });
      } else {
        this.setState({ isValidStartDate: false });
      }
    } else {
      startDate !== "" && startD
        ? this.setState({ startdate: startDate, isValidStartDate: true })
        : this.setState({ isValidStartDate: false });
    }
  };

  getEndDate = (enddate) => {
    const endDate = moment(enddate)._i;
    const startDate = moment(this.state.startdate)._i;
    let isValisE;
    if (moment(endDate).isAfter(moment(startDate))) {
      isValisE = true;
      this.setState({ enddate: endDate, isValidEndDate: isValisE });
    } else {
      isValisE = false;
      this.setState({ isValidEndDate: isValisE });
    }
    this.setState({ isTouchedEndD: true });
    this.checkFinish(
      this.state.isValidName,
      this.state.isValidListDays,
      isValisE
    );
  };

  getColor = (color) => {
    this.setState({ color });
  };

  handleStartDateFeedback = () => {
    this.setState({ isTouchedStartD: true });
  };

  handleChangeColor = (color) => {
    this.setState({ color: color.hex });
  };

  handleChange = () => {
    const { checked, listDays } = this.state;
    const updateListDays = listDays.map((item) => ({
      ...item,
      isChecked: !checked,
    }));

    this.setState((preState) => ({
      checked: !preState.checked,
      listDays: updateListDays,
      isValidListDays: !preState.checked, //
      isTouchedDays: true,
    }));
    this.checkFinish(
      this.state.isValidName,
      !checked,
      this.state.isValidEndDate
    );
  };

  changeStatusDay = (index) => {
    let isValidListDays = this.state.isValidListDays;
    const updateListDay = { ...this.state.listDays[index] };
    updateListDay.isChecked = !this.state.listDays[index].isChecked;
    const updateListDays = [...this.state.listDays];
    updateListDays[index] = updateListDay;

    let isAllDay = true;
    const checkIsAllDay = updateListDays.filter(
      (item) => item.isChecked === false
    );
    if (checkIsAllDay.length) {
      isAllDay = false;
    }
    let count = 0;
    for (let i = 0; i < updateListDays.length; i++) {
      if (updateListDays[i].isChecked === true) {
        count++;
      }
    }
    count !== 0 ? (isValidListDays = true) : (isValidListDays = false);

    this.setState({
      listDays: updateListDays,
      checked: isAllDay,
      isValidListDays: isValidListDays,
      isTouchedDays: true,
    });
    this.checkFinish(
      this.state.isValidName,
      isValidListDays,
      this.state.isValidEndDate
    );
  };

  handleSubmit = (event) => {
    event.preventDefault();
    this.setState({
      isTouchedName: true,
      isTouchedDays: true,
      isTouchedStartD: true,
      isTouchedEndD: true,
    });
    const updateListDays = [...this.state.listDays];
    const sunDay = updateListDays.pop();
    updateListDays.splice(0, 0, sunDay);
    let daysofweek = 0;
    updateListDays.map((item, index) => {
      if (item.isChecked) daysofweek += Math.pow(2, index);
      return 1;
    });

    const information = {
      nametask: this.state.nametask,
      slogan: this.state.slogan,
      color: this.state.color,
      startdate: this.state.startdate,
      enddate: this.state.enddate,
      daysofweek: daysofweek,
    };

    if (
      this.state.isValidName &&
      this.state.isValidEndDate &&
      this.state.isValidListDays
    ) {
      console.log(information);
      axios
        .post(`localhost/api/v1/tasks`, { information })
        .then((res) => {
          console.log(res);
          console.log(res.data);
          this.props.closePopup();
        })
        .catch((error) => {
          console.log(error);
        });

       
    } 
    // else {
    //   console.log("Something went wrong!");
    // }
  };

  render() {
    const {
      listDays,
      checked,
      isValidName,
      isValidListDays,
      isValidStartDate,
      isValidEndDate,
      isTouchedName,
      isTouchedDays,
      isTouchedStartD,
      isTouchedEndD,
    } = this.state;

    let validationErrorName = null;
    if (!isValidName && isTouchedName) {
      validationErrorName = (
        <label className="warning">Please enter habit name!</label>
      );
    }
    let validationErrorDays = null;
    if (!isValidListDays && isTouchedDays) {
      validationErrorDays = (
        <label className="warning">Please choose 1 day at least!</label>
      );
    }

    let validationErrorStartDate = null;
    if (!isValidStartDate && isTouchedStartD) {
      validationErrorStartDate = (
        <label className="warning">Please enter a valid start date!</label>
      );
    }

    let validationErrorEndDate = null;
    if (!isValidEndDate && isTouchedEndD) {
      validationErrorEndDate = (
        <label className="warning">
          Please enter end date after start date!
        </label>
      );
    }

    return (
      <div className="popup">
        <OverflowDetector
          className="popup_inner "
          style={{ width: "500px", height: "640px", position: "absolute" }}
        >
          <br></br>
          <h2> {this.props.text} </h2>
          <Label>
            <b>Name</b>
          </Label>
          <Input
            id="namestask"
            name="nametask"
            onChange={(event) => this.getName(event.target.value)}
            autoFocus
          />{" "}
          {validationErrorName}
          <br></br>
          <Label>
            <b>Slogan</b>
          </Label>
          <Input
            type="textarea"
            id="sloganText"
            name="sologan"
            onChange={(event) => this.getSlogan(event.target.value)}
          />
          <Row>
            <Col md={10}>
              <Label>
                <b>Start Day</b>
              </Label>
              <Input
                type="date"
                name="startdate"
                onChange={(event) => this.getStartDate(event.target.value)}
                onClick={this.handleStartDateFeedback}
              ></Input>
              {validationErrorStartDate}
            </Col>
            <Col md={2}>
              <Label>Color</Label>
              <ColorCircle
                name="color"
                onHandleColor={this.handleChangeColor}
                color={this.state.color}
              />
            </Col>
          </Row>
          <Row>
            <Col md={2}>
              <Label>
                <b>Repeat</b>
              </Label>{" "}
            </Col>
            <Col>
              <Switch
                checked={this.state.checked}
                onChange={this.handleChange}
                onColor="#ffa500"
                onHandleColor="#ffffff"
                handleDiameter={15}
                uncheckedIcon={false}
                checkedIcon={false}
                boxShadow="0px 1px 1px rgba(0, 0, 0, 0.2)"
                activeBoxShadow="0px 0px 1px 5px rgba(0, 0, 0, 0.2)"
                height={15}
                width={30}
                className="react-switch"
                id="material-switch"
                name="daysofweek"
              />{" "}
              <Label>All day</Label>
            </Col>
          </Row>
          {validationErrorDays}
          <div className="list-days">
            {listDays.map((item, index) => (
              <DateCircle
                key={index}
                name={item.day}
                checked={checked}
                isChecked={item.isChecked}
                onClick={() => this.changeStatusDay(index)}
              ></DateCircle>
            ))}
          </div>
          <Label>
            <b>End</b>
          </Label>
          <Input
            type="date"
            name="enddate"
            onChange={(event) => this.getEndDate(event.target.value)}
            disabled={!isValidStartDate && !isTouchedEndD}
          />
          {validationErrorEndDate}
          <br></br>
          <Button color="secondary" onClick={this.props.closePopup}>
            CANCEL
          </Button>{" "}
          <Button
            type="submit"
            color="primary"
            onClick={(event) => this.handleSubmit(event)}
          >
            FINISH
          </Button>{" "}
        </OverflowDetector>
      </div>
    );
  }
}

export default CreatePopup;
