import React, { Component } from "react";
import CreatePopup from "./components/CreatePopup/CreatePopup";
import CheckPopup from "./components/CheckPopup/CheckPopup";
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
    // console.log(today);
    return (
      <div >
        <h1> Track habits </h1>
        <button onClick={this.togglePopup}>Create new habit</button>
        {this.state.showPopup ? (
          <CreatePopup text="Create new habit" closePopup={this.togglePopup} />
        ) : null}
        <button onClick={this.toggleChildPopup}>Check a habit</button>
        {this.state.showChildPopup ? (
          <CheckPopup text={today} closePopup={this.toggleChildPopup} />
        ) : null}
      </div>
    );
  }
}
export default App;
