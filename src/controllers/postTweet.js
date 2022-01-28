const writeTweet = require("./writeTweet.js")
const Twit = require("twit");

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
        let tweet = writeTweet.write(type, days);
    
        await bot.post(     
            'statuses/update', 
            {status: tweet},
            function(err, data, response) { 
                if (err) {
                    console.log(err + " --> " + tweet);                    
                    return false;
                }
                console.log(`Tweet do tipo (${type}) postado com sucesso :) `);       
            }
        )
    }
}
