//Nick Baker
//9/26/2022

//Create the template html needed for this web component
const template = document.createElement("template");
template.innerHTML = `
    

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

        //find the span element we will put author and year in
        this.span = this.shadowRoot.querySelector("span");
    }

    //When an attribute changes, print it out for debug purposes
    attributeChangedCallback(attributeName, oldVal, newVal) {
        console.log(attributeName, oldVal, newVal);
        this.render();
    }

    //The attributes we want to observe
    static get observedAttributes() {
        return ["data-year", "data-author"];
    }

    //Call this when anything on this component changes so it can be rerendered in the browser
    render() {
        //get attribute values, assign default if necessary
        const author = this.dataset.author ? this.dataset.author : "Bobby BodyOdor";
        const year = this.dataset.year ? this.dataset.year : "1970";
        this.span.innerHTML = `&copy; ${year} ${author}`;
    }
} //end class

//finally, define the page-header HTML element
customElements.define('pixel-grid', PixelGrid);