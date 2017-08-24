var express = require('express');
var app = express();

var port = 3000;

app.use('/', express.static(__dirname + '/public'));

app.listen(port, function() {
  console.log('listening on port ' + port)
});


var bittrex = require('node.bittrex.api');

var Ethereum = module.exports = {
    price: 0,

    updatePrice: function() {
      bittrex.getticker( {market:'BTC-LTC'}, function(data, err) {
        Ethereumeth.price = data;
      });
    },
}
