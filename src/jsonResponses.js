const query = require('querystring');

//
const pixels = {};

const respondJSON = (request, response, status, object) => {
  response.writeHead(status, { 'Content-Type': 'application/json' });
  // gotta stringify to get it to just text (which we can actually send)
  response.write(JSON.stringify(object));
  response.end();
};

const respondJSONMeta = (request, response, status) => {
  response.writeHead(status, { 'Content-Type': 'application/json' });
  // gotta stringify to get it to just text (which we can actually send)
  response.end();
};

const users = {};

// get user object
const getUsers = (request, response) => {
  // json object to send
  const responseJSON = {
    message: users,
  };

  // return 200 with message
  return respondJSON(request, response, 200, responseJSON);
};

// just returns meta, no big message/data
const getUsersMeta = (request, response) => {
  respondJSONMeta(request, response, 200);
};

const addUser = (request, response, body) => {
  const responseJSON = {
    message: 'Name and age are both required.',
  };

  // checks if the params are existent or not, if not -> bad request
  if (!body.name || !body.age) {
    responseJSON.id = 'addUserMissingParams';
    return respondJSON(request, response, 400, responseJSON);
  }

  let statusCode = 204;

  if (!users[body.name]) {
    statusCode = 201;
    users[body.name] = {};
  }

  users[body.name].name = body.name;
  users[body.name].age = body.age;

  if (statusCode === 201) {
    responseJSON.message = 'Created Successfully';
    return respondJSON(request, response, statusCode, responseJSON);
  }

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

    addUser(request, response, bodyParams);
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
  getUsers,
  getUsersMeta,
  addUser,
  parseBody,
  notFound,
};
