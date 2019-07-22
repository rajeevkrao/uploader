const  React = require('react');
const { Component } = require('react');
const UnorderedList = require('./UnorderedList');

const json = require('json');

const axios = require('axios');

const http = require('http');

//const list= require('../../list.json');

//const transfer=require('./test.js');

var dat;

var b=http.get('https://ramer.glitch.me/getlist', (res) => {
  var a=res.on('data', function (chunk) {
      chunk = json.parse(chunk);
          return chunk;
  });
  return a;
  
});



var data=<div>  
  <p>
    {b}
  </p>
  </div>

/* the main page for the index route of this app */
const HelloWorld = function() {
  console.log("aa:"+b);
  return (data
  );
}

module.exports = HelloWorld;