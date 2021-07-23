import React from "react";

//login component
class Login extends React.Component {
  render() {
    return (
      <div className="login-wrapper">
          {/*login form container*/}
        <form className="box login-box">
        
        {/*email label*/}
          <div className="field">
            <label className="label">Email</label>
            <div className="control">
              <input className="input" type="text" placeholder="Email" />
            </div>
          </div>

        {/*password label*/}
          <div className="field">
            <label className="label">Password</label>
            <div className="control">
              <input className="input" type="password" placeholder="Password" />
            </div>
          </div>

        {/*submit button*/}
          <div className="control">
            <button className="button is-fullwidth is-primary">Submit</button>
          </div>
        </form>
      </div>
    ); //JSX Babel emmet
  }
}

//export Login component
export default Login;
