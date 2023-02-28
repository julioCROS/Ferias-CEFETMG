const fs = require('fs');
const Twit = require("twit");
const path = require('path');
const writeTweet = require("./writeTweet.js")

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

const imgFormats = ['gif', 'jpg'];
const imgQnty = 3;
let alreadySelected_FirstDay = [];
let alreadySelected_VacationDay = [];

// Image size must be <= 5242880 bytes (5.2mb)
function selectRandomImage(){
    selectedFormat = imgFormats[Math.floor(Math.random() * (imgFormats.length))]
    selectedImage = Math.floor(Math.random() * (imgQnty) + 1);
    return `${selectedImage}.${selectedFormat}`
}

module.exports = {
    post: async function postImageTweet(type, days, firstDay){ 
        console.log(" [POST_IMAGE_TWEET.JS] Post Image Tweet function: (type, days, firstDay) -> (" + type + ", " + days + ", " + firstDay + ")");   
        let tweet = writeTweet.write(type, days, firstDay);
        let dir_file = "";
        let selectedImg = "";
        if(firstDay) {
            selectedImg = selectRandomImage();
            while(alreadySelected_FirstDay.includes(selectedImg)){
                selectedImg = selectRandomImage();
            }
            dir_file = path.join(__dirname, "../assets/start/" + selectedImg);
            alreadySelected_FirstDay.push(selectedImg);
        } else {
            selectedImg = selectRandomImage();
            while(alreadySelected_VacationDay.includes(selectedImg)){
                selectedImg = selectRandomImage();
            }
            dir_file = path.join(__dirname, "../assets/end/" + selectedImg);
            alreadySelected_VacationDay.includes(selectedImg)
        }
        console.log(" [POST_IMAGE_TWEET.JS] Imagem selecionado: " + selectedImg + " (" + type + ") ");
        console.log(" ====== [POST_IMAGE_TWEET.JS] Already Selected First Day: " + alreadySelected_FirstDay);
        console.log(" ====== [POST_IMAGE_TWEET.JS] Already Selected Vacation Day: " + alreadySelected_VacationDay);
        const content = fs.readFileSync(dir_file, { encoding: 'base64' });
        await bot.post(
            'media/upload',
            { media_data: content },
            function (err, data, response) {
                if (err) {
                    console.log(err);
                    return false
                }
                console.log(' [POST_IMAGE_TWEET.JS] Imagem upada!');
                bot.post(
                    'statuses/update',
                    {status: tweet, media_ids: new Array(data.media_id_string)},

                    function(err, data, response) {
                        if (err){
                            console.log(' [POST_IMAGE_TWEET.JS]' + err);
                            return false
                        }
                        console.log(' [POST_IMAGE_TWEET.JS] Postado!');
                    }
                )
            }
        )
    }    
}
