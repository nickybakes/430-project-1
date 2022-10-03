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

//displays a block of color on the pixel grid
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
        //set default white color
        this.pixelCell.style.background = app.getColorFromPalette(12);

        this.onclick = this.clickOnPixel;
    }

    disconnectedCallback() {
        this.onclick = null;
    }

    //when the server sends the grid new shit, then update this
    //pixel's css/data to show that change
    updatePixelProperties(props) {
        this.pixelCell.style.backgroundColor = app.getColorFromPalette(props.c);
        this.color = props.c;
        this.author = props.a;

        if (app.getSelectedPixel() == this)
            app.updateStatusBar();

        this.render();
    }

    //returns the name of the author, or null of there is none
    getAuthor() {
        return this.author;
    }

    //when we click on this pixel we want to set
    //the currently selected pixel to this, and show the status bar
    clickOnPixel() {
        //if we are clicking on the already selected pixel, then hide the status bar and deselect
        if (app.getSelectedPixel() == this) {
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