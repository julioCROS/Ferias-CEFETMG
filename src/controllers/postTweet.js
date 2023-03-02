const writeTweet = require("./writeTweet.js")
const Twit = require("twit");

// Importing get_CurrDate() controller:
const date = require("./date.js")

// Importing dotenv dependency config:
require("dotenv").config();

// Creating auth bot:
const bot = new Twit({
    consumer_key: process.env.CONSUMER_KEY,  
    consumer_secret: process.env.CONSUMER_SECRET,    
    access_token: process.env.ACCESS_TOKEN,  
    access_token_secret: process.env.ACCESS_TOKEN_SECRET,
    timeout_ms: 60 * 1000
});

module.exports = {
    post: async function postTweet(type, days) {
        let tweet = writeTweet.write(type, days, false);
        /*await bot.post(     
            'statuses/update', 
            {status: tweet},
            function(err, data, response) { 
                if (err) {
                    console.log(' [POST_TWEET.JS] ' + err + ");                    
                    return false;
                }
                console.log(`\n[${date.getCurrDate().getDate()}/${date.getCurrDate().getMonth()}/${date.getCurrDate().getFullYear()} - ${date.getCurrDate().getHours()}:${date.getCurrDate().getMinutes()}:${date.getCurrDate().getSeconds()} GMT-0300 (Horário Padrão de Brasília)] Tweet do tipo (${type}) postado com sucesso.`);       
            }
        )*/
    }
}
