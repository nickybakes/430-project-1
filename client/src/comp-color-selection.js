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

//A header for the website, displays a title and a subtitle
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

        // let color = app.colorPalette[Math.random() * 16]

        // this.pixelCell.style.background = `hsl(${hue} 100% 50%)`;
        this.onclick = this.clickOnSelection;
    }

    disconnectedCallback() {
        this.onclick = null;
    }

    clickOnSelection() {

    }

    //When an attribute changes, print it out for debug purposes
    attributeChangedCallback(attributeName, oldVal, newVal) {
        this.colorSelection = this.shadowRoot.querySelector('.colorSelection');
        // console.log(attributeName, oldVal, newVal);
        this.render();
    }

    //The attributes we want to observe
    static get observedAttributes() {
        return ["data-color"];
    }

    //Call this when anything on this component changes so it can be rerendered in the browser
    render() {
        const colorIndex = this.dataset.color ? this.dataset.color : "0";
        this.colorSelection.style.background = app.getColorFromPalette(colorIndex);
        //get attribute values, assign default if necessary
        // const author = this.dataset.author ? this.dataset.author : "Bobby BodyOdor";
        // const year = this.dataset.year ? this.dataset.year : "1970";
        // this.span.innerHTML = `&copy; ${year} ${author}`;
    }
} //end class

//finally, define the page-header HTML element
customElements.define('color-selection', ColorSelection);