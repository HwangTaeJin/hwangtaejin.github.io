import React from "react";
import "./Card.css";

const Card = (props) => (
  <div className="card-container">
    <div className={props.isFlipped ? "card-hover card" : "card"}>
      <div className="front">
        <div className="word1">{props.word}</div>
      </div>
      <div className="front back">
        <div className="def1">{props.def}</div>
        <div className="exinfo1">{props.exinfo}</div>
      </div>
    </div>
  </div>
);

export default Card;