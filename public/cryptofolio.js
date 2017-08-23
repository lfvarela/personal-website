function showAll(){
  BTCPrice();
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

function showETHPrice(){
  var response = JSON.parse(xhr.responseText);
  if(response["success"] == true){
    var ethPrice =  response["result"]["Last"];
    document.getElementById("ETH").value = ethPrice;
  }
}

/* ------------------------------------------------------------------------- */


document.getElementById("calculate_button").addEventListener("click", showAll, false);
