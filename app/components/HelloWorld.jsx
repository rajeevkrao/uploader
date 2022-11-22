  import  React from'react';
import { Component } from 'react';
import { Redirect,browserHistory } from 'react-router-dom';
import { Spinner,Modal,ModalHeader,ModalBody,ModalFooter, Button } from 'reactstrap';
import { Table,  } from 'react-bootstrap';
import styles from "./Home.css";
import axios from 'axios';
import { css } from 'glamor';

class App extends Component {
  
  constructor(props) {
    super(props);
    this.checklog=this.checklog.bind(this);
    this.state = {
      error: null,
      items: [],
      isLoaded: false,
      redirect: '',
      modal:false,
      oldfilename:'', 
      fileid:null,
      newfilename:''
    }
  }
  
  checklog(){
    if(sessionStorage.getItem('SID') !== "fdas73jljk324kjslkj354sjk")
      this.props.history.push('/login'); //parent function must be bound to this to make this code work 
  }
  openModal = key => {
    this.setState({
      modal:true,
      oldfilename:this.state.items[key]
    })
  }
  closeModal = () => {
    this.setState({
      modal:false
    })
  }
  rename = () => {
    axios.post('/api/rename', {
    oldfilename: this.state.oldfilename,
    newfilename: this.state.newfilename
    })
    .then(function (response) {
        window.location.reload();
    })
  }
  
  onChange = (event) => {
    this.setState({ newfilename: event.target.value });
  };
  
  componentDidMount() {
    
    
    fetch('/getlist')
      .then(res => res.json())
      .then(json => {
      
      
        this.setState({
          isLoaded: true,
          items: json,
        })
      
    });
    
  }
  
  render(){	
    console.log(this.state.oldfilename);
    var {modal,oldfilename}=this.state;
	  const renderModal = ()=>{
        return (<Modal isOpen={modal} toggle={this.closeModal} modalClassName="renamemodal">
        			<ModalHeader toggle={this.closeModal}>
        				Do you want to rename {oldfilename}?
        			</ModalHeader>
        			<ModalBody>
                <p class="pfix">Enter new filename</p>
          				<input required type="text" onChange={this.onChange} value={oldfilename}/> 
        			</ModalBody>
              <ModalFooter>
                <a class="button" href="javascript:void(0);" onClick={this.rename}>Rename</a>
                <a class="button" href="javascript:void(0);" onClick={this.closeModal}>Close</a>
              </ModalFooter>
      			</Modal>
      		   );

    }
    
    this.checklog()
    var { isLoaded, items } = this.state;
    var content;
    if(!items[0])
      content=0;
    else
      content=1;
    if(!isLoaded) {
       return <Spinner color="primary" />
    }
    /* legacy
            <ul>
                {items.map(function(item, index){
                  return <li key={ index }><a href={'/show/' + item}>{item}</a>
                                <a class="button" href={'/download/' + item}>Download</a>
                                <a class="button" href={'/delete/' + item}>Delete</a>
                                <a class="button" href="javascript:void(0);" onClick={() => this.openModal(index)}>Rename</a>
                  </li>;
                }.bind(this))}
            </ul>
    */ 
    else if(content){
      return(
        <div className="App">
          {renderModal()}
          <br/>
            <Table responsive hover bordered variant="dark">
              <tbody>
                {items.map(function(item, index){
                  return <tr key={ index }>
                    <td class="text">{index+1}</td>
                    <td><a href={'/show/' + item}>{item}</a></td>
                    <td><a class="button" href={'/download/' + item}>Download</a></td>
                    <td><a class="button" href={'/delete/' + item}>Delete</a></td>
                    <td><a class="button" href="javascript:void(0);" onClick={() => this.openModal(index)}>Rename</a></td>
                  </tr>;
                }.bind(this))}
              </tbody>
            </Table>
          <br />
                <div className="upload_div">  
									<a className="button" align="right" href="/edit/">Add</a>
									<a className="button" align="right" href="/downloadall/">Download All</a> 
                  <a className="button" align="right" href="/logout/">Logout</a> 
                  <a className="button" align="right" href="/uploads/">Upload</a>
                </div>
        </div>
      );
    }
    else{
      return(<div>
                No Files         
                <br />
                <div className="upload_div">  
									<a className="button" align="right" href="/edit/">Add</a> 
                  <a className="button" align="right" href="/logout/">Logout</a> 
                  <a className="button" align="right" href="/uploads/">Upload</a>
                </div>
            </div>);
    }
  }
}

export default App
  