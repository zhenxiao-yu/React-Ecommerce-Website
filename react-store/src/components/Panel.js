import React from "react";
import { render } from "react-dom";

class Panel extends React.Component {
  state = {
    //close on default
    active: false,
  };

  open = () => {
    this.setState({
      //activate panel
      active: true,
    });
  };

  close = () => {
    this.setState({
      //deactive panel
      active: false,
    });
  };

  render() {
    const _class = {
      //render panel item according to state
      true: "panel-wrapper active",
      false: "panel-wrapper",
    };
    return (
      <div className={_class[this.state.active]}>
        {/*close panel when the overlay is clicked*/}
        <div className="over-layer" onClick={this.close}></div>
        <div className="panel">
          <div className="head">
            {/*close panel when "X" is clicked*/}
            <span className="close" onClick={this.close}>
              ×
            </span>
            <p className="has-text-centered">Children Component</p>
          </div>
        </div>
      </div>
    );
  }
}

const _div = document.createElement("div");
document.body.appendChild(_div);

//return component after loading
const _panel = render(<Panel />, _div);
console.log(_panel);
export default _panel;
