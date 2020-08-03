import React, { Component } from "react";
import Popup from "./components/Popup";
import ChildPopup from "./components/ChildPopup/ChildPopup";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import moment from "moment";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showPopup: false,
      showChildPopup:false
    };
  }

  togglePopup = () => {
    this.setState({
      showPopup: !this.state.showPopup,
    });
  };

  toggleChildPopup = () => {
    this.setState({
      showChildPopup: !this.state.showChildPopup,
    });
  };
  render() {
    const today = moment().format("dddd, MMMM D ");
    console.log(today);
    return (
      <div >
        <h1> Track habits </h1>
        <button onClick={this.togglePopup}>Create new habit</button>
        {this.state.showPopup ? (
          <Popup text="Create new habit" closePopup={this.togglePopup} />
        ) : null}
        <button onClick={this.toggleChildPopup}>Check a habit</button>
        {this.state.showChildPopup ? (
          <ChildPopup text={today} closePopup={this.toggleChildPopup} />
        ) : null}
      </div>
    );
  }
}
export default App;
