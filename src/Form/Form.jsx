import React, { Component } from 'react';
import './Form.css';
import firebase from "firebase/compat/app";
import "firebase/compat/database";
import { Link } from "react-router-dom";
// import logo from '../Images/logo.png';

const initialState = {
  subject: '',
  id: '',
  word: '',
  def: '',
  exinfo: '',
  wordError: '',
  defError: '',
  exinfoError: ''
}

class Form extends Component { /* Definerer at man har tilgang til funksjoner og properties (verdier) til "parent" elementet */

  constructor(props) { /* Blir brukt for å sette properties (verdiene) til Componenten / Er med på "lagingen" av Componenten */
    super(props); /* Gir muligheten til å få tilgang til alle funksjonene til "parent" elementet */

    this.state = initialState;

    // this.updateInput = this.updateInput.bind(this);
    this.updateInput2 = this.updateInput2.bind(this); /* Binder funksjonen til elementet */
    this.updateInput3 = this.updateInput3.bind(this);
    this.updateInput4 = this.updateInput4.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }


  // updateInput(event){
  //   this.setState({subject : event.target.value})
  // }
  updateInput2(event) {
    this.setState({ word: event.target.value })
  }
  updateInput3(event) {
    this.setState({ def: event.target.value })
  }
  updateInput4(event) {
    this.setState({ exinfo: event.target.value })
  }

  validate = () => {
    let subjectError = '';
    let wordError = '';
    let defError = '';
    let exinfoError = '';

    if (!this.state.subject) {
      subjectError = "Please enter a subject";
    }

    if (!this.state.word) {
      wordError = "Please enter a word";
    }

    if (!this.state.def) {
      defError = "Please enter a definition";
    }

    if (!this.state.exinfo) {
      exinfoError = "Please enter some extra information";
    }

    if (wordError || defError || exinfoError || subjectError) {
      this.setState({ wordError, defError, exinfoError, subjectError });
      return false;
    }

    return true;
  }

  // getNewID() {
  //   var randomID = Math.floor(Math.random() * 1000);
  //   return randomID;
  // }

  handleSubmit(value) {
    const isValid = this.validate();
    if (isValid) {
      // console.log(this.state);
      this.setState(initialState);
    }
    // console.log(this.state.subject);
    console.log(this.state.word);
    console.log(this.state.def);
    console.log(this.state.exinfo);
    var rootRef = firebase.database().ref();
    // const randomNumber = Math.floor(Math.random() * 1000);
    var storesRef = rootRef.child("cards");
    rootRef
      .child('cards')
      .orderByChild('id')
      .once('value')
      .then(snap => {
        if (snap.exists()) {
          let cardData = snap.val();
          console.log(cardData["0"].id);
          for (let key of Object.keys(cardData)) {
            console.log(`cardData[${key}]:`, cardData[key].id);
          }
          
          console.log(Object.keys(cardData))     
        }
      })
      
    var newStoreRef = storesRef.push();
    if (!this.state.word || !this.state.def || !this.state.exinfo) {
      return false;
    } else {
      newStoreRef.set({
        // subject: this.state.subject,
        id: Date.now(),
        word: this.state.word,
        def: this.state.def,
        exinfo: this.state.exinfo
      });
      this.setState({
        // subject: "",
        word: "",
        def: "",
        exinfo: ""
      })
      alert("Data was sent!")
      return true;
    }

  }



  render() { /* Renderer koden fra XML til HTML */
    return (
      <div>
        <div className="header">
          {/* <img src={logo} className='logo' alt="logo"></img> */}
          <nav>
            <ul className="nav__links">
              <Link to="/"><li className="cta2">Cards</li></Link>
              <Link to="/form"><li className='cta'>Submit</li></Link>
            </ul>
          </nav>
        </div>
          <div className='form-container'>
            {/* <div className='input-container ic2'>
              <input type="text" onChange={this.updateInput} name="subjectInput" className='input' value={this.state.subject} required></input>
            <div className="cut"></div>
              <label htmlFor="subjectInput" className='placeholder'>Subject</label>
          </div>
          <div style={{ marginLeft: "20px", color: "red", paddingTop: "10px" }}>
            {this.state.subjectError}
          </div> */}
          <div className='input-container ic2'>
            <input type="text" onChange={this.updateInput2} name="wordInput" className='input' maxLength={15} value={this.state.word} required></input>
            <div className="cut"></div>
            <label htmlFor="wordInput" className='placeholder'>Word</label>
          </div>
          <div style={{ marginLeft: "20px", color: "red", paddingTop: "10px" }}>
            {this.state.wordError}
          </div>
          <div className='input-container ic2'>
            <input type="text" onChange={this.updateInput3} name="defInput" className='input' maxLength={8} value={this.state.def} required></input>
            <div className="cut"></div>
            <label htmlFor="defInput" className='placeholder'>Definition</label>
          </div>
          <div style={{ marginLeft: "20px", color: "red", paddingTop: "10px" }}>
            {this.state.defError}
          </div>
          <div className='input-container ic2'>
            <input type="text" onChange={this.updateInput4} name="exinfoInput" className='input' maxLength={23} value={this.state.exinfo} required></input>
            <div className="cut"></div>
            <label htmlFor="exinfoInput" className='placeholder'>Extra Info</label>
          </div>
          <div style={{ marginLeft: "20px", color: "red", paddingTop: "10px" }}>
            {this.state.exinfoError}
          </div>
          <input type="submit" onClick={this.handleSubmit} className='btn'></input>
        </div>
      </div>
    );
  }
}

export default Form;
