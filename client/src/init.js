import * as app from "./app.js";

//import the web components we will need

import "./comp-pixel.js";
import "./comp-pixel-grid.js";
import "./comp-status-bar.js";
import "./comp-color-selection.js";
import "./comp-leader-board.js";
import "./comp-color-search-button.js";

window.onload = () => {

    //start up app
    app.init();
}