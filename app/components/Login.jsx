import  React from'react';
import { Component } from 'react';
import { Redirect,browserHistory } from 'react-router-dom';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { query: '', hits: [], message:'', attempts:0, mat:''};
    this.onChange = this.onChange.bind(this);
    this.onSearch = this.onSearch.bind(this);
    this.onSetResult = this.onSetResult.bind(this);
    this.setSession = this.setSession.bind(this);
  }
  onChange(event) {
    this.setState({ query: event.target.value });
  };
  onSearch(event){
    event.preventDefault();
    const { query } = this.state;
    if (query === '') {
      return;
    }
    fetch('checkpass?pass=' + query)
      .then(response => response.json())
      .then(result => this.onSetResult(result, query));
  };
  setSession() {
    sessionStorage.setItem('SID', 'fdas73jljk324kjslkj354sjk');
  }
  
  onSetResult(result, key){
    if(result==='1')
    {
      this.setSession();
      return this.setState({ message: <Redirect to='/' /> });
    }
    else
    {
      this.setState({ attempts: this.state.attempts+1}) 
      this.setState({ message: "The password you have entered is wrong ", mat:"Number of Wrong Attemps : " + this.state.attempts });
    }
    this.setState({ hits: result.hits });
  }
  
  onKeyPress(event){
    if(event.which === 13) {
      document.getElementById("subbut").click();
    }
  }
  
  componentDidMount(){
    document.getElementById("subbut").focus();
  }
  render() {
    return (
      <div>
        <h1>Login to Access the files</h1>
        {/* Search Input */}
        <form onSubmit={this.onSearch}>
          <div className="pass">Enter Password:<br/></div>
          <input required type="password" onChange={this.onChange} onKeyPress={this.onKeyPress} />
          <button id="subbut" type="submit">Login</button>
        </form>
        
        <br/>
        <p className="error">{this.state.message}<br/>{this.state.mat}</p>
      </div>
    );
  }
}
export default App;