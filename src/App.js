import React, { Component } from "react";
import Popup from "./components/Popup";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showPopup: false,
    };
  }

  togglePopup = () => {
    this.setState({
      showPopup: !this.state.showPopup,
    });
  };

  render() {
    return (
      <div className="App">
        <h1> Track habits </h1>
        <button onClick={this.togglePopup}>Create new habit</button>
        {this.state.showPopup ? (
          <Popup text="Create new habit" closePopup={this.togglePopup} />
        ) : null}
      </div>
    );
  }
}
export default App;
