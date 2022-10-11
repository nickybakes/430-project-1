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

//Once of the colorful buttons shown in the leaderboard that
//sets the search color to this color
class ColorSearchButton extends HTMLElement {
    //attaches a shadow DOM to this and clone the template
    constructor() {
        super();

        //attach a shadow dom to this
        this.attachShadow({ mode: "open" });

        //create template and append it
        this.shadowRoot.appendChild(template.content.cloneNode(true));
    }

    //when this element loads up, add its onclick callback
    connectedCallback() {
        this.colorSearchButton = this.shadowRoot.querySelector('.colorSearchButton');
        
        //if this is the -1 button, then its the rainbow All colors button
        if (this.dataset.color == -1) {
            this.colorSearchButton.classList.add('rainbowBackground');
            this.colorSearchButton.classList.add('all');
            this.colorSearchButton.innerHTML = "<p style='text-align: center; font-size: 1em;'>All</p>";
            app.setSelectedColorSearch(this);
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

    //when we click on one of these color search buttons
    //then we need to set it as selected
    //and query the leaderboard for this color's data
    clickOnSelection() {
        app.setSelectedColorSearch(this);
    }

    //The attributes we want to observe
    static get observedAttributes() {
        return ["data-color"];
    }

    //Call this when anything on this component changes so it can be rerendered in the browser
    render() {
        //set the background color to the one from the color palette
        if(this.dataset.color != -1)
            this.colorSearchButton.style.background = app.getColorFromPalette(this.dataset.color);
    }
} //end class

//finally, define the color-search-button HTML element
customElements.define('color-search-button', ColorSearchButton);