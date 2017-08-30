// server.js (core from https://scotch.io/tutorials/build-a-restful-api-using-node-and-express-4)

// BASE SETUP
// =============================================================================

// call the packages we need
var express    = require('express');        // call express
var app        = express();                 // define our app using express
var bodyParser = require('body-parser');

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 8080;        // set our port

// Add header for CORS (Cross-Origin Resource Sharing)
// =============================================================================
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

// ROUTES FOR OUR API
// =============================================================================
var router = express.Router();              // get an instance of the express Router

// test route to make sure API is up and running
router.get('/', function(req, res) {
  res.json({ 'message': 'RESTful API is up and running' });
});

// Route to get ETH price (to use: /api/getprice/BTC-ETH)
var bittrex = require('node.bittrex.api');
router.get('/getprice/:market', function(req, res) {

  // Get ETH price (in terms of BTC) from bittrex
  bittrex.getticker( { market:req.params.market }, function(data, err) {
    if(data['success'] == true){
      var price = data['result']['Last'];
      res.json({ 'price' : price });
    }
  });

});


// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);
