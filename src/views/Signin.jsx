import React from 'react';
import { NavLink, withRouter } from 'react-router-dom';

class Signin extends React.Component {
  constructor() {
    super();
    this.state = {
      adminEmail: '',
      adminPassword: ''
    };
  }

  handleSubmit = e => {
    e.preventDefault();
    fetch('http://localhost:3001/api/v1/admins/signin', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        adminEmail: this.state.adminEmail,
        adminPassword: this.state.adminPassword
      })
    })
      .then(res => res.json())
      .then(data => {
        console.log(data);
        if (data.email) {
          alert(data.message);
        } else if (!data.success) {
          alert(data.message);
        } else if (data.success) {
          alert('successfully loggedin');
          localStorage.setItem('quizAdminToken', data.token);
          localStorage.setItem('quizAdminName', data.adminName);
          this.props.handleIslogged(true);
          this.props.history.push(`/admins/${localStorage.quizAdminName}`);
        }
      });
  };

  handleChange = event => {
    let { name, value } = event.target;
    this.setState({ [name]: value });
  };
  render() {
    return (
      <div className="sign-wrapper">
        <div className="sign-section">
          <form className="sign-form">
            <label className="sign-label" htmlFor="">
              Enter a valid email address
            </label>
            <input
              className="sign-input"
              type="email"
              name="adminEmail"
              placeholder="example@gmail.com"
              value={this.state.adminEmail}
              onChange={this.handleChange}
            />
            <label className="sign-label" htmlFor="">
              Password
            </label>
            <input
              className="sign-input"
              type="password"
              name="adminPassword"
              placeholder="e.g: 123@qwerty"
              value={this.state.adminPassword}
              onChange={this.handleChange}
            />
            <input
              className="sign-btn nav-item-btn"
              type="submit"
              value="SIGN IN"
              onClick={this.handleSubmit}
            />
            <div className="sign-footer">
              <p className="sign-footer-text">Don't have an account?</p>
              <NavLink className="sign-footer-link" to="/admins/signup">
                Sign up
              </NavLink>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default withRouter(Signin);
