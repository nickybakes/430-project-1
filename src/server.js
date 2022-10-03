const http = require('http');
const url = require('url');
const htmlResponseHandler = require('./htmlResponses.js');
const jsonResponseHandler = require('./jsonResponses.js');

const port = process.env.PORT || process.env.NODE_PORT || 3000;

const urlStruct = {
  GET: {
    '/': htmlResponseHandler.getAppPage,
    '/getGrid': jsonResponseHandler.getGrid,
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

const onRequest = (request, response) => {
  const parsedUrl = url.parse(request.url);

  // as learned from the demo, we are only accepting GET and HEAD requests,
  // so for anything else, lets send a '404 not found' code
  if (!urlStruct[request.method]) {
    urlStruct.HEAD.notFound(request, response);
  }

  // based on our request type, either call the GET or HEAD methods
  if (urlStruct[request.method][parsedUrl.pathname]) {
    urlStruct[request.method][parsedUrl.pathname](request, response);
  } else {
    urlStruct[request.method].notFound(request, response);
  }
};

http.createServer(onRequest).listen(port, () => {
  console.log(`Listening on 127.0.0.1: ${port}`);
  jsonResponseHandler.initLastUpdateTime();
});
