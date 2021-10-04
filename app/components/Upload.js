import  React from'react';
import { Component } from 'react';
import { Redirect,browserHistory } from 'react-router-dom';
import axios from 'axios';
import {Progress} from 'reactstrap';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {selectedFile:[],loaded:0}
    this.onChangeHandler=this.onChangeHandler.bind(this);
    this.onClickHandler=this.onClickHandler.bind(this);
  }
  onChangeHandler(event){
    this.setState({
     selectedFile: event.target.files,
    })
  }
  
  onClickHandler(){
    document.getElementById("dpro").style.display = "block";
    const data = new FormData()
    for(var x = 0; x<this.state.selectedFile.length; x++) {
       data.append('file', this.state.selectedFile[x])
    }
    axios.post("/utest", data, { 
      onUploadProgress: ProgressEvent => {
         this.setState({
           loaded: (ProgressEvent.loaded / ProgressEvent.total*100),
       })
   },
    })
    .then(res => { // then print response status
        console.log("reach");
        return this.props.history.push("/");
    })

  }
  
  render(){
    return (
      <div className="text">
        <form>
        <input className="upl" type="file" class="" multiple onChange={this.onChangeHandler}/>
        <button className="upl" type="button" class="upl" onClick={this.onClickHandler}>Upload</button><br/>
        <div id="dpro"><Progress bar="0" max="100" color="success" value={this.state.loaded} >{Math.round(this.state.loaded,2) }%</Progress></div>
        </form>
      </div>
    )
  }
}

export default App;