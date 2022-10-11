const query = require('querystring');

// a list of added pixels, their position index, their color index, and their author
const pixels = {};

const leaderboardUsers = {
  '-1': {},
  0: {},
  1: {},
  2: {},
  3: {},
  4: {},
  5: {},
  6: {},
  7: {},
  8: {},
  9: {},
  10: {},
  11: {},
  12: {},
  13: {},
  14: {},
  15: {},
};
const leaderboardColorsTotal = {
  '-1': 0,
  0: 0,
  1: 0,
  2: 0,
  3: 0,
  4: 0,
  5: 0,
  6: 0,
  7: 0,
  8: 0,
  9: 0,
  10: 0,
  11: 0,
  12: 0,
  13: 0,
  14: 0,
  15: 0,
};

// when a change to a pixel happens, we set this value to the current time
// then when we want to get HEAD requests, we send this value a long so we
// can compare it to the last update time the client has
// if the client is older than the server, then send the updated info.
// if not, dont send anything! saves on data yo!
let lastUpdateTime;

// when the server starts up, gotta set its first time stamp to something!
const initLastUpdateTime = () => {
  lastUpdateTime = Date.now();
};

// sends a JSON response with status code and body to client
const respondJSON = (request, response, status, object) => {
  response.writeHead(status, { 'Content-Type': 'application/json', lastUpdateTime });
  // gotta stringify to get it to just text (which we can actually send)
  response.write(JSON.stringify(object));
  response.end();
};

// sends a JSON response with status code and NO body to client
const respondJSONMeta = (request, response, status) => {
  response.writeHead(status, { 'Content-Type': 'application/json', lastUpdateTime });
  // gotta stringify to get it to just text (which we can actually send)
  response.end();
};

// adds the object with our stored pixels to a json object and
// sends it to the client
const getGrid = (request, response) => {
  // json object to send
  const responseJSON = {
    message: pixels,
  };

  // return 200 with message
  return respondJSON(request, response, 200, responseJSON);
};

// params will be:
// c: colorIndex, -1 for ALL
const getLeaderboard = (request, response, params) => {
  // json object to send
  const responseJSON = {
    total: leaderboardColorsTotal[params.c],
    users: leaderboardUsers[params.c],
  };

  // return 200 with message
  return respondJSON(request, response, 200, responseJSON);
};

// sends the client just the time stamp of the server's latest update
// should be used for the client to compare their timestamp
// to the servers to see if it needs to fully update
const getGridMeta = (request, response) => {
  respondJSONMeta(request, response, 200);
};

// used with POST, client sends an object with positon index,
// color index, and their username to the server, and this determines
// if the user supplied a valid username, if the pixel has already been created
// or if the pixel is new!
const setPixel = (request, response, body) => {
  const responseJSON = {
    message: 'You need to type in a username!',
  };

  // checks if the params are existent or not, if not -> bad request
  if (!body.a) {
    responseJSON.id = 'setPixelMissingUsername';
    return respondJSON(request, response, 400, responseJSON);
  }

  // if this user has never been added to the leadersboard
  // then we should start them at 0
  if (!leaderboardUsers[body.c][body.a]) {
    leaderboardUsers[body.c][body.a] = 0;
  }
  if (!leaderboardUsers['-1'][body.a]) {
    leaderboardUsers['-1'][body.a] = 0;
  }

  // increment the total time this color has been placed
  leaderboardColorsTotal[body.c]++;
  leaderboardColorsTotal['-1']++;

  // increment how many times this user has placed this color
  leaderboardUsers[body.c][body.a]++;
  leaderboardUsers['-1'][body.a]++;

  let statusCode = 201;

  // set time code;
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

  // store our new pixel and send back response
  pixels[body.i] = newPixel;

  return respondJSONMeta(request, response, statusCode);
};

// looks through the chunks of data the client is sending to the server
// and properly parses out the body (paramaters that we sent)
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

// 404, couldnt find anything, get outta 'ere!
const notFound = (request, response) => {
  const responseJSON = {
    message: 'The page you are looking for was not found.',
    id: 'notFound',
  };

  respondJSON(request, response, 404, responseJSON);
};

// export our functions to be used in server.js
module.exports = {
  getGrid,
  getGridMeta,
  getLeaderboard,
  parseBody,
  notFound,
  initLastUpdateTime,
};
