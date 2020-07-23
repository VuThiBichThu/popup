import React, { Component } from "react";
import "./Popup.css";
import "bootstrap/dist/css/bootstrap.min.css";
import ColorCircle from "./ColorCircle";
import {
  Col,
  Row,
  Button,
  Label,
  Input,
  CustomInput,
} from "reactstrap";
import DateCircle from "./DateCircle";
import Switch from "react-switch";

class Popup extends Component {
  constructor(props) {
    super(props);
    // this.raiseInvoiceClicked = this.raiseInvoiceClicked.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      name: "",
      slogan: "",
      checked: false,
      isAllDay: true,
      days: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      // informations: {
      //   nameTask: "",
      //   sloganText: "",
      //   startDay: "",
      //   // color:"",
      //   finalDay: "",
      //   chooedDays: [],
      // },
      isFinish: false,
    };
  }
  handleChange(checked) {
    this.setState({ checked });
  }

  getName = (name) => {
    this.setState({ name });
  };

  finishCreateTask = () => {
    // your axios call here
    localStorage.setItem("pageData", "Data Retrieved from axios request");
    // route to new page by changing window.location
    window.open("http://localhost:3000/", "_blank"); //to open new page
  };
  // nametask,userid,sologan,startdate,enddate,color,daysofweek
  updateFinishState() {}
  render() {
    //const days = this.state.days;
    const { days } = this.state;
    const {checked}=this.state;
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
          <Row >
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
          {/* <CustomInput type="switch" name="allDay" id="allDay" label="All day" /> */}
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
          {/* <p>
                The switch is <span>{this.state.checked ? "on" : "off"}</span>.
              </p> */}
            
          <div className="list-days">
            {days.map((item,index) => (
              <DateCircle key={index} name={item} checked={checked}></DateCircle>
            ))}
          </div>
          <br></br>
          <Row >
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
          <Button color="primary" onClick={this.finishCreateTask}>
            FINISH
          </Button>{" "}
          {/* <label htmlFor="material-switch">
            <span>Switch with style inspired by Material Design</span>
            <Switch
              checked={this.state.checked}
              onChange={this.handleChange}
              onColor="#86d3ff"
              onHandleColor="#2693e6"
              handleDiameter={15}
              uncheckedIcon={false}
              checkedIcon={false}
              boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
              activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
              height={15}
              width={30}
              className="react-switch"
              id="material-switch"
            />
          </label>
          <p>The switch is <span>{this.state.checked ? 'on' : 'off'}</span>.</p> */}
        </div>
      </div>
    );
  }
}

export default Popup;
