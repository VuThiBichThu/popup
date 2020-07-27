import React, { Component } from "react";
import "./Popup.css";
import "bootstrap/dist/css/bootstrap.min.css";
import ColorCircle from "./ColorCircle";
import { Col, Row, Button, Label, Input, CustomInput } from "reactstrap";
import DateCircle from "./DateCircle";
import Switch from "react-switch";
import axios from "axios";

class Popup extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      name: "",
      slogan: "",
      color: "",
      startday: "",
      endday: "",
      checked: false, // isAllDay: false,

      isFinish: false,

      days: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      // nametask,userid,sologan,startdate,enddate,color,daysofweek - backend
    };
  }
  handleChange = (checked) => {
    this.setState({ checked });
  };

  getName = (name) => {
    this.setState({ name });
  };

  handleSubmit = (event) => {
    event.preventDefault();

    const user = {
      name: this.state.name,
    };

    axios.post(``, { user }).then((res) => {
      console.log(res);
      console.log(res.data);
    });
  };

  render() {
    const { days } = this.state;
    const { checked } = this.state;
    return (
      <div className="popup">
        <div className="popup_inner">
          <h2> {this.props.text} </h2>
          <Label>Name</Label>
          <Input
            id="taskName"
            name="nametask"
            onChange={(event) => this.getName(event.target.value)}
          />
          <Label>Slogan</Label>
          <Input type="textarea" id="sloganText" name="sologan" />
          <Row>
            <Col md={10}>
              <Label>Start Day</Label>
              <Input type="date" id="startDay" name="startdate" />
            </Col>
            <Col md={2}>
              <Label>Color</Label>
              <ColorCircle name="color" />
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
            {days.map((item, index) => (
              <DateCircle
                key={index}
                name={item}
                checked={checked}
              ></DateCircle>
            ))}
          </div>
          <br></br>
          <Row>
            <Col md={4}>
              <Label>
                <b>End</b>
              </Label>
            </Col>
            <Col md={4}>
              <CustomInput type="radio" name="dayRadio" id="onDay" label="On" />
            </Col>
            <Col md={4}>
              <CustomInput
                type="radio"
                name="dayRadio"
                id="afterDay"
                label="After"
              />
            </Col>
          </Row>
          <Input type="date" id="finalDay" name="enddate" />
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
        </div>
      </div>
    );
  }
}

export default Popup;
