// Middleware for Morgan Logger.  The following information is sent
//Request Type, URL, Status code, Response content length, Response time, Request content being sent
var morgan = require("morgan");
//A Token is created for the content part (req.body) which is passed through the Morgan Middleware
morgan.token("req-body", function (req, res) {
  return JSON.stringify(req.body);
});
const morganLogger = morgan(
  ":method :url :status :res[content-length] - :response-time ms  :req-body"
);

// Middleware for unknown endpoint
// Any request that isn't caught by the above two, will 'fall' into this
const unknownEndpoint = (request, response, next) => {
  console.log("Unknown endpoint");
  return response.status(404).send({ error: "unknown endpoint" });
};

module.exports = {
  morganLogger,
  unknownEndpoint,
};
