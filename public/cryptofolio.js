function showAll(){
  BTCPrice();
  ETHPrice();

}

/** ---------------------------------------------------------------------------
 * Deal with BTC Price
 */
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

/** ---------------------------------------------------------------------------
 * Deal with ETH Price
 */
function ETHPrice(){
  var request = "https://bittrex.com/api/v1.1/public/getticker?market=BTC-ETH"
  ethRequestObj.open("GET", request, true);
  ethRequestObj.setRequestHeader("Access-Control-Allow-Origin",null);
  ethRequestObj.send(null);
}

function showETHPrice(){
  var response = JSON.parse(ethRequestObj.responseText);
  if(response["success"] == true){
    var ethPrice =  response["result"]["Last"];
    document.getElementById("ETH").value = ethPrice;
  }
}

var ethRequestObj = new XMLHttpRequest();
ethRequestObj.addEventListener("load", showETHPrice, false);
/* ------------------------------------------------------------------------- */


document.getElementById("calculate_button").addEventListener("click", showAll, false);
