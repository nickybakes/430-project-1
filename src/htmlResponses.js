const fs = require('fs');

const appPage = fs.readFileSync(`${__dirname}/../client/app.html`);
const appStyle = fs.readFileSync(`${__dirname}/../client/appStyle.css`);
const appJs = fs.readFileSync(`${__dirname}/../client/src/app.js`);
const compColorSelection = fs.readFileSync(`${__dirname}/../client/src/comp-color-selection.js`);
const compPixelGrid = fs.readFileSync(`${__dirname}/../client/src/comp-pixel-grid.js`);
const compPixel = fs.readFileSync(`${__dirname}/../client/src/comp-pixel.js`);
const compStatusBar = fs.readFileSync(`${__dirname}/../client/src/comp-status-bar.js`);
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

const getJs = (request, response, jsFile) => {
  response.writeHead(200, { 'Content-Type': 'text/javascript' });
  response.write(jsFile);
  response.end();
};

const getAppJs = (request, response) => {
  getJs(request, response, appJs);
};

const getCompColorSelectionJs = (request, response) => {
  getJs(request, response, compColorSelection);
};

const getCompPixelGridJs = (request, response) => {
  getJs(request, response, compPixelGrid);
};

const getCompPixelJs = (request, response) => {
  getJs(request, response, compPixel);
};

const getCompStatusBarJs = (request, response) => {
  getJs(request, response, compStatusBar);
};

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
  getInitJs,
};
