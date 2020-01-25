import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Header from './Header';
import Hero from './Hero';
import Signup from './Signup';
import Signin from './Signin';
import Notfound from './Notfound';
import Home from './Home';
import Create from './Create';
import Profile from './Profile';
import Showquiz from './Showquiz';
import Questionedit from './Questionedit';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      islogged: false
    };
  }

  handleIslogged = value => {
    this.setState({ islogged: value });
  };
  PublicRoutes() {
    return (
      <>
        <Switch>
          <Route exact path="/">
            <Hero />
          </Route>
          <Route exact path="/admins">
            <Header handleIslogged={this.handleIslogged} />
            <Hero />
          </Route>
          <Route exact path="/admins/signup">
            <Header handleIslogged={this.handleIslogged} />
            <Signup />
          </Route>
          <Route exact path="/admins/signin">
            <Header handleIslogged={this.handleIslogged} />
            <Signin handleIslogged={this.handleIslogged} />
          </Route>
          <Route exact>
            <Notfound />
          </Route>
        </Switch>
      </>
    );
  }
  PrivateRoutes() {
    return (
      <>
        <Switch>
          <Route exact path="/admins/:adminname">
            <Header handleIslogged={this.handleIslogged} />
            <Home />
          </Route>
          <Route exact path="/admins/:adminname/quizsets/create">
            <Header handleIslogged={this.handleIslogged} />
            <Create />
          </Route>
          <Route exact path="/admins/:adminname/quizsets/:quizname">
            <Header handleIslogged={this.handleIslogged} />
            <Showquiz />
          </Route>
          <Route
            exact
            path="/admins/:adminname/quizsets/:quizname/:title/:id/edit"
          >
            <Header handleIslogged={this.handleIslogged} />
            <Questionedit />
          </Route>
          <Route exact>
            <Notfound />
          </Route>
        </Switch>
      </>
    );
  }

  render() {
    return (
      <>
        {localStorage.quizAdminToken
          ? this.PrivateRoutes()
          : this.PublicRoutes()}
      </>
    );
  }
}

export default App;
