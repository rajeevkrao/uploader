const  React = require('react');
const { Component } = require('react');
const UnorderedList = require('./UnorderedList');

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
      .then(res => res.json())
      .then(json => {
      
      
        this.setState({
          isLoaded: true,
          items: json,
        })
      
    });
    
  }
  
  render(){
    
    
    var { isLoaded, items } = this.state;
    if(!isLoaded) {
       return <div>Loading...</div>
    }
    
    else{
      return(
        <div className="App">
      <ul>
                {items.map(function(item, index){
                    return <li key={ index }><a href={'/download/' + item}>{item}</a></li>;
                  })}
            </ul>
        </div>
      );
    }
  }
}

module.exports = App;
