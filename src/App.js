import React, { Component } from "react";
import "./App.css";
import Card from "./Card/Card";
import DrawButton from "./DrawButton/DrawButton";
import Form from "./Form/Form";
// import Subject from "./Subject/Subject";

import firebase from "firebase/compat/app";
import "firebase/compat/database";
// import { initializeApp } from "https://www.gstatic.com/firebasejs/9.8.1/firebase-app.js";

import { DB_CONFIG } from "./Config/Firebase/db_config";
import { Link, Route, Routes } from "react-router-dom";
// import logo from './Images/logo.png'

class App extends Component { /* Definerer at man har tilgang til funksjoner og properties (verdier) til "parent" elementet */
  constructor(props) { /* Blir brukt for å sette properties (verdiene) til Componenten / Er med på "lagingen" av Componenten */
    super(props); /* Gir muligheten til å få tilgang til alle funksjonene til "parent" elementet */
    this.state = {
      isFlipped: false
    };

    this.app = firebase.initializeApp(DB_CONFIG); /* Linker databasen med nettsiden */
    this.database = this.app.database().ref().child("cards"); /* Refererer til child elementet "cards" i databasen */
    this.updateCard = this.updateCard.bind(this); /* Binder funksjonen til elementet */

    this.state = {
      cards: [
        // {id: 1, subject: "Korean", def: "집", exinfo: "jib", word: "house"},
        // {id: 2, subject: "Chinese", def: "很", exinfo: "hěn", word: "very, quite"},
      ],
      currentCard: {}
    };
  }

  componentDidMount() { /* En React funksjon som kjører etter den første render() funksjonen. Blir brukt for å hente data og endre data etter siden har blitt lastet inn */
    console.log(this.app.database().ref().child("cards"));
    const currentCards = this.state.cards;
    this.database.on("child_added", (snap) => {
      currentCards.push({ /* Pusher all dataen fra databasen inn i en array for å så kunne hente dataen fra arrayen istendefor databasen (raskere metode) */
        id: snap.key,
        word: snap.val().word,
        def: snap.val().def,
        exinfo: snap.val().exinfo
      });

      this.setState({
        cards: currentCards,
        currentCard: this.getRandomCard(currentCards), /* Henter et random card */
        // subject: this.state.subjects
      });
    });
  }

  getRandomCard(currentCards) {
    var randomIndex = Math.floor(Math.random() * currentCards.length);
    var card = currentCards[randomIndex];
    if (card === this.state.currentCard) {
      this.getRandomCard(currentCards);
    }

    return card;
  }

  updateCard() {
    const currentCards = this.state.cards;
    this.setState({
      cards: currentCards,
      currentCard: this.getRandomCard(currentCards)
    });
    var rows = [];
    for (var i = 0; i < 10; i++) {
      rows.push(i);
    }
    var x = [];
    while (x < 10) {
      x = "32" + x.length;
    }
    //var sum = rows + x;
    // console.log(sum);
    console.log(this);
    console.log(currentCards);
  }

  // addStore() {
  //   var rootRef = firebase.database().ref();
  //   var storesRef = rootRef.child("cards");
  //   var newStoreRef = storesRef.push();
  //   newStoreRef.set({
  //     id: this.state.id,
  //     eng: this.state.eng,
  //     han: this.state.han,
  //     pin: this.state.pin
  //   });
  // }

  // getSubject() {
  //   console.log("It works");
  // }


  render() { /* Renderer koden fra XML til HTML */
    return (
      <Routes>
      <Route path="/" element={<div className="App">
        <div className="header">
                  {/* <img src={logo} className='logo' alt="logo"></img> */}
                  <nav>
                      <ul className="nav__links">
                          <Link to="/form"><li className="cta2">Submit</li></Link>
                          <Link to="/"><li className="cta">Cards</li></Link>
                      </ul>
                  </nav>
              </div>
        {/* <div>
          <Subject />
        </div> */}
        <div className="cardRow">
          <div
            onClick={() => this.setState({ isFlipped: !this.state.isFlipped })}
            >
              
            <Card
              isFlipped={this.state.isFlipped}
              word={this.state.currentCard.word}
              def={this.state.currentCard.def}
              exinfo={this.state.currentCard.exinfo}
            />
          </div>
        </div>
        <div className="btnRow">
          <DrawButton drawCard={this.updateCard} />
        </div>
        <div>
        </div>
      </div>}>
    </Route>
      <Route path="/form" element={<Form />} />
        </Routes>
    );
  }
}

export default App;
