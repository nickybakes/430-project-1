const fs = require('fs');

const index = fs.readFileSync(`${__dirname}/../client/client.html`);
const appPage = fs.readFileSync(`${__dirname}/../client/app.html`);
const style = fs.readFileSync(`${__dirname}/../client/style.css`);
const appStyle = fs.readFileSync(`${__dirname}/../client/appStyle.css`);

// gets our loaded index page (html)
const getIndex = (request, response) => {
  response.writeHead(200, { 'Content-Type': 'text/html' });
  response.write(index);
  response.end();
};

// gets our loaded index page (html)
const getAppPage = (request, response) => {
  response.writeHead(200, { 'Content-Type': 'text/html' });
  response.write(appPage);
  response.end();
};

// gets our loaded css style sheet (for the html!)
const getStyle = (request, response) => {
  response.writeHead(200, { 'Content-Type': 'text/css' });
  response.write(style);
  response.end();
};

// gets our loaded css style sheet (for the html!)
const getAppStyle = (request, response) => {
  response.writeHead(200, { 'Content-Type': 'text/css' });
  response.write(appStyle);
  response.end();
};

module.exports = {
  getIndex,
  getStyle,
};
