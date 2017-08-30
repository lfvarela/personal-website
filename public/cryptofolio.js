function updateAll(){
  resetTotal();
  BTCPrice();
  showTempValues();
  document.getElementById("warning").innerHTML = "Waiting for prices"
  setTimeout(() => {
    bittrexPrices();
  }, 1000);
  setTimeout(()=> {
    showTotal();
    document.getElementById("warning").innerHTML = "Done";
  }, 2000);
}

function numToShortStr(number){
  return number.toString().substring(0,6);
}


function resetTotal(){
  total = 0;
  document.getElementById("total").value = "";
}


function showTotal(){
  document.getElementById("total").value = parseFloat(Math.round(total * 100) / 100).toFixed(2);;
}


function calculateManual(){
  resetTotal();
  for(var i = 0; i < tickers.length; i++){
    var price = document.getElementById(tickers[i]).value;
    var kCoins = document.getElementById("k" + tickers[i]).value;
    var value = price * kCoins;
    document.getElementById("t" + tickers[i]).value = value;
    total += value;
  }
  showTotal();
}


function showTempValues(){

  //PLR
  var PLRprice = document.getElementById('PLR').value;
  var kPLR = document.getElementById('kPLR').value;
  var PLRvalue = PLRprice * kPLR;
  total += PLRvalue;
  document.getElementById('tPLR').value = numToShortStr(PLRvalue);

  // DNT
  var DNTprice = document.getElementById('DNT').value;
  var kDNT = document.getElementById('kDNT').value;
  var DNTvalue = DNTprice * kDNT;
  total += DNTvalue;
  document.getElementById('tDNT').value = numToShortStr(DNTvalue);

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
var pricesLoaded = false;
var total = 0

// Send all requests to Bittrex
function bittrexPrices(){
  for(var i = 0; i < tickers.length; i++){
    sendGetPriceRequest(i);
  }
}

// Send a request to bittrex for tickers[index]
function sendGetPriceRequest(i) {
  requestObjects[i] = new XMLHttpRequest();
  requestObjects[i].addEventListener("load", function(){ showPrice(i) }, false);
  var request = 'http://54.153.21.3:8080/api/getprice/'; //EC2 IP address TODO: Get elastic IP
  request += 'BTC-' + tickers[i];
  requestObjects[i].open("GET", request, true);
  requestObjects[i].send(null);
}

// Show prices gotten from response in client
function showPrice(i){
  var response = JSON.parse(requestObjects[i].responseText);
  var price = btcPrice*response["price"];
  document.getElementById(tickers[i]).value = numToShortStr(price);
  var kCoins = document.getElementById("k" + tickers[i]).value;
  var value = price * kCoins;
  document.getElementById("t" + tickers[i]).value = numToShortStr(value);
  if(tickers[i] == 'ETH'){
    DAT();
  }
  total += value;
}

// Get and show DAT price, which depends on ETH price, thus in showPrice we call
// DAT() when ETH price has been loaded.
function DAT(){
  var ETHprice = document.getElementById('ETH').value;
  var DATprice = ETHprice / 10000;
  var kCoins = document.getElementById('kDAT').value;
  document.getElementById('DAT').value = numToShortStr(DATprice);
  var DATvalue = DATprice * kCoins;
  document.getElementById('tDAT').value = numToShortStr(DATvalue);
  total += DATvalue;
}

/* ------------------------------------------------------------------------- */


// Running script
updateAll();
document.getElementById("prices_button").addEventListener("click", updateAll, false);
document.getElementById("values_button").addEventListener("click", calculateManual, false);
