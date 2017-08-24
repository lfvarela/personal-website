function showAllPrices(){
  BTCPrice();
  ETHPrice();
}

// Bitcoin
// =============================================================================
var btcPrice;

function BTCPrice(){
  var request = "https://api.coinbase.com/v2/prices/spot?currency=USD"
  btcRequestObj.open("GET", request, true);
  btcRequestObj.setRequestHeader("CB-VERSION", "2017-05-19");
  btcRequestObj.send(null);
}

function showBTCPrice(){
  var response = JSON.parse(btcRequestObj.responseText);
  btcPrice = response["data"]["amount"];
  document.getElementById("BTC").value = btcPrice;
}

var btcRequestObj = new XMLHttpRequest();
btcRequestObj.addEventListener("load", showBTCPrice, false);

// Ethereum
// =============================================================================
function ETHPrice() {
  var request = 'http://54.153.21.3:8080/api/getprice'; //EC2 IP address TODO: Get elastic IP
  request += '/BTC-ETH';
  ethRequestObj.open("GET", request, true);
  ethRequestObj.send(null);
}

function showETHPrice(){
  var response = JSON.parse(ethRequestObj.responseText);
  var ethPrice = btcPrice*response["price"];
  document.getElementById("ETH").value = ethPrice;
}

var ethRequestObj = new XMLHttpRequest();
ethRequestObj.addEventListener("load", showETHPrice, false);

/* ------------------------------------------------------------------------- */


document.getElementById("calculate_button").addEventListener("click", showAllPrices, false);
