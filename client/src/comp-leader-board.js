//Nick Baker
//9/26/2022

import * as app from "./app.js";

//Create the template html needed for this web component
const template = document.createElement("template");
template.innerHTML = `
<link rel="stylesheet" type="text/css" href="appStyle.css">
<div id="leaderBoard">

    <div id="leaderBoardCenter">
        <p style="text-align: center">
            See who placed the most of what color.
        </p>
            <color-search-button data-color="-1" class=".rainbowBackground"></color-search-button>
        <div id="colorSearchGridContainer">
            <div id="colorSearchGrid">

            </div>
        </div>
        <p class="totalPlacedText" style="text-align: center">
            There have been 999999 tiles placed.
        </p>
        <div id="leaderBoardRankingGrid">
        </div>
    </div>
    
</div>

`;

//a floating menu at the side of the screen that lets us 
//see who has placed the most of each color
class LeaderBoard extends HTMLElement {
    //attaches a shadow DOM to this and clone the template
    constructor() {
        super();

        //attach a shadow dom to this
        this.attachShadow({ mode: "open" });

        //create template and append it
        this.shadowRoot.appendChild(template.content.cloneNode(true));

    }

    //get references to our elements inside this
    connectedCallback() {
        this.panel = this.shadowRoot.querySelector('#leaderBoard');
        this.colorSearchGrid = this.shadowRoot.querySelector('#colorSearchGrid');
        this.leaderBoardRankingGrid = this.shadowRoot.querySelector('#leaderBoardRankingGrid');
        this.totalPlacedText = this.shadowRoot.querySelector('.totalPlacedText');

        for (let i = 0; i < app.getColorAmount(); i++) {
            this.colorSearchGrid.innerHTML += `
                <color-search-button data-color=${i}></color-search-button>
            `;
        }
    }

    //when the server sends us new leaderboard data, update the rankings being shown
    updateLeaderboard(data) {
        this.totalPlacedText = this.shadowRoot.querySelector('.totalPlacedText');
        this.leaderBoardRankingGrid = this.shadowRoot.querySelector('#leaderBoardRankingGrid');

        //sets the text to show how pixels of that color have been placed
        //and make it grammatically correct if 1 pixel is placed
        if (data.total == 1) {
            this.totalPlacedText.innerHTML = `There has been ${data.total} ${app.getSelectedColorSearchName()} pixel placed.`
        } else {
            this.totalPlacedText.innerHTML = `There have been ${data.total} ${app.getSelectedColorSearchName()} pixels placed.`
        }

        let users = Object.entries(data.users);

        this.leaderBoardRankingGrid.innerHTML = "";

        //sort by amount of pixels each user has placed
        //if they tie, then sort alphabetically
        if (users.length > 0) {
            users.sort((a, b) => {
                if (a[1] != b[1]) {
                    return b[1] - a[1];
                } else {
                    return a[0].localeCompare(b[0]);
                }
            });

            //finally, add the info of ranking, username, and amount to the leaderboard
            for (let i = 0; i < users.length; i++) {
                this.leaderBoardRankingGrid.innerHTML += `<p>${(i + 1)}.</p>`;
                this.leaderBoardRankingGrid.innerHTML += `<p>${users[i][0]}</p>`;
                this.leaderBoardRankingGrid.innerHTML += `<p style="text-align: right;">${users[i][1]}</p>`;
            }
        }
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

//finally, define the leader board HTML element
customElements.define('leader-board', LeaderBoard);