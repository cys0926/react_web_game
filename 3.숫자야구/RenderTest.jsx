import React, { Component, PureComponent } from "react";

class Test extends PureComponent {
  state = {
    counter: 0,
  };

  // shouldComponentUpdate(nextProps, nextState, nextContext) {
  //   if (this.state.counter !== nextState.counter) {
  //     return true;
  //   }
  //   return false;
  // }

  onClick = () => {
    this.setState({});
  };

  render() {
    console.log("랜더링", this.state);
    return (
      <div>
        <button onClick={this.onClick}>클릭</button>
      </div>
    );
  }
}

export default Test;
