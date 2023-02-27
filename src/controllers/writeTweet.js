// Importing Menu controller:
const menu = require("./menu.js")

// Random hashtags to use on tweet
const hashTagsArr = ['fighting', 'NãoParaNãoParaNãoParaNão', 'precisandoDeFérias', 'hashtag', 'tatakae', 'estudando', 'procrastinando', 'acabaLogoSemestre', 'dor'];

// Randomizer hashtags:
function randomNumber(){
    return Math.floor(Math.random() * (hashTagsArr.length));
}

const WEEKEND_CODE = 0
const HOLIDAY_CODE = -1

module.exports = {
    write: function writeTweet(type, days){
        let tweet = ``;
    
        if(type == 'college'){
            if(days > 1){
                tweet += `
🗓️ (Graduação - Todas as unidades de MG):
- Faltam ${days} dias para as férias da graduação do CEFET-MG.`;
            } else if (days == 1){
                tweet += `
🗓️ (Graduação - Todas as unidades de MG):
- Falta apenas ${days} FUCKING dia para as férias da graduação do CEFET-MG :)`;
            }
        } 
        
        else if (type == 'highSchool') {
            if(days > 1){
                tweet += `
🗓️ (E. Médio-Técnico - Belo Horizonte): 
- Faltam ${days} dias para as férias do ensino médio-técnico do CEFET-MG.`;
            } else if (days == 1){
                tweet += `
🗓️ (E. Médio-Técnico - Belo Horizonte): 
- Falta apenas ${days} FUCKING dia para as férias do ensino médio-técnico do CEFET-MG :)`;
            }
        }

        else if(type == 'menu') {
            currMenu = menu.getCurrMenu()
            if (currMenu == WEEKEND_CODE){
                tweet +=  `
                ⭕ Ih, fim de semana não tem comida no RU :(`
            } else if (currMenu == HOLIDAY_CODE){
                tweet +=  `
                🤔 Opa, parece que hoje é recesso/feriado então não tem comida no RU. FERIADOU. `
            } else {
                tweet +=  ` ● Cardápio do dia:
- ${currMenu[4]} e ${currMenu[5]}
- ${currMenu[0]}
- ${currMenu[1]}
- ${currMenu[2]}
- ${currMenu[3]}
- ${currMenu[6]}, ${currMenu[7]}, ${currMenu[8]} e ${currMenu[9]}
- ${currMenu[10]}`
            }
        }
    
        if(type != 'menu'){
            tweet += `
    
            #${hashTagsArr[randomNumber()]} 🏄🌊`;
        }
    
        return tweet;
    }
}
