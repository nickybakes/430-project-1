//Nick Baker
//10/2/2022

import * as app from "./app.js";

//Create the template html needed for this web component
const template = document.createElement("template");
template.innerHTML = `
<link rel="stylesheet" type="text/css" href="appStyle.css">
    <div class="colorSearchButton">
    
    </div>

`;

//Once of the colorful buttons shown on the status bar that
//sets the selected pixel to this color
class ColorSearchButton extends HTMLElement {
    //attaches a shadow DOM to this and clone the template
    constructor() {
        super();

        //attach a shadow dom to this
        this.attachShadow({ mode: "open" });

        //create template and append it
        this.shadowRoot.appendChild(template.content.cloneNode(true));
    }

    connectedCallback() {
        this.colorSearchButton = this.shadowRoot.querySelector('.colorSearchButton');

        if (this.dataset.color == -1) {
            this.colorSearchButton.classList.add('rainbowBackground');
            this.colorSearchButton.classList.add('all');
            this.colorSearchButton.classList.add('selected');
            this.colorSearchButton.innerHTML = "<p style='text-align: center; font-size: 1em;'>All</p>";
        }

        this.onclick = this.clickOnSelection;
    }

    disconnectedCallback() {
        this.onclick = null;
    }

    //When an attribute changes, print it out for debug purposes
    attributeChangedCallback(attributeName, oldVal, newVal) {
        this.colorSearchButton = this.shadowRoot.querySelector('.colorSearchButton');
        this.render();
    }

    //when we click on one of these color buttons, then set the currently selected
    //pixel to this color
    clickOnSelection() {
        // app.placePixel(this.dataset.color);
    }

    //The attributes we want to observe
    static get observedAttributes() {
        return ["data-color"];
    }

    //Call this when anything on this component changes so it can be rerendered in the browser
    render() {
        this.colorSearchButton.style.background = app.getColorFromPalette(this.dataset.color);
    }
} //end class

//finally, define the page-header HTML element
customElements.define('color-search-button', ColorSearchButton);