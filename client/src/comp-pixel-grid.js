//Nick Baker
//9/26/2022

import * as app from "./app.js";

//Create the template html needed for this web component
const template = document.createElement("template");
template.innerHTML = `
<link rel="stylesheet" type="text/css" href="appStyle.css">
<div id="pixelGrid">


</div>

`;

//A header for the website, displays a title and a subtitle
class PixelGrid extends HTMLElement {
    //attaches a shadow DOM to this and clone the template
    constructor() {
        super();

        //attach a shadow dom to this
        this.attachShadow({ mode: "open" });

        //create template and append it
        this.shadowRoot.appendChild(template.content.cloneNode(true));
    }

    connectedCallback() {
        this.grid = this.shadowRoot.querySelector('#pixelGrid');

        for (let y = 0; y < 10; y++) {
            for (let x = 0; x < 10; x++) {
                this.grid.innerHTML += `<pixel-cell data-i='${x + (y * 10)}'></pixel-cell>`;
                let child = this.grid.children[this.grid.childElementCount - 1];
            }
        }
    }

    disconnectedCallback() {

    }

    updateGrid(gridProps) {
        for (let p in gridProps) {
            this.grid.children[p].updatePixelProperties(gridProps[p]);
        }
        app.updateStatusBar();
    }

    //When an attribute changes, print it out for debug purposes
    attributeChangedCallback(attributeName, oldVal, newVal) {
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
customElements.define('pixel-grid', PixelGrid);