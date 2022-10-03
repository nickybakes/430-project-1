const query = require('querystring');

// a list of added pixels, their color, and their author
const pixels = {};

// when a change to a pixel happens, we set this value to the current time
// then when we want to get HEAD requests, we send this value a long so we
// can compare it to the last update time the client has
// if the client is older than the server, then send the updated info.
// if not, dont send anything! saves on data yo!
let lastUpdateTime;

const initLastUpdateTime = () => {
  lastUpdateTime = Date.now();
}

const respondJSON = (request, response, status, object) => {
  response.writeHead(status, { 'Content-Type': 'application/json', 'lastUpdateTime': lastUpdateTime});
  // gotta stringify to get it to just text (which we can actually send)
  response.write(JSON.stringify(object));
  response.end();
};

const respondJSONMeta = (request, response, status) => {
  response.writeHead(status, { 'Content-Type': 'application/json', 'lastUpdateTime': lastUpdateTime});
  // gotta stringify to get it to just text (which we can actually send)
  response.end();
};

// get user object
const getGrid = (request, response) => {
  // json object to send
  const responseJSON = {
    message: pixels,
  };

  // return 200 with message
  return respondJSON(request, response, 200, responseJSON);
};

// just returns meta, no big message/data
const getGridMeta = (request, response) => {
  respondJSONMeta(request, response, 200);
};

const setPixel = (request, response, body) => {
  const responseJSON = {
    message: 'You need to type in a username!',
  };

  // checks if the params are existent or not, if not -> bad request
  if (!body.a) {
    responseJSON.id = 'setPixelMissingUsername';
    return respondJSON(request, response, 400, responseJSON);
  }

  let statusCode = 201;

  lastUpdateTime = Date.now();

  // if our pixel already exists:
  if (pixels[body.i]) {
    statusCode = 204;
    pixels[body.i].c = body.c;
    pixels[body.i].a = body.a;
    return respondJSONMeta(request, response, statusCode);
  }

  // if not, make a new one!
  const newPixel = {
    i: body.i,
    c: body.c,
    a: body.a,
  };

  // set time code;

  pixels[body.i] = newPixel;

  return respondJSONMeta(request, response, statusCode);
};

const parseBody = (request, response) => {
  const body = [];

  request.on('error', (error) => {
    console.log(error);
    response.statusCode = 400;
    response.end();
  });

  request.on('data', (chunk) => {
    body.push(chunk);
  });

  request.on('end', () => {
    const bodyString = Buffer.concat(body).toString();
    const bodyParams = query.parse(bodyString);

    setPixel(request, response, bodyParams);
  });
};

const notFound = (request, response) => {
  const responseJSON = {
    message: 'The page you are looking for was not found.',
    id: 'notFound',
  };

  respondJSON(request, response, 404, responseJSON);
};

// exports to set functions to public.
// In this syntax, you can do getIndex:getIndex, but if they
// are the same name, you can short handle to just getIndex,
module.exports = {
  getGrid,
  getGridMeta,
  setPixel,
  parseBody,
  notFound,
  initLastUpdateTime,
};
