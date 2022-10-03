//Nick Baker
//9/26/2022

import * as app from "./app.js";

//Create the template html needed for this web component
const template = document.createElement("template");
template.innerHTML = `
<link rel="stylesheet" type="text/css" href="appStyle.css">
<div class="pixelCell">


</div>

`;

//A header for the website, displays a title and a subtitle
class PixelCell extends HTMLElement {
    //attaches a shadow DOM to this and clone the template
    constructor() {
        super();

        this.color = 12;

        //attach a shadow dom to this
        this.attachShadow({ mode: "open" });

        //create template and append it
        this.shadowRoot.appendChild(template.content.cloneNode(true));
    }

    connectedCallback() {
        this.pixelCell = this.shadowRoot.querySelector('.pixelCell');
        this.username = null;

        // let color = app.colorPalette[Math.random() * 16]

        // this.pixelCell.style.background = `hsl(${hue} 100% 50%)`;
        this.pixelCell.style.background = app.getColorFromPalette(12);

        this.onclick = this.clickOnPixel;
    }

    disconnectedCallback() {
        this.onclick = null;
    }

    updatePixelProperties(props) {
        this.pixelCell.style.backgroundColor = app.getColorFromPalette(props.c);
        this.color = props.c;
        this.author = props.a;

        if (app.getSelectedPixel() == this)
            app.updateStatusBar();

        this.render();
    }

    getAuthor() {
        return this.author;
    }

    clickOnPixel() {
        console.log(this);
        if (app.selectedPixel == this) {
            app.hideStatusBar();
            app.setSelectedPixel(null);
        } else {
            app.setSelectedPixel(this);
            app.showStatusBar();
        }
    }

    //When an attribute changes, print it out for debug purposes
    attributeChangedCallback(attributeName, oldVal, newVal) {
        // console.log(attributeName, oldVal, newVal);
        this.render();
    }

    //The attributes we want to observe
    static get observedAttributes() {
        return ["data-i", "data-color"];
    }

    //Call this when anything on this component changes so it can be rerendered in the browser
    render() {
        if (this.color && this.pixelCell) {
            this.pixelCell.style.background = app.getColorFromPalette(this.color);
        }
    }
} //end class

//finally, define the page-header HTML element
customElements.define('pixel-cell', PixelCell);