function showAllPrices(){
  bittrexPrices();
}

// Bitcoin
// =============================================================================
var btcPrice;
var btcPriceUpdated;

function BTCPrice(){
  var request = "https://api.coinbase.com/v2/prices/spot?currency=USD"
  btcRequestObj.open("GET", request, true);
  btcRequestObj.setRequestHeader("CB-VERSION", "2017-05-19");
  btcRequestObj.send(null);
}

function updateBTCPrice(){
  var response = JSON.parse(btcRequestObj.responseText);
  btcPrice = response["data"]["amount"];
}

var btcRequestObj = new XMLHttpRequest();
btcRequestObj.addEventListener("load", updateBTCPrice, false);

// Bittrex cryptos (All are relative to BTC price)
// =============================================================================
var requestObjects = [];
var tickers = ['ETH', 'LTC', 'XRP', 'OMG', 'NEO'];
function bittrexPrices(){
  for(var i = 0; i < tickers.length; i++){
    sendGetPriceRequest(i);
  }
}

function sendGetPriceRequest(index) {
  requestObjects[index] = new XMLHttpRequest();
  requestObjects[index].addEventListener("load", function(){ showPrice(index) }, false);
  var request = 'http://54.153.21.3:8080/api/getprice/'; //EC2 IP address TODO: Get elastic IP
  request += 'BTC-' + tickers[index];
  requestObjects[index].open("GET", request, true);
  requestObjects[index].send(null);
}

function showPrice(index){
  var response = JSON.parse(requestObjects[index].responseText);
  var price = btcPrice*response["price"];
  document.getElementById(tickers[index]).value = price;
}

/* ------------------------------------------------------------------------- */

BTCPrice();
document.getElementById("calculate_button").addEventListener("click", showAllPrices, false);
