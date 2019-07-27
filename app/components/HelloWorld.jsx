const  React = require('react');
const { Component } = require('react');
const UnorderedList = require('./UnorderedList');

var car = "hello";

class App extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      items: [],
      isLoaded: false,
    }
  }
  
  componentDidMount() {
    
    fetch('https://ramer.glitch.me/getlist')
      .then((res) => res.json())
      .then((res) => {
      
        const { a } = res;
      
        this.setState({
          isLoaded: true,
          item: a,
        })
      
    });
    
  }
  
  render(){
    
    //console.log("gee");
    
    var { isLoaded, items } = this.state;
    
    if(!isLoaded) {
       return <div>Loading...</div>
    }
    
    else{
      return(
        <div className="App">Data jas been loaded...</div>
      )
    }
    
    return (
        <div className="App">
      
      </div>
    );
  }
}

module.exports = App;
//export default App;


/*
const axios = require('axios');

const http = require('http');


var car=fetch('https://ramer.glitch.me/getlist')
  .then(function(response) {
    return response.json();
  })
  .then(function(myJson) {
    console.log(JSON.stringify(myJson));
  });

//const list= require('../../list.json');

//const transfer=require('./test.js');

var dat;

var b=http.get('https://ramer.glitch.me/getlist', (res) => {
  var a=res.on('data', function (chunk) {
      chunk = JSON.parse(chunk);
          return chunk;
  });
  return a;
  
});


var data=<div>  
  <p>
    
  </p>
  </div>

const HelloWorld = function() {
  return (data
  );
}

module.exports = HelloWorld;
*/


