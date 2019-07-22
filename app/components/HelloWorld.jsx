const  React = require('react');
const { Component } = require('react');
const UnorderedList = require('./UnorderedList');



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
    {b}
  </p>
  </div>

/* the main page for the index route of this app */
const HelloWorld = function() {
  console.log("aa:"+car);
  return (data
  );
}

module.exports = HelloWorld;