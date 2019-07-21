const React = require('react');
const UnorderedList = require('./UnorderedList');

const list= require('../../list.json');

//const transfer=require('./test.js');



var data;

data=<div>  
  <p>
    {list.rajeev}
  </p>
  </div>

/* the main page for the index route of this app */
const HelloWorld = function() {
  return (data
  );
}

module.exports = HelloWorld;