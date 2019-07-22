const React = require('react');
const UnorderedList = require('./UnorderedList');

const axios = require('axios');

//const list= require('../../list.json');

//const transfer=require('./test.js');

var list=axios.get('https://ramer.glitch.me/getlist');

var data;

data=<div>  
  <p>
    {list}
  </p>
  </div>

/* the main page for the index route of this app */
const HelloWorld = function() {
  return (data
  );
}

module.exports = HelloWorld;