import React from 'react';
import { Component } from 'react';
import { render } from 'react-dom';

import { BrowserRouter } from 'react-router-dom';
import { Route, Switch, Redirect } from 'react-router-dom';

/* Import Components */
import HelloWorld from './components/HelloWorld';
import login from './components/Login';
import logout from './components/Logout';
import upload from './components/Upload';
import notes from './components/Notes';


class App extends Component {
  render() {
    const Apps = () => (
      <div>
        <Switch>
          <Route exact path='/' component={HelloWorld}/> 
          <Route exact path='/login' component={login}/>
          <Route exact path='/logout' component={logout}/>
          <Route exact path='/uploads' component={upload}/>
          <Route exact path='/notes' component={notes}/>
          <Route exact path='**'>
            <Redirect to="/" />
          </Route>
        </Switch>
      </div>
    )
    return (
    <BrowserRouter>
      <Switch>
        <Apps/>
      </Switch>
    </BrowserRouter>
    );
  }
}


render((
    <App/>
), document.getElementById('App'));
