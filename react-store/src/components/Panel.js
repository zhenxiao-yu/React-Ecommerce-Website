import React from "react";
import { render } from "react-dom";

class Panel extends React.Component {
  /**
 * Panel component requirements:
 1. Rendered only once + reusable
 2. Act as an Container component
    (1)、child component can be rendered within
    (2)、Child components can close parent compoent (cancel button)
    (3)、Child compoent can communicate with other components
 */

  //descalre state of the the panel component
  state = {
    active: false,
    component: null,
    callback: () => {},
  };

  //open panel method 
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
      //return user callback data
      callback: callback,
    });
  };

  //close panel method
  close = (data) => {
    this.setState({
      active: false,
    });
    this.state.callback(data);
  };

  //JFX
  render() {
    const _class = {
      true: "panel-wrapper active",
      false: "panel-wrapper",
    };
    return (
      <div className={_class[this.state.active]}>
        {/* overlay rest of the page when panel is open*/}
        <div
          className="over-layer"
          onClick={() => {
            //close panel when user clicks on overlay
            this.close();
          }}
        ></div>
        <div className="panel">
          <div className="head">
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

//rednder the child component into the panel component 
const _div = document.createElement("div");
document.body.appendChild(_div);


const _panel = render(<Panel />, _div);
export default _panel;
