// Calendário graduação em: https://www.dirgrad.cefetmg.br/dirgrad/calendario/
// Calendário médio-técnico em: https://www.ns.cefetmg.br/calendarios/

// Importing postTweet() controller:
const postTweet = require("./postTweet.js")

// Importing postVacationTweet() controller:
const postImageTweet = require("./postImageTweet.js")

// Importing get_CurrDate() controller:
const date = require("./date.js")

// Setting official college and highschool vacation dates:
const collegeVacation_BH = new Date(2023,6,14);
const highSchoolVacation_BH = new Date(2023,6,14);

// Setting official college and highschool start dates:
const collegeStart_BH = new Date(2023,2,2);
const highSchoolStart_BH = new Date(2023,2,2);

// Setting twetting interval/cooldown (ms): 8400000 // 1200000
const cdBetweenMenuVacationTweet = 8400000; // 2 Hours + 20 minutes
const cdBetweenVacationsTweet = 1200000; // 20 minutes

// Declaring boolean vacation states:
let collegeVacations = false;
let highSchoolVacations = false;

// Function to get the number of days to vacation:
function get_diffDate(targetDate){
    let diffTime = targetDate - date.getCurrDate();
    let diffDays = Math.ceil(diffTime/ (1000 * 3600 * 24)); 
    return diffDays;
}

// Declaring days to vacation:
let collegeDays = get_diffDate(collegeVacation_BH);
let highSchoolDays = get_diffDate(highSchoolVacation_BH);
let collegeFirstDay = get_diffDate(collegeStart_BH) == 0;
let highSchoolFirstDay = get_diffDate(highSchoolStart_BH) == 0;

// Declaring a type for college and highschool vacation types:
let type;

console.log(" [MAIN.JS] Dias para FACULDADE:", collegeDays)
console.log(" [MAIN.JS] Dias para E. MEDIO:", highSchoolDays)
console.log(" [MAIN.JS] 1o dia FACULDADE:", collegeFirstDay)
console.log(" [MAIN.JS] 1o dia E. MEDIO:", highSchoolFirstDay)

module.exports = {
    post: function main(){
        type = 'menu'
        postTweet.post(type, 0)
        // Calling collegeFunction in "cdBetweenMenuVacationTweet" miliseconds
        setTimeout(collegeFunction, cdBetweenMenuVacationTweet);

        function collegeFunction(){
            if(!collegeVacations){
                type = 'college';
                let curr_time = new Date();
                let currentTime = curr_time.getHours() + ":" + curr_time.getMinutes() + ":" + curr_time.getSeconds() 
                if(collegeFirstDay) { console.log("\n [" + currentTime + "] === [MAIN.JS] Entrando em 1o DIA FACULDADE: "); postImageTweet.post(type, collegeDays, collegeFirstDay);
                } else if(collegeDays > 0) { console.log("\n [" + currentTime + "] === [MAIN.JS] Entrando em dia comum FACULDADE: "); postTweet.post(type, collegeDays);
                } else if(collegeDays == 0) {
                    console.log("\n [" + currentTime + "] === [MAIN.JS] Entrando em FERIAS FACULDADE: ");
                    collegeVacations = true;
                    postImageTweet.post(type, collegeDays, collegeFirstDay);
                }
            }
            // Calling collegeFunction in "cdBetweenMenuVacationTweet" miliseconds
            setTimeout(highSchoolFunction, cdBetweenVacationsTweet); 
        }

        function highSchoolFunction() {
            if(!highSchoolVacations){
                type = 'highSchool';
                let curr_time = new Date();
                let currentTime = curr_time.getHours() + ":" + curr_time.getMinutes() + ":" + curr_time.getSeconds() 
                if(highSchoolFirstDay) { console.log("\n [" + currentTime + "] === [MAIN.JS] Entrando em 1o DIA E. MEDIO: "); postImageTweet.post(type, highSchoolDays, highSchoolFirstDay);
                } else if(highSchoolDays > 0) { console.log("\n [" + currentTime + "] === [MAIN.JS] Entrando em dia comum E. MEDIO: "); postTweet.post(type, highSchoolDays);
                } else if(highSchoolDays == 0) {
                    console.log("\n [" + currentTime + "] === [MAIN.JS] Entrando em FERIAS E. MEDIO: ");
                    highSchoolVacations = true;
                    postImageTweet.post(type, highSchoolDays, highSchoolFirstDay);
                }
            }
        }  
    }
}
