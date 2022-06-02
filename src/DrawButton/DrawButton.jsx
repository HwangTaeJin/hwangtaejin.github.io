import React, { Component } from 'react';
import './DrawButton.css';

class DrawButton extends Component{ /* Definerer at man har tilgang til funksjoner og properties (verdier) til "parent" elementet */
    constructor(props){ /* Blir brukt for å sette properties (verdiene) til Componenten / Er med på "lagingen" av Componenten */
        super(props); /* Gir muligheten til å få tilgang til alle funksjonene til "parent" elementet */

        this.drawCard = this.drawCard.bind(this); /* Binder funksjonen til elementet */
    }

    drawCard(){
        this.props.drawCard();
    }

    render(props){ /* Renderer koden fra XML til HTML */
        return(
            <div className="buttonContainer">
                <button className="btn" onClick={this.drawCard}>Draw Card</button>
            </div>
        )
    }
}

export default DrawButton