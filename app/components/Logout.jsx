import  React from'react';
import { Component } from 'react';
import { Redirect,browserHistory } from 'react-router-dom';

class App extends Component {
    constructor(props) {
    super(props);
  }
  render(){
    sessionStorage.clear();
    return(<div><Redirect to='/login' /></div>)
  }
}

export default App;