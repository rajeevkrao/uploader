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
    var content;
    if(!items[0])
      content=0;
    else
      content=1;
    if(!isLoaded) {
       return <div>Loading...</div>
    }
    
    else if(content){
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
    else{
      return(<div>No Files</div>);
    }
  }
}

module.exports = App;
