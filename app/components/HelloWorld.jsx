const React = require('react');
const UnorderedList = require('./UnorderedList');

const fs = require('fs');

const list= require('../../list.json')

const folder="../uploads/";



const dependenciesArray = [
  'express - middleware for the node server',
  'react - for generating the views of the app',
  'react-dom - powers the rendering of elements to the DOM, typically paired with React',
  'webpack - for bundling all the javascript',
  'webpack-cli - command line support for webpack',
  'jsx-loader - allows webpack to load jsx files'
];

const componentsMade = [
  'HelloWorld - which is the view you are seeing now!',
  'UnorderedList - which takes an array of "items" and returns a <ul> element with <li>, elements of each of those items within it',
];



var data;

data=<div>
    
  
  <p>
    {list.rajeev}
  </p>
  
  
  
  </div>

var tar=<div>

      <p>This is a starter <a href="http://glitch.com">Glitch</a> app for React! It uses 
        only a few dependencies to get you started on working with React:</p>

      <UnorderedList items={dependenciesArray} />

      <p>Look in <code>app/components/</code> for two example components:</p>

      <UnorderedList items={componentsMade} />
    </div>

/* the main page for the index route of this app */
const HelloWorld = function() {
  return (data
  );
}

module.exports = HelloWorld;