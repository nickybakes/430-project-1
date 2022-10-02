const fs = require('fs');

const appPage = fs.readFileSync(`${__dirname}/../client/app.html`);
const appStyle = fs.readFileSync(`${__dirname}/../client/appStyle.css`);

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

module.exports = {
  getAppPage,
  getAppStyle,
};
