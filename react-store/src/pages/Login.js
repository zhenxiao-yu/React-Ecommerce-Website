
import React from 'react';

class Login extends React.Component {

   // References
   emailRef = React.createRef();
   passwordRef = React.createRef();

  handleSubmit = event => {
    // 1. prevent default event (resubmit disabled)
    event.preventDefault();

    // 2. retrive form data
    const formData = {
      email: this.emailRef.current.value,
      password: this.passwordRef.current.value
    };
    console.log(formData);
    // 3. execute login functions

    // 4. reroute to index page
    this.props.history.push('/');
  };

  render() {
    return (
      <div className="login-wrapper">
        <form className="box login-box" onSubmit={this.handleSubmit}>
          <div className="field">
            <label className="label">Email</label>
            <div className="control">
              <input className="input" type="text" placeholder="Email" />
            </div>
          </div>
          <div className="field">
            <label className="label">Password</label>
            <div className="control">
              <input className="input" type="password" placeholder="Password" />
            </div>
          </div>
          <div className="control">
            <button className="button is-fullwidth is-primary">Login</button>
          </div>
        </form>
      </div>
    );
    // JSX  Babel  Emmet
  }
}

export default Login;