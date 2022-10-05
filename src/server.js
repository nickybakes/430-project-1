const http = require('http');
const url = require('url');
const query = require('querystring');
const htmlResponseHandler = require('./htmlResponses.js');
const jsonResponseHandler = require('./jsonResponses.js');

const port = process.env.PORT || process.env.NODE_PORT || 3000;

// our big structure of urls. when someone asks the server for something
// it will check this like a dictionary for the function it should do
const urlStruct = {
  GET: {
    '/': htmlResponseHandler.getAppPage,
    '/getGrid': jsonResponseHandler.getGrid,
    '/getLeaderboard': jsonResponseHandler.getLeaderboard,
    '/notReal': jsonResponseHandler.notFound,
    index: htmlResponseHandler.getAppPage,
    '/appStyle.css': htmlResponseHandler.getAppStyle,
    '/src/app.js': htmlResponseHandler.getAppJs,
    '/src/comp-color-selection.js': htmlResponseHandler.getCompColorSelectionJs,
    '/src/comp-pixel-grid.js': htmlResponseHandler.getCompPixelGridJs,
    '/src/comp-pixel.js': htmlResponseHandler.getCompPixelJs,
    '/src/comp-status-bar.js': htmlResponseHandler.getCompStatusBarJs,
    '/src/init.js': htmlResponseHandler.getInitJs,
    notFound: jsonResponseHandler.notFound,
  },
  HEAD: {
    '/getGrid': jsonResponseHandler.getGridMeta,
    '/notReal': jsonResponseHandler.notFound,
    // notFound: jsonResponseHandler.notFoundMeta
  },
  POST: {
    '/setPixel': jsonResponseHandler.parseBody,
  },
};

// called when the server is requested to do/get something by a client
const onRequest = (request, response) => {
  const parsedUrl = url.parse(request.url);


  //grab the query parameters (?key=value&key2=value2&etc=etc)
  //and parse them into a reusable object by field name
  const params = query.parse(parsedUrl.query);

  // we are only accepting GET, HEAD, and POST requests,
  // so for anything else, lets send a '404 not found' code
  if (!urlStruct[request.method]) {
    urlStruct.HEAD.notFound(request, response);
  }

  // based on our request type, either call the GET or HEAD methods
  if (urlStruct[request.method][parsedUrl.pathname]) {
    urlStruct[request.method][parsedUrl.pathname](request, response, params);
  } else {
    urlStruct[request.method].notFound(request, response);
  }
};

// initializes the server
http.createServer(onRequest).listen(port, () => {
  console.log(`Listening on 127.0.0.1: ${port}`);
  jsonResponseHandler.initLastUpdateTime();
});
