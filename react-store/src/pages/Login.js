
import React from 'react';

class Login extends React.Component {

  handleSubmit = event => {
    // 1. 阻止默认事件行为
    event.preventDefault();

    // 2. 获取表单数据

    // 3. 处理登录逻辑

    // 4. 跳转到首页视图
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