/**
 * Panel Components requirements:
 1. Render only once, multi-page usesability
 2. Functions as a container for child components
    (1) child components can pass data
    (2) child components can close parent components
    (3) child components can communicate with Products components 
 */

import React from "react";
import { render } from "react-dom";

class Panel extends React.Component {
  state = {
    active: false,
    component: null,
    callback: () => {},
  };

  open = (
    options = {
      props: {},
      component: null,
      callback: () => {},
    }
  ) => {
    const { props, component, callback } = options;
    const _key = new Date().getTime();
    const _component = React.createElement(component, {
      ...props,
      close: this.close,
      key: _key,
    });
    this.setState({
      active: true,
      component: _component,
      callback: callback,
    });
  };

  close = (data) => {
    this.setState({
      active: false,
    });
    this.state.callback(data);
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
        <div
          className="over-layer"
          onClick={() => {
            this.close();
          }}
        ></div>
        <div className="panel">
          <div className="head">
            {/*close panel when "x" is clicked*/}
            <span
              className="close"
              onClick={() => {
                this.close();
              }}
            >
              ×
            </span>
            {this.state.component}
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
