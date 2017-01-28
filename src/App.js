import React, { Component } from 'react';
import './App.css';
var uuid = require('uuid');
var firebase = require('firebase');

var config = {
    apiKey: "AIzaSyD-Nmciy6eSch8K2qfJVMsAnZ6phn_n1dk",
    authDomain: "simplesurvey-c0691.firebaseapp.com",
    databaseURL: "https://simplesurvey-c0691.firebaseio.com",
    storageBucket: "simplesurvey-c0691.appspot.com",
    messagingSenderId: "736445536530"
  };
  firebase.initializeApp(config);

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      id:uuid.v1(),
      name:'',
      answers:{
        q1:'',
        q2:'',
        q3:'',
        q4:'',
      },
      submitted: false
    }
    this.handleQuestionChange = this.handleQuestionChange.bind(this);
  }

  handleNameSubmit(event){
    this.setState({name:this.refs.name.value})
    event.preventDefault();
  }

  handleQuestionChange(event){
    var answers = this.state.answers;
    switch(event.target.name){
      case 'q1':
        answers.q1 = event.target.value;
        break;
      case 'q2':
        answers.q2 = event.target.value;
        break;
      case 'q3':
        answers.q3 = event.target.value;
        break;
      case 'q4':
        answers.q4 = event.target.value;
        break;
      default:
    }
    this.setState({answers:answers},function(){
      console.log(this.state);
    });
  }

  handleQuestionSubmit(event){
    
    firebase.database().ref('surveys/'+this.state.id).set({
      name: this.state.name,
      answers: this.state.answers
    });

    this.setState({submitted:true}, function(){
      console.log('Questions submitted');    });
    event.preventDefault();
  }

  render() {
    var user;
    var questions;
    if(this.state.name && this.state.submitted === false){
      user ="Hello, "+ this.state.name; 
      questions = <span><h3>Survery Questions</h3>
      <form onSubmit={this.handleQuestionSubmit.bind(this)}>
        <div>
            <label>What is your favorite operating system?</label><br />
            <input type="radio" name="q1" value="Windows" onChange={this.handleQuestionChange} />Windows<br />
            <input type="radio" name="q1" value="OSX" onChange={this.handleQuestionChange} />OSX<br />
            <input type="radio" name="q1" value="Linux" onChange={this.handleQuestionChange} />Linux<br />
            <input type="radio" name="q1" value="Solaris" onChange={this.handleQuestionChange} />Solaris<br />
            <input type="radio" name="q1" value="Other" onChange={this.handleQuestionChange} />Other<br />
          </div>
          <div>
          <label>What is your favorite brand of TV?</label><br />
          <input type="radio" name="q2" value="Sony" onChange={this.handleQuestionChange} />Sony<br />
          <input type="radio" name="q2" value="Samsung" onChange={this.handleQuestionChange} />Samsung<br />
          <input type="radio" name="q2" value="Panasonic" onChange={this.handleQuestionChange} />Green<br />
          <input type="radio" name="q2" value="Vizio" onChange={this.handleQuestionChange} />Vizio<br />
          <input type="radio" name="q2" value="Other" onChange={this.handleQuestionChange} />Other<br />
        </div>
        <div>
          <label>What is your favorite Smartphone Brand?</label><br />
          <input type="radio" name="q3" value="Morning" onChange={this.handleQuestionChange} />Apple<br />
          <input type="radio" name="q3" value="Afternoon" onChange={this.handleQuestionChange} />Samsung<br />
          <input type="radio" name="q3" value="Evening" onChange={this.handleQuestionChange} />Nexus<br />
          <input type="radio" name="q3" value="Night" onChange={this.handleQuestionChange} />Blackberry<br />
          <input type="radio" name="q3" value="Other" onChange={this.handleQuestionChange} />Other<br />
        </div>
        <div>
          <label>What is your favorite CPU Brand?</label><br />
          <input type="radio" name="q4" value="Intel" onChange={this.handleQuestionChange} />Intel<br />
          <input type="radio" name="q4" value="AMD" onChange={this.handleQuestionChange} />AMD<br />
          <input type="radio" name="q4" value="Nvidia" onChange={this.handleQuestionChange} />Nvidia<br />
          <input type="radio" name="q4" value="ARM" onChange={this.handleQuestionChange} />ARM<br />
          <input type="radio" name="q4" value="Other" onChange={this.handleQuestionChange} />Other<br />
        </div>
        <input type="submit" value="Submit" />
      </form>
      </span>;
    } else if(!this.state.name && this.state.submitted === false){
      user = <span>
        <h2>Pease enter your name to being the survey</h2>
        <form onSubmit={this.handleNameSubmit.bind(this)}>
          <input type="text" placeholder="Enter name..." ref="name" />
        </form>
      </span>;
      questions = '';
    } else if(this.state.submitted === true){
      user = <h2>Thank you, {this.state.name}</h2>
    }
    return (
      <div className="App text-center">
        <div className="App-header">
          <h2>Simple Survey</h2>
        </div>
        <div className="text-center">
          {user}
          {questions}
        </div>
      </div>
    );
  }
}

export default App;
