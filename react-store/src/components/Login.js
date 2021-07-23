import React from "react";

//login component
class Login extends React.Component {
  render() {
    return (
      <form className="login-wrapper">
        <div>
          {/*email label*/}
          <label>Email</label> 
          {/*email input field*/}
          <div>
            <input type="text" placeholder="Email" />
          </div>
        </div>

        <div>
          {/*password label*/}
          <label>Password</label> 
          {/*password input field*/}
          <div>
            <input type="text" placeholder="Password" />
          </div>
        </div>
        {/*Sumbit button*/}
        <div>
            <button>Submit</button>
        </div>
      </form>
    ); //JSX Babel emmet
  }
}

//export Login component
export default Login;
