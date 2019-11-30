'use strict';

var fs = require('fs'),
    path = require('path'),
    http = require('http');

var jwt = require('jsonwebtoken');
var app = require('connect')();

var swaggerTools = require('swagger-tools');
var jsyaml = require('js-yaml');
var serverPort = 80;


const rateLimit = require("express-rate-limit");
const limiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 60 minutes = 60 x 60sec x 1000 milisec
  max: 200 // limit each IP to 100 requests per windowMs
});

//static serve 
var serveStatic = require('serve-static')

//ratelimiting for node server 
app.use(limiter)

//static routing 
app.use(serveStatic('public/css', { 'index': false }));

//middleware for Token verifikation 
app.use("/api/adventures",function jsonWebTokenValidatormiddleware(req, res, next) {
  try {
    var decode = jwt.verify(req.headers.token, process.env.paredrosSecretKey);
    console.log(decode)
    next();
  } catch(err) {
    res.statusCode = 401;
    res.end('Unauthorized');
  }
});

//app.use(cors({ credentials: true }))
// swaggerRouter configuration
var options = {
  swaggerUi: path.join(__dirname, '/swagger.json'),
  controllers: path.join(__dirname, './controllers'),
  useStubs: process.env.NODE_ENV === 'development' // Conditionally turn on stubs (mock mode)
};

// The Swagger document (require it, build it programmatically, fetch it from a URL, ...)
var spec = fs.readFileSync(path.join(__dirname,'api/swagger.yaml'), 'utf8');
var swaggerDoc = jsyaml.safeLoad(spec);

// Initialize the Swagger middleware
swaggerTools.initializeMiddleware(swaggerDoc, function (middleware) {

  // Interpret Swagger resources and attach metadata to request - must be first in swagger-tools middleware chain
  app.use(middleware.swaggerMetadata());

  // Validate Swagger requests
  app.use(middleware.swaggerValidator());

  // Route validated requests to appropriate controller
  app.use(middleware.swaggerRouter(options));

  // Serve the Swagger documents and Swagger UI
  app.use(middleware.swaggerUi());

  // Start the server
  http.createServer(app).listen(serverPort, function () {
    console.log('Your server is listening on port %d (http://localhost:%d)', serverPort, serverPort);
    console.log('Swagger-ui is available on http://localhost:%d/docs', serverPort);
  });

});
module.exports = app;