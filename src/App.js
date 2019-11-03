import React, { Component } from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';

import Movies from './components/Movies';
import Rentals from './components/Rentals';
import Customers from './components/Customers';
import NotFound from './components/NotFound';
import NavBar from './components/NavBar';
import MovieForm from './components/MovieForm';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';

import 'bootstrap/dist/css/bootstrap.css';
import 'font-awesome/css/font-awesome.css';





class App extends Component {

  render() {
    return (
      <React.Fragment>
        <NavBar />
        <main className="container">
          <Switch>
            <Route path="/movies/:id" component={MovieForm}/>
            <Route path="/movies" component={Movies} />
            <Route path="/customers" component={Customers} />
            <Route path="/rentals" component={Rentals} />
            <Route path="/login" component={LoginForm} />
            <Route path="/register" component={RegisterForm}/>
            <Route path="/not-found" component={NotFound} />
            <Redirect from="/" exact to="/movies" />
            <Redirect to="/not-found" />
          </Switch>
        </main>
      </React.Fragment>
    )
  }


}

export default App;
