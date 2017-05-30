/**
 * Created by MrStock on 11/05/17.
 */

var Gdax = require('gdax');
var publicClient = new Gdax.PublicClient();

// WARNING ************* PRIVATE DATA *********************
// get your data from https://www.gdax.com/settings/api
const key             = 'your GDAX key';
const passphrase      = 'your passphrase';
const b64secret       = 'your b64secret';
// WARNING ************************************************

var authedClient = new Gdax.AuthenticatedClient(key, b64secret, passphrase);

console.log("GDAX sample !");

console.log("\n==========================================\n");

// get the last trade on GDAX ( BTC/USD )
var callbackTradePub = function(err, response, data) {
    // just print the json data to the console
    // console.log(data);

    // parse and print data
    if (data) {
        // data received as array, so look at [0] for the first value
        try {
            console.log("Last trade BTC/USD");
            console.log("Price : " + parseFloat(data[0].price));
            console.log("Side  : " + data[0].side);
            console.log("Size  : " + parseFloat(data[0].size));
        }catch(e){
            console.log("Error parsing data !");
        }
    }

    console.log("\n==========================================\n");
};

// Print your balance for each currency
var callbackAccounts = function(err, response, data) {
    // your code here.
    //console.log(data);

    // parse and print data
    if (data) {
        // data received as array
        try {
            for (var i = 0; i < data.length; i++) {
                console.log("Currency  : " + data[i].currency);
                console.log("Balance   : " + parseFloat(data[i].balance));
                console.log("Available : " + parseFloat(data[i].available));
                console.log("\n==========================================\n");
            }
        }catch(e){
            console.log("Error parsing data !");
        }
    }
};

function updateStatus() {
    // get the last trade on GDAX ( BTC/USD )
    publicClient.getProductTrades({'limit': 1}, callbackTradePub);

    // wait to avoid overlapping on console
    setTimeout(function(){
        authedClient.getAccounts(callbackAccounts);
    }, 1500); // 1.5 secs
}

// main
updateStatus();
setInterval(updateStatus, 10000); // refresh every 10 secs
