const  React = require('react');
const { Component } = require('react');
const UnorderedList = require('./UnorderedList');

const axios = require('axios');

const http = require('http');

//const list= require('../../list.json');

//const transfer=require('./test.js');

var dat;

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: null,
    };
  }

  componentDidMount() {
    fetch('https://ramer.glitch.me/getlist')
      .then(response => response.json())
      .then(data => this.setState({ data }));
  }
}

http.get('https://ramer.glitch.me/getlist', function(res) {
  res.setEncoding('utf8');
  res.on('data', function (chunk) {

  });
});



var data=<div>  
  <p>
    {App}
  </p>
  </div>

/* the main page for the index route of this app */
const HelloWorld = function() {
  console.log("aa:"+App);
  return (data
  );
}

module.exports = HelloWorld;