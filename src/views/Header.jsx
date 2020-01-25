import React from 'react';
import { NavLink } from 'react-router-dom';

class Header extends React.Component {
  handleLogout = () => {
    localStorage.removeItem('quizAdminToken');
    localStorage.removeItem('quizAdminName');
    this.props.handleIslogged(false);
  };

  PrivateNav = () => {
    return (
      <>
        <NavLink className="logo" to={`/admins/${localStorage.quizAdminName}`}>
          Quiz
        </NavLink>
        <div>
          <NavLink
            className="nav-item"
            to={`/admins/${localStorage.quizAdminName}/quizsets/create`}
          >
            Create
          </NavLink>
          <NavLink
            onClick={this.handleLogout}
            className="nav-item nav-item-btn"
            to="/"
          >
            LOGOUT
          </NavLink>
        </div>
      </>
    );
  };

  PublicNav = () => {
    return (
      <>
        <NavLink className="logo" to="/admins">
          Quiz
        </NavLink>
        <div>
          <NavLink className="nav-item" to="/admins/signin">
            SIGN IN
          </NavLink>
          <NavLink className="nav-item nav-item-btn" to="/admins/signup">
            SIGN UP
          </NavLink>
        </div>
      </>
    );
  };
  render() {
    return (
      <>
        <div className="header-wrapper">
          <nav className="header-nav">
            {localStorage.quizAdminToken ? this.PrivateNav() : this.PublicNav()}
          </nav>
        </div>
      </>
    );
  }
}

export default Header;
