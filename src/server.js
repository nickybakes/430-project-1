const http = require('http');
const url = require('url');
const htmlResponseHandler = require('./htmlResponses.js');
const jsonResponseHandler = require('./jsonResponses.js');

const port = process.env.PORT || process.env.NODE_PORT || 3000;

const urlStruct = {

  GET: {
    '/': htmlResponseHandler.getAppPage,
    '/getUsers': jsonResponseHandler.getUsers,
    '/notReal': jsonResponseHandler.notFound,
    index: htmlResponseHandler.getAppPage,
    '/style.css': htmlResponseHandler.getStyle,
    notFound: jsonResponseHandler.notFound,
  },
  HEAD: {
    '/getUsers': jsonResponseHandler.getUsersMeta,
    '/notReal': jsonResponseHandler.notFound,
    // notFound: jsonResponseHandler.notFoundMeta
  },
  POST: {
    '/addUser': jsonResponseHandler.parseBody,
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
});
