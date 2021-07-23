import React from "react";

class Header extends React.Component {
  renderLink() {
      const nickname = this.props.nickname;
      
      if(nickname) {
          return (
            <span className="nickname">{this.props.nickname}</span>
          )
      }
  }
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
            <span className="nickname">{this.props.nickname}</span>
          </div>
        </div>
      </div>
    );
  }
}

export default Header;
