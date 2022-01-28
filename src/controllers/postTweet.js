const writeTweet = require("./writeTweet.js")

const Twit = require("twit");

// Creating auth bot:
/*
const bot = new Twit({
    consumer_key: process.env.CONSUMER_KEY,  
    consumer_secret: process.env.CONSUMER_SECRET,    
    access_token: process.env.ACCESS_TOKEN,  
    access_token_secret: process.env.ACCESS_TOKEN_SECRET,
    timeout_ms: 60 * 1000
});
*/

const bot = new Twit({
    consumer_key: "Xw4F4lsVsCYisSbmV9wgNzXtj",  
    consumer_secret: "HjnJXmRDiV9laZU0HgWLkCZ8dvW5YaI2r1lwjZe5yusAB0biAD",    
    access_token: "1485743747400929285-85FfNQ0OFz4QnbESU4qmyz3ojJlCC4",  
    access_token_secret: "x9UiXufChSXCafuFV8XcuayikKOSHQ8L09F1gK3KfNPH1",
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
