// Randomizer:
function randomNumber(){
    return Math.floor(Math.random() * 65536) - 32768;
}

const fs = require('fs');
const Twit = require("twit");
const path = require('path');

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
    post: async function postVacationTweet(type){
        // Tweet header:
        let tweet = ``;
      
        if(type == 'college'){
            tweet += `
🗓️ (Graduação - Todas as unidades de MG):
acabou, acabou, ACABOU. É FÉRIASSS para a graduação 🥳🙏

bom descanso à todos, e até o proximo semestre. 🏄‍♂️🌊

#ferias`;

            const dir_file1 = path.join(__dirname, "../assets/e-tetra-pele.gif");
            const content = fs.readFileSync(dir_file1, { encoding: 'base64' });

            await bot.post(
                'media/upload',
                { media_data: content },
                
                function (err, data, response) {
                    if (err) {
                        console.log(err);
                        return false
                    }
                    console.log('Image uploaded.');

                    bot.post(
                        'statuses/update',
                        {status: tweet, media_ids: new Array(data.media_id_string)},

                        function(err, data, response) {
                            if (err){
                                console.log(err);
                                return false
                            }
                            console.log('Posted!');
                        }
                    )
                }
            )
        }
      
        if(type == 'highSchool'){
            tweet += `
🗓️ (E. Médio-Técnico - Belo Horizonte): 
enfim LIBERDADE desse Oceano de Pedras para a galera do ensino médio-técnico! 🥳🎉🌍

Ótimas férias a todos, #StoneFree

- Jourim Kujoh 🏄‍♂️🌊

#ferias`;

            const dir_file2 = path.join(__dirname, "../assets/freedom-colorful.jpg");
            const content = fs.readFileSync(dir_file2, { encoding: 'base64' });

            await bot.post(
                'media/upload',
                { media_data: content },
                
                function (err, data, response) {
                    if (err) {
                        console.log(err);
                        return false
                    }
                    console.log('Image uploaded.');

                    bot.post(
                        'statuses/update',
                        {status: tweet, media_ids: new Array(data.media_id_string)},

                        function(err, data, response) {
                            if (err){
                                console.log(err);
                                return false
                            }
                            console.log('Posted!');
                        }
                    )
                }
            )
        }
    }
}
