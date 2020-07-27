import React, { Component } from "react";
import "./Popup.css";
import "bootstrap/dist/css/bootstrap.min.css";

import { Col, Row, Label, CustomInput } from "reactstrap";

class Popup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedOption: "onDay",
    };
  }
  handleOptionChange = (changeEvent) => {
    this.setState({
      selectedOption: changeEvent.target.value,
    });
  };
  render() {
    return (
      <div className="popup">
        <div className="popup_inner">
          <Row>
            <Col md={4}>
              <Label>
                <b>End</b>
              </Label>
            </Col>
            <Col md={4}>
              <CustomInput
                type="radio"
                name="dayRadio"
                value="onDay"
                label="On"
                checked={this.state.selectedOption === "onDay"}
                onChange={this.handleOptionChange}
              />
            </Col>
            <Col md={4}>
              <CustomInput
                type="radio"
                name="dayRadio"
                value="afterDay"
                label="After"
                checked={this.state.selectedOption === "afterDay"}
                onChange={this.handleOptionChange}
              />
            </Col>
          </Row>
        </div>
      </div>
    );
  }
}

export default Popup;
