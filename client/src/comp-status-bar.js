//Nick Baker
//9/26/2022

//Create the template html needed for this web component
const template = document.createElement("template");
template.innerHTML = `
<link rel="stylesheet" type="text/css" href="appStyle.css">
<div id="statusBar">
    <div id="colorSelectionBar">


    </div>

</div>

`;

//A header for the website, displays a title and a subtitle
class StatusBar extends HTMLElement {
    //attaches a shadow DOM to this and clone the template
    constructor() {
        super();

        //attach a shadow dom to this
        this.attachShadow({ mode: "open" });

        //create template and append it
        this.shadowRoot.appendChild(template.content.cloneNode(true));
    }

    connectedCallback() {
        this.bar = this.shadowRoot.querySelector('#statusBar');

        // for (let y = 0; y < 10; y++) {
        //     for (let x = 0; x < 10; x++) {
        //         this.grid.innerHTML += `<pixel-cell data-x='${x}' data-y='${y}'></pixel-cell>`;
        //     }
        // }
    }

    disconnectedCallback() {

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
        // //get attribute values, assign default if necessary
        // const author = this.dataset.author ? this.dataset.author : "Bobby BodyOdor";
        // const year = this.dataset.year ? this.dataset.year : "1970";
        // this.span.innerHTML = `&copy; ${year} ${author}`;
    }
} //end class

//finally, define the page-header HTML element
customElements.define('status-bar', StatusBar);