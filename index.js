// Calendário graduação em: https://www.dirgrad.cefetmg.br/dirgrad/calendario/
// Calendário médio-técnico em: https://www.ns.cefetmg.br/calendarios/

// Util 1: https://www.npmjs.com/package/twit   ||    https://github.com/ttezel/twit
// Util 2: https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/Date

const Twit = require("twit");
//const express = require("express");
require("dotenv").config();

/*
const app = express();
const PORT = process.env.PORT || 3030;

app.listen(PORT, () => {
  console.log(`Server initialized on port ${PORT}`);
})
*/

const collegeVacation_BH = new Date(2022,01,21);
const highSchoolVacation_BH = new Date(2022,01,18);

// 86400000ms = 24h
// 82800000ms = 23h

// 43200000ms = 12h
// 39600000ms = 11h

// 3600000ms = 1h
// 600000ms = 10min
const cooldownUpdate = 600000;
const cdBetweenTweet = 600000;

let collegeVacations = false;
let highSchoolVacations = false;

let collegeDays = get_diffDate(collegeVacation_BH);
let highSchoolDays = get_diffDate(highSchoolVacation_BH);

let type;

const bot = new Twit({
  consumer_key: process.env.CONSUMER_KEY,  
  consumer_secret: process.env.CONSUMER_SECRET,    
  access_token: process.env.ACCESS_TOKEN,  
  access_token_secret: process.env.ACCESS_TOKEN_SECRET,
  timeout_ms: 60 * 1000
});

function main(){
  if(!collegeVacations){
    type = 'college';
    if(collegeDays > 0){
      postTweet(type, collegeDays);
    } else if(collegeDays == 0) {
      collegeVacations = true;
      postVacationTweet(type)
    }
  }

  setTimeout(function(){
    if(!highSchoolVacations){
      type = 'highSchool';
      if(highSchoolDays > 0){
        postTweet(type, highSchoolDays);
      } else if(highSchoolDays == 0) {
        highSchoolVacations = true;
        postVacationTweet(type)
      }
    }
  }, tweetBetweenTweetMS);
}

async function postTweet(type, days) {
  let tweet = writeTweet(type, days);

  await bot.post(     
    'statuses/update', 
    {status: tweet},
    function(err, data, response) { 
      if (err) {
        console.log(err + " --> " + tweet);                    
        return false;
      }
      console.log(` Tweet do tipo (${type}) postado com sucesso :) `);       
    }
  )
}

function writeTweet(type, days){
  let tweet = ` 
  🗓️ (Belo Horizonte): `;

  if(type == 'college'){
    if(days > 1){
    tweet += `
- Faltam ${days} dias para as férias de graduação do CEFET-MG.`;
    } else if (days == 1){
      tweet += `
- Falta apenas ${days} FUCKING dia para as férias de graduação do CEFET-MG :)`;
    } 


  } else if (type == 'highSchool') {
    if(days > 1){
      tweet += `
- Faltam ${days} dias para as férias do ensino médio-técnico do CEFET-MG.`;
    } else if (days == 1){
      tweet += `
- Falta apenas ${days} FUCKING dia para as férias do ensino médio-técnico do CEFET-MG :)`;
    }
  }

  tweet += `

#fighting 🏄🌊`;

  return tweet;
}

async function postVacationTweet(type){
  let tweet = ` 
  🗓️ (Belo Horizonte):`;

  if(type == 'college'){
    // Tweet de férias GRADUAÇÃO c/ media aqui. (@PabloFLPs)
    tweet += `
enfim FÉRIAS para graduação do CEFET-MG.`;
  }

  if(type == 'highSchool'){
    // Tweet de férias ENSINO MÉDIO c/ media aqui. (@PabloFLPs)
    tweet += `
enfim FÉRIAS para o ensino médio-técnico do CEFET-MG.`;
  }

  // Ver se é esse mesmo método que posta o tweet com media (@PabloFLPs)
  await bot.post(     
    'statuses/update', 
    {status: tweet},
    function(err, data, response) { 
      if (err) {
        console.log(err + " --> " + tweet);                    
        return false;
      }
      console.log(` Tweet do tipo (${type}) postado com sucesso :) `);       
    }
  )
}

function get_currDate(){
  let curr_date = new Date();
  let day = String(curr_date.getDate()).padStart(2, '0');
  let month = String(curr_date.getMonth() + 1).padStart(2, '0');
  let year = curr_date.getFullYear();
  return curr_date;
}
 
function get_diffDate(targetDate){
  let diffTime = (targetDate - get_currDate());
  let diffDays = Math.ceil(diffTime/ (1000 * 3600 * 24)); 
  return diffDays;
}

function randomNumber(){
  return Math.floor(Math.random() * 65536) - 32768;
}

main();
setInterval(main, cooldownUpdate);