//Nick Baker
//10/2/2022

import * as app from "./app.js";

//Create the template html needed for this web component
const template = document.createElement("template");
template.innerHTML = `
<link rel="stylesheet" type="text/css" href="appStyle.css">
    <div class="colorSelection">


    </div>

`;

//Once of the colorful buttons shown on the status bar that
//sets the selected pixel to this color
class ColorSelection extends HTMLElement {
    //attaches a shadow DOM to this and clone the template
    constructor() {
        super();

        //attach a shadow dom to this
        this.attachShadow({ mode: "open" });

        //create template and append it
        this.shadowRoot.appendChild(template.content.cloneNode(true));
    }

    connectedCallback() {
        this.colorSelection = this.shadowRoot.querySelector('.colorSelection');

        this.onclick = this.clickOnSelection;
    }

    disconnectedCallback() {
        this.onclick = null;
    }

    //When an attribute changes, print it out for debug purposes
    attributeChangedCallback(attributeName, oldVal, newVal) {
        this.colorSelection = this.shadowRoot.querySelector('.colorSelection');
        // console.log(attributeName, oldVal, newVal);
        this.render();
    }

    //when we click on one of these color buttons, then set the currently selected
    //pixel to this color
    clickOnSelection() {
        app.placePixel(this.dataset.color);
    }

    //The attributes we want to observe
    static get observedAttributes() {
        return ["data-color"];
    }

    //Call this when anything on this component changes so it can be rerendered in the browser
    render() {
        this.colorSelection.style.background = app.getColorFromPalette(this.dataset.color);
    }
} //end class

//finally, define the color-selection HTML element
customElements.define('color-selection', ColorSelection);