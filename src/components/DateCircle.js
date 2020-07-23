import React, {Component} from "react";
import "./DateCircle.css";
import styled from "styled-components";
import "bootstrap/dist/css/bootstrap.min.css";

import { Button } from "reactstrap";
// type Props = {
//   name: String,
//   isAllDay: Boolean
// }
class DateCircle extends Component{
    render(){
        const {name, checked } = this.props;
          return (
            <div className='day'>
              <DayPick className="circle" outline color="warning" isAllDay={checked}>{name}</DayPick>{' '}
            </div>
          );
        }
      }
const DayPick = styled(Button)`
  ${({isAllDay}) => isAllDay ? "background-color: orange; color: white;": ''}
`
export default DateCircle;

