const fs = require('fs');

const appPage = fs.readFileSync(`${__dirname}/../client/app.html`);
const appStyle = fs.readFileSync(`${__dirname}/../client/appStyle.css`);
const appJs = fs.readFileSync(`${__dirname}/../client/src/app.js`);
const compColorSelection = fs.readFileSync(`${__dirname}/../client/src/comp-color-selection.js`);
const compPixelGrid = fs.readFileSync(`${__dirname}/../client/src/comp-pixel-grid.js`);
const compPixel = fs.readFileSync(`${__dirname}/../client/src/comp-pixel.js`);
const compStatusBar = fs.readFileSync(`${__dirname}/../client/src/comp-status-bar.js`);
const compLeaderBoard = fs.readFileSync(`${__dirname}/../client/src/comp-leader-board.js`);
const compColorSearchButton = fs.readFileSync(`${__dirname}/../client/src/comp-color-search-button.js`);
const init = fs.readFileSync(`${__dirname}/../client/src/init.js`);

// gets our loaded index page (html)
const getAppPage = (request, response) => {
  response.writeHead(200, { 'Content-Type': 'text/html' });
  response.write(appPage);
  response.end();
};

// gets our loaded css style sheet (for the html!)
const getAppStyle = (request, response) => {
  response.writeHead(200, { 'Content-Type': 'text/css' });
  response.write(appStyle);
  response.end();
};

// writes a specifical JS file to the response and ends the response
const getJs = (request, response, jsFile) => {
  response.writeHead(200, { 'Content-Type': 'text/javascript' });
  response.write(jsFile);
  response.end();
};

// gets app.js
const getAppJs = (request, response) => {
  getJs(request, response, appJs);
};

// gets comp-color-selection.js
const getCompColorSelectionJs = (request, response) => {
  getJs(request, response, compColorSelection);
};

// gets comp-pixel-grid.js
const getCompPixelGridJs = (request, response) => {
  getJs(request, response, compPixelGrid);
};

// gets comp-pixel.js
const getCompPixelJs = (request, response) => {
  getJs(request, response, compPixel);
};

// gets comp-status-bar.js
const getCompStatusBarJs = (request, response) => {
  getJs(request, response, compStatusBar);
};

// gets comp-leader-board.js
const getCompLeaderBoardJs = (request, response) => {
  getJs(request, response, compLeaderBoard);
};

// gets comp-color-search-button.js
const getCompColorSearchButtonJs = (request, response) => {
  getJs(request, response, compColorSearchButton);
};

// gets init.js
const getInitJs = (request, response) => {
  getJs(request, response, init);
};

module.exports = {
  getAppPage,
  getAppStyle,
  getAppJs,
  getCompColorSelectionJs,
  getCompPixelGridJs,
  getCompPixelJs,
  getCompStatusBarJs,
  getCompLeaderBoardJs,
  getCompColorSearchButtonJs,
  getInitJs,
};
