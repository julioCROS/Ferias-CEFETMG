// Importing Menu controller:
const menu = require("./menu.js");

// Random hashtags and emojis to use on tweet
const hashTagsArr = ['fighting', 'NãoParaNãoParaNãoParaNão', 'precisandoDeFérias', 'hashtag', 'tatakae', 'chama', 'estudando', 'procrastinando', 'acabaLogoSemestre', 'dor', 'help'];
const hashTagsEmojisArr = ['🏄🌊', '🖕🔥🖕', '🚴‍♂️💨', '💪🔥', '🆘', '🤡', '😎🤳', '🦖💨', '🍷🗿', '🕳️🧎🏻'];
const menuEmojisArr = ['🍲', '🍔', '🍽️', '☕', '🧆', '🍴', '🍚']

const WEEKEND_CODE = 0;
const HOLIDAY_CODE = -1;
const UNDEFINED_CODE = -2;

// Randomizer hashtags:
function randomNumber(arr){
    return Math.floor(Math.random() * (arr.length));
}

module.exports = {
    write: function writeTweet(type, days, firstDay){
        let tweet = ``;
        if(type == 'college'){
            if(firstDay == true){
                tweet += `
🗓️  (Graduação - Todas as unidades de MG):
Hmm, alguma hora as férias tinham que acabar né :(
Recomeçando mais um semestre, bons estudos e boa sorte família.

- Faltam INCRÍVEIS ${days} dias para as férias da graduação do CEFET-MG.`;
            }
            else if(days > 1){
                tweet += `
🗓️  (Graduação - Todas as unidades de MG):
- Faltam ${days} dias para as férias da graduação do CEFET-MG.`;
            } else if (days == 1){
                tweet += `
🗓️  (Graduação - Todas as unidades de MG):
- Falta apenas ${days} FUCKING dia para as férias da graduação do CEFET-MG :)`;
            } else if (days < 1){
                tweet = `
🗓️ (Graduação - Todas as unidades de MG):
acabou, Acabou, ACABOU. FINALMENTE FÉRIAS para a graduação 🥳🙏

bom descanso à todos, aproveitem suas férias e até o proximo semestre. 🏄‍♂️🌊

#férias`;    }
        } 
        
        else if (type == 'highSchool') {
            if(firstDay == true){
                tweet += `
🗓️  (E. Médio-Técnico - Belo Horizonte): 
Only sad reactions familía, acabou o sossego 💀
Bora começar mais um semestre cefetinhos. Bons estudos e boa sorte. 

- Faltam INCRÍVEIS ${days} dias para as férias do ensino médio-técnico do CEFET-MG.`;
            }
            else if(days > 1){
                tweet += `
🗓️  (E. Médio-Técnico - Belo Horizonte): 
- Faltam ${days} dias para as férias do ensino médio-técnico do CEFET-MG.`;
            } else if (days == 1){
                tweet += `
🗓️  (E. Médio-Técnico - Belo Horizonte): 
- Falta apenas ${days} FUCKING dia para as férias do ensino médio-técnico do CEFET-MG :)`;
            } else if (days < 1){
                tweet = `
🗓️ (E. Médio-Técnico - Belo Horizonte): 
enfim LIBERDADE desse Oceano de Pedras para a galera do ensino médio-técnico! 🥳🎉🌍

Ótimas férias a todos, #StoneFree

#férias`;
            }
        }

        else if(type == 'menu') {
            currMenu = menu.getCurrMenu();
            if (currMenu[0] == WEEKEND_CODE){
                if(currMenu[1] == 'Sábado'){
                    tweet +=  `
⭕ Ih, hoje não tem RU :( mas é fim de semana, então safe xD. #FimDeSemanaComecou`;
                } else if(currMenu[1] == 'Domingo'){
                    tweet +=  `
⭕ Domingão não tem bandejão, #Domingou`;
                }
            } else if (currMenu[0] == HOLIDAY_CODE){
                tweet +=  `
🤔 Opa, parece que hoje é recesso/feriado então não tem comida no RU. #FERIADOU. `;
            } else if (currMenu[0] == UNDEFINED_CODE){
                tweet +=  `
😬 F familía, parece que não liberaram o cardápio desse mês ainda ou se liberaram deu algum erro aqui, alou @julio_CROS @pablo_felps xD`;
            }else {
                tweet +=  `${menuEmojisArr[randomNumber(menuEmojisArr)]} Cardápio do dia:
- ${currMenu[4]} e ${currMenu[5]}
- ${currMenu[0]}
- ${currMenu[1]}
- ${currMenu[2]}
- ${currMenu[3]}
- ${currMenu[6]}, ${currMenu[7]}, ${currMenu[8]} e ${currMenu[9]}
- ${currMenu[10]}`
            }
        }
    
        if(type != 'menu' && days >= 1){
            tweet += `
    
#${hashTagsArr[randomNumber(hashTagsArr)]} ${hashTagsEmojisArr[randomNumber(hashTagsEmojisArr)]}`;
        }
        console.log("\n [WRITE_TWEET.JS] [" + tweet + "] \n");
        return tweet;
    }
}
