import React, { Component } from "react";
import "./ChildPopup.css";
import "bootstrap/dist/css/bootstrap.min.css";

import logo1 from './yes-border.jpg';
import logo2 from './no-border.jpg';
import { Col, Row, Button, Label, Input } from "reactstrap";

// import Switch from "react-switch";
// import axios from "axios";
import { OverflowDetector } from "react-overflow";
// import moment from "moment";
class ChildPopup extends Component {
  constructor(props) {
    super(props);
    this.state = {
    
    };
  }

  // get data
  getName = (nametask) => {
    console.log(nametask);
    nametask.trim() !== ""
      ? this.setState({ nametask, isValidName: true })
      : this.setState({ isValidName: false });
  };
  getSlogan = (slogan) => {
    if (slogan.trim() !== "") {
      this.setState({ slogan, isValidSlogan: true });
    }
  };
  // getStartDate = (startdate) => {
  //   const startDate = moment(startdate)._i;
  //   console.log("star" + startDate);
  //   this.setState({ startdate });
  // };
  // getEndDate = (enddate) => {
  //   const endDate = moment(enddate)._i;
  //   const startDate = moment(this.state.startdate)._i;
  //   moment(endDate).isAfter(moment(startDate))
  //     ? this.setState({ enddate, isValidEndDate: true })
  //     : this.setState({ isValidEndDate: false });
  // };
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
      isValidListDays: !this.state.checked,
    }));
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
    });
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
    console.log(this.state.isValidEndDate);
    console.log(this.state.isValidListDays);
    if (
      !this.state.isValidName ||
      !this.state.isValidSlogan ||
      !this.state.isValidListDays
    ) {
      alert("Something went wrong!");
      console.log("Sorry!");
    } else {
      // axios
      //   .post(`localhost/api/v1/tasks`, { information })
      //   .then((res) => {
      //     console.log(res);
      //     console.log(res.data);
      //   })
      //   .catch((error) => {
      //     console.log(error);
      //   });
    }
  };

  render() {
     
  
    return (
      <div className="childpopup">
        <OverflowDetector
          className="childpopup_inner "
          style={{ width: "600px", height: "400px" }}
        >
        <br></br>
        <label>Today</label>
          <h4> {this.props.text} </h4>
        
          <br></br>
          <Row>
    <Col md={6}>
      {/* <Image src="holder.js/171x180" /> */}
      <img src={logo1} alt="logo1" className=" size button1" />
    </Col>
   
    <Col md={6}>
    <img src={logo2} alt="logo2" className="size button2" />
      {/* <Image src="holder.js/171x180" /> */}
    </Col>
  </Row>
    
     
          <br></br>
         
          <Label>Add note </Label>
          <Input
            type="textarea"
            id="sloganText"
            name="sologan"
            onChange={(event) => this.getSlogan(event.target.value)}
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

export default ChildPopup;
