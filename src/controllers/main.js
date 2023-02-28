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
const collegeStart_BH = new Date(2023,2,3);
const highSchoolStart_BH = new Date(2023,2,3);

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

// Declaring a type for college and highschool vacation types:
let type;

module.exports = {
    post: function main(){
        type = 'menu'
        postTweet.post(type, 0)

        // Declaring days to vacation:
        let collegeDays = get_diffDate(collegeVacation_BH);
        let highSchoolDays = get_diffDate(highSchoolVacation_BH);
        let collegeFirstDay = get_diffDate(collegeStart_BH) == 0;
        let highSchoolFirstDay = get_diffDate(highSchoolStart_BH) == 0;

        console.log(" [MAIN.JS] College Days:", collegeDays)
        console.log(" [MAIN.JS] HighSchool Days:", highSchoolDays)
        
        // Checking if college and highschool vacations are active:
        setTimeout(function(){
            if(!collegeVacations){
                type = 'college';
                if(collegeFirstDay) { postImageTweet.post(type, collegeDays, collegeFirstDay);
                } else if(collegeDays > 0) { postTweet.post(type, collegeDays);
                } else if(collegeDays == 0) {
                    collegeVacations = true;
                    postImageTweet.post(type, collegeDays, collegeFirstDay);
                }
            }
        }, cdBetweenMenuVacationTweet);
      
        setTimeout(function(){
            if(!highSchoolVacations){
                type = 'highSchool';
                if(highSchoolFirstDay) { postImageTweet.post(type, highSchoolDays, highSchoolFirstDay);
                } else if(highSchoolDays > 0) { postTweet.post(type, highSchoolDays);
                } else if(highSchoolDays == 0) {
                    highSchoolVacations = true;
                    postImageTweet.post(type, highSchoolDays, highSchoolFirstDay);
                }
            }
        }, cdBetweenVacationsTweet);
    }
}
