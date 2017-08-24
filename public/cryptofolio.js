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
var tickers = ['ETH', 'LTC'];
var currTicker;
function bittrexPrices(){
  for(var i = 0; i < tickers.length; i++){
    currTicker = tickers[i];
    sendGetPriceRequest(currTicker);
    setTimeout(function(){ return; }, 1000);
  }
}

function sendGetPriceRequest(ticker) {
  var request = 'http://54.153.21.3:8080/api/getprice/'; //EC2 IP address TODO: Get elastic IP
  request += 'BTC-' + ticker;
  requestObj.open("GET", request, true);
  requestObj.send(null);
}

function showPrice(){
  var response = JSON.parse(requestObj.responseText);
  var price = btcPrice*response["price"];
  document.getElementById(currTicker).value = price;
}

var requestObj = new XMLHttpRequest();
requestObj.addEventListener("load", showPrice, false);

/* ------------------------------------------------------------------------- */

BTCPrice();
document.getElementById("calculate_button").addEventListener("click", showAllPrices, false);
