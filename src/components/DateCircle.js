import React, { Component } from "react";
import "./DateCircle.css";
import styled from "styled-components";
import "bootstrap/dist/css/bootstrap.min.css";

import { Button } from "reactstrap";
class DateCircle extends Component {
  render() {
    const { name, checked, isChecked, onClick} = this.props;
    let className = "circle";
    if(isChecked) {
      className += ' checked';
    }
    return (
      <div className="day">
        <DayPick className={className} outline color="warning" isAllDay={checked} onClick={onClick}>
          {name}
        </DayPick>{" "}
      </div>
    );
  }
}
const DayPick = styled(Button)`
  ${({ isAllDay }) =>
    isAllDay ? "background-color: orange; color: white;" : ""}
`;
export default DateCircle;
