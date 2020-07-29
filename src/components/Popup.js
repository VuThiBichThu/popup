import React, { Component } from "react";
import "./Popup.css";
import "bootstrap/dist/css/bootstrap.min.css";
import ColorCircle from "./ColorCircle";
import { Col, Row, Button, Label, Input, CustomInput } from "reactstrap";
import DateCircle from "./DateCircle";
import Switch from "react-switch";
import axios from "axios";
import { OverflowDetector } from "react-overflow";
class Popup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nametask: "",
      isValidName: false,
      slogan: "",
      isValidSlogan: false,
      color: "#F17013",
      startdate: "",
      enddate: "",
      checked: false, // isAllDay: false,
      isFinish: false,
      // nametask,sologan,startdate,enddate,color,daysofweek - backend
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
    };
  }

  // get data
  getName = (nametask) => {
    if (nametask.trim() !== "") {
      this.setState({ nametask, isValidName: true });
    }
  };
  getSlogan = (slogan) => {
    if (slogan.trim() !== "") this.setState({ slogan, isValidSlogan: true });
  };
  getStartDate = (startdate) => {
    this.setState({ startdate });
  };
  getEndDate = (enddate) => {
    this.setState({ enddate });
  };
  getColor = (color) => {
    this.setState({ color });
  };

  //
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
      isValidListDays: !preState.checked,
    }));
  };

  handleSubmit = (event) => {
    event.preventDefault();
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
    console.log(information);
    console.log(this.state.isValidName);
    console.log(this.state.isValidSlogan);
    console.log(this.state.isValidListDays);
    if (
      this.state.isValidName === false ||
      this.state.isValidSlogan === false ||
      this.state.isValidListDays === false
    ) {
      console.log("Sorry!");
    } else {
      axios
        .post(`localhost/api/v1/tasks`, { information })
        .then((res) => {
          console.log(res);
          console.log(res.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
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

    for (let i = 0; i < updateListDays.length; i++) {
      if (updateListDays[i].isChecked === true) {
        isValidListDays = true;

        break;
      }
    }

    this.setState({
      listDays: updateListDays,
      checked: isAllDay,
      isValidListDays: isValidListDays,
    });
  };

  render() {
    const { listDays } = this.state;
    const { checked } = this.state;
    return (
      <div className="popup">
        <OverflowDetector
          className="popup_inner "
          style={{ width: "500px", height: "650px" }}
        >
          <h2> {this.props.text} </h2>
          <Label>Name</Label>
          <Input
            id="taskName"
            name="nametask"
            onChange={(event) => this.getName(event.target.value)}
          />
          <Label>Slogan</Label>
          <Input
            type="textarea"
            id="sloganText"
            name="sologan"
            onChange={(event) => this.getSlogan(event.target.value)}
          />
          <Row>
            <Col md={10}>
              <Label>Start Day</Label>
              <Input
                type="date"
                id="startDay"
                name="startdate"
                onChange={(event) => this.getStartDate(event.target.value)}
              />
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
          <Label>
            <b>Repeat</b>
          </Label>{" "}
          <br></br>
          <Switch
            checked={this.state.checked}
            onChange={this.handleChange}
            onColor="#86d3ff"
            onHandleColor="#2693e6"
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
          <br></br>
          <Label>
            <b>End</b>
          </Label>
          <Input
            type="date"
            id="finalDay"
            name="enddate"
            onChange={(event) => this.getEndDate(event.target.value)}
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
            FINISH
          </Button>{" "}
        </OverflowDetector>
      </div>
    );
  }
}

export default Popup;
