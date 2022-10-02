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

        //attach a shadow dom to this
        this.attachShadow({ mode: "open" });

        //create template and append it
        this.shadowRoot.appendChild(template.content.cloneNode(true));
    }

    connectedCallback() {
        this.pixelCell = this.shadowRoot.querySelector('.pixelCell');
        this.username = null;

        let hue = (Math.random() * 360);

        let color = app.getColorFromPalette(Math.floor(Math.random() * app.getColorAmount()));

        // let color = app.colorPalette[Math.random() * 16]

        // this.pixelCell.style.background = `hsl(${hue} 100% 50%)`;
        this.pixelCell.style.background = color;

        this.onclick = this.clickOnPixel;
    }

    disconnectedCallback() {
        this.onclick = null;
    }

    updatePixelProperties(props) {
        this.pixelCell.style.background = app.getColorFromPalette(props.colorIndex);
        this.username = props.username;
    }

    clickOnPixel() {
        if (app.selectedPixel == this) {
            app.hideStatusBar();
            app.setSelectedPixel(null);
        } else {
            app.showStatusBar();
            app.setSelectedPixel(this);
        }
    }

    //When an attribute changes, print it out for debug purposes
    attributeChangedCallback(attributeName, oldVal, newVal) {
        // console.log(attributeName, oldVal, newVal);
        this.render();
    }

    //The attributes we want to observe
    static get observedAttributes() {
        return ["data-x", "data-y"];
    }

    //Call this when anything on this component changes so it can be rerendered in the browser
    render() {
        //get attribute values, assign default if necessary
        // const author = this.dataset.author ? this.dataset.author : "Bobby BodyOdor";
        // const year = this.dataset.year ? this.dataset.year : "1970";
        // this.span.innerHTML = `&copy; ${year} ${author}`;
    }
} //end class

//finally, define the page-header HTML element
customElements.define('pixel-cell', PixelCell);