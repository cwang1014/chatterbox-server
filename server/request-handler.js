/*************************************************************

You should implement your request handler function in this file.

requestHandler is already getting passed to http.createServer()
in basic-server.js, but it won't work as is.

You'll have to figure out a way to export this function from
this file and include it in basic-server.js so that it actually works.

*Hint* Check out the node module documentation at http://nodejs.org/api/modules.html.
// { 'username': 'dummy', 'text': 'text', 'roomname': 'lobby', 'message_id': 1 }
**************************************************************/
var messageData = [];
var requestHandler = function (request, response) {
  // See the note below about CORS headers.
  var headers = defaultCorsHeaders;
  // Request and Response come from node's http module.
  //
  // They include information about both the incoming request, such as
  // headers and URL, and about the outgoing response, such as its status
  // and content.
  //
  // Documentation for both request and response can be found in the HTTP section at
  // http://nodejs.org/documentation/api/

  // Do some basic logging.
  //
  // Adding more logging to your server can be an easy way to get passive
  // debugging help, but you should always be careful about leaving stray
  // console.logs in your code.
  console.log('Serving request type ' + request.method + ' for url ' + request.url);
  //use request.method to check method type
  //use request.url to check url
  if (request.url === '/classes/messages') {
    if (request.method === 'GET') {
      let statusCode = 200;
      response.writeHead(statusCode, headers);
      response.end(JSON.stringify(messageData));
    } else if (request.method === 'POST') {
      let statusCode = 201;
      let body = '';
      request.on('data', chunk => {
        body += chunk;
      });
      request.on('end', () => {
        messageData.push(JSON.parse(body));
        response.writeHead(statusCode, headers);
        response.end('great success');
      });
    } else if (request.method === 'OPTIONS') {
      let statusCode = 200;
      response.writeHead(statusCode, headers);
      response.end();
    }
  } else {
    let statusCode = 404;
    // do error things
    response.writeHead(statusCode, headers);
    response.end('error');
  }

  // The outgoing status.
  //var statusCode = 200;
  // Tell the client we are sending them plain text.
  //
  // You will need to change this if you are sending something
  // other than plain text, like JSON or HTML.
  headers['Content-Type'] = 'application/JSON';

  // .writeHead() writes to the request line and headers of the response,
  // which includes the status and all headers.
  //response.writeHead(statusCode, headers);

  // Make sure to always call response.end() - Node may not send
  // anything back to the client until you do. The string you pass to
  // response.end() will be the body of the response - i.e. what shows
  // up in the browser.
  //
  // Calling .end "flushes" the response's internal buffer, forcing
  // node to actually send all the data over to the client.
  //response.end('Hello, World!');
};

// These headers will allow Cross-Origin Resource Sharing (CORS).
// This code allows this server to talk to websites that
// are on different domains, for instance, your chat client.
//
// Your chat client is running from a url like file://your/chat/client/index.html,
// which is considered a different domain.
//
// Another way to get around this restriction is to serve you chat
// client from this domain by setting up static file serving.
var defaultCorsHeaders = {
  'access-control-allow-origin': '*',
  'access-control-allow-methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'access-control-allow-headers': 'content-type, accept, authorization',
  'access-control-max-age': 10 // Seconds.
};

module.exports.requestHandler = requestHandler;