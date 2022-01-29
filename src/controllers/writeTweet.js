// Randomizer hashtags:
function randomNumber(){
    return Math.floor(Math.random() * (hashTagsArr.length));
  }

const hashTagsArr = ['fighting', 'NãoParaNãoParaNãoParaNão', 'precisandoDeFérias', 'hashtag', 'tatakae', 'estudando', 'procrastinando', 'acabaLogoSemestre', 'dor'];

module.exports = {
    write: function writeTweet(type, days){
        let tweet = ``;
    
        if(type == 'college'){
            if(days > 1){
                tweet += `
🗓️ (Graduação - Todas as unidades de MG):
- Faltam ${days} dias para as férias de graduação do CEFET-MG.`;
            } else if (days == 1){
                tweet += `
🗓️ (Graduação - Todas as unidades de MG):
- Falta apenas ${days} FUCKING dia para as férias de graduação do CEFET-MG :)`;
            }
        } else if (type == 'highSchool') {
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
    
        tweet += `
    
#${hashTagsArr[randomNumber()]} 🏄🌊`;
    
        return tweet;
    }
}
