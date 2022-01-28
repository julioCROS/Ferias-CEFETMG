// Randomizer:
function randomNumber(){
    return Math.floor(Math.random() * 65536) - 32768;
}

module.exports = {
    write: function writeTweet(type, days){
        let tweet = ``;
    
        if(type == 'college'){
            if(days > 1){
                tweet += `
🗓️ (Graduação - Todas as unidades de MG):
- Faltam ${days} dias para as férias de graduação do CEFET-MG. (${randomNumber()})`;
            } else if (days == 1){
                tweet += `
🗓️ (Graduação - Todas as unidades de MG):
- Falta apenas ${days} FUCKING dia para as férias de graduação do CEFET-MG :)`;
            }
        } else if (type == 'highSchool') {
            if(days > 1){
                tweet += `
🗓️ (E. Médio-Técnico - Belo Horizonte): 
- Faltam ${days} dias para as férias do ensino médio-técnico do CEFET-MG. (${randomNumber()})`;
            } else if (days == 1){
                tweet += `
🗓️ (E. Médio-Técnico - Belo Horizonte): 
- Falta apenas ${days} FUCKING dia para as férias do ensino médio-técnico do CEFET-MG :)`;
            }
        }
    
        tweet += `
    
#fighting 🏄🌊`;
    
        return tweet;
    }
}
