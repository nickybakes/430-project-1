//Nick Baker
//9/26/2022

import * as app from "./app.js";

//Create the template html needed for this web component
const template = document.createElement("template");
template.innerHTML = `
<link rel="stylesheet" type="text/css" href="appStyle.css">
<div id="leaderBoard">

    <div id="leaderBoardCenter">
        <p style="text-align: center">
            See who placed the most of what color.
        </p>
            <color-search-button data-color="-1" class=".rainbowBackground"></color-search-button>
        <div id="colorSearchGridContainer">
            <div id="colorSearchGrid">

            </div>
        </div>
        <p class="totalPlacedText" style="text-align: center">
            There have been 999999 tiles placed.
        </p>
        <div id="leaderBoardRankingGrid">
        <p>1.</p><p>nickybakes</p><p>999</p>
        <p>20.</p><p>ABCDEFGHIJKLMNOP</p><p>999999</p>
        <p>20.</p><p>ABCDEFGHIJKLMNOP</p><p>999999</p>
        <p>20.</p><p>ABCDEFGHIJKLMNOP</p><p>999999</p>
        <p>20.</p><p>ABCDEFGHIJKLMNOP</p><p>999999</p>
        <p>20.</p><p>ABCDEFGHIJKLMNOP</p><p>999999</p>
        <p>20.</p><p>ABCDEFGHIJKLMNOP</p><p>999999</p>
        <p>20.</p><p>ABCDEFGHIJKLMNOP</p><p>999999</p>
        <p>20.</p><p>ABCDEFGHIJKLMNOP</p><p>999999</p>
        <p>20.</p><p>ABCDEFGHIJKLMNOP</p><p>999999</p>
        </div>
    </div>
    
</div>

`;

//a floating menu at the bottom of the screen that lets us 
//select colors and set a username
class LeaderBoard extends HTMLElement {
    //attaches a shadow DOM to this and clone the template
    constructor() {
        super();

        //attach a shadow dom to this
        this.attachShadow({ mode: "open" });

        //create template and append it
        this.shadowRoot.appendChild(template.content.cloneNode(true));
    }

    //get references to our elements inside this
    connectedCallback() {
        this.panel = this.shadowRoot.querySelector('#leaderBoard');
        this.colorSearchGrid = this.shadowRoot.querySelector('#colorSearchGrid');

        for (let i = 0; i < app.getColorAmount(); i++) {
            this.colorSearchGrid.innerHTML += `
                <color-search-button data-color=${i}></color-search-button>
            `;
        }
    }

    disconnectedCallback() {

    }

    //returns the currently typed in username
    getCurrentUsername() {
        // return this.usernameField.value;
    }

    //gets the author from the currently selected pixel
    //if there is no author, then say so!
    updateAuthor() {
        // if (app.getSelectedPixel() != null) {
        //     let author = app.getSelectedPixel().getAuthor();
        //     if (!author) {
        //         this.authorDisplay.innerHTML = 'Nobody has placed a pixel here yet!'
        //     } else {
        //         this.authorDisplay.innerHTML = `Pixel placed by ${author}.`;
        //     }
        // }

        // this.render();
    }

    //When an attribute changes, print it out for debug purposes
    attributeChangedCallback(attributeName, oldVal, newVal) {
        console.log(attributeName, oldVal, newVal);
        this.render();
    }

    //The attributes we want to observe
    static get observedAttributes() {
        // return ["data-year", "data-author"];
    }

    //Call this when anything on this component changes so it can be rerendered in the browser
    render() {
    }
} //end class

//finally, define the page-header HTML element
customElements.define('leader-board', LeaderBoard);