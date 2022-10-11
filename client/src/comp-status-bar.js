//Nick Baker
//9/26/2022

import * as app from "./app.js";

//Create the template html needed for this web component
const template = document.createElement("template");
template.innerHTML = `
<link rel="stylesheet" type="text/css" href="appStyle.css">
<div id="statusBar">
    <p id="pixelAuthorText">
        Pixel placed by 
    </p>
    <div id="colorSelectionBarContainer">
        <div id="colorSelectionBar">


        </div>
    </div>
    <div id="nameFieldContainer">
        Username: <input id="nameField" type="text" name="name" maxlength="16"/>
    </div>
</div>

`;

//a floating menu at the bottom of the screen that lets us 
//select colors and set a username
class StatusBar extends HTMLElement {
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
        this.bar = this.shadowRoot.querySelector('#statusBar');
        this.colorSelectionBar = this.shadowRoot.querySelector('#colorSelectionBar');
        this.authorDisplay = this.shadowRoot.querySelector('#pixelAuthorText');
        this.usernameField = this.shadowRoot.querySelector('#nameField');

        //adds all the color selections needed to represent the whole
        //color palette
        for (let i = 0; i < app.getColorAmount(); i++) {
            this.colorSelectionBar.innerHTML += `
                <color-selection data-color=${i}></color-selection>
            `;
        }
    }

    disconnectedCallback() {

    }

    //returns the currently typed in username
    getCurrentUsername() {
        return this.usernameField.value;
    }

    //gets the author from the currently selected pixel
    //if there is no author, then say so!
    updateAuthor() {
        if (app.getSelectedPixel() != null) {
            let author = app.getSelectedPixel().getAuthor();
            if (!author) {
                this.authorDisplay.innerHTML = 'Nobody has placed a pixel here yet!'
            } else {
                this.authorDisplay.innerHTML = `Pixel placed by ${author}.`;
            }
        }

        this.render();
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

//finally, define the status bar HTML element
customElements.define('status-bar', StatusBar);