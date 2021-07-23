import React from "react";

class Header extends React.Component {
  render() {
    return (
      <div className="header">
          {/*Navigation Menu*/}
        <div className="grid">
            {/*Home Button Link*/}
          <div className="start">
            <a href="/">Home</a>
          </div>
          {/*Login and Register*/}
          <div className="end">
            <a href="/">Login</a>
            <a href="/">Register</a>
          </div>
        </div>
      </div>
    );
  }
}

export default Header;
