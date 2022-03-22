// Calendário graduação em: https://www.dirgrad.cefetmg.br/dirgrad/calendario/
// Calendário médio-técnico em: https://www.ns.cefetmg.br/calendarios/

// Importing postTweet() controller:
const postTweet = require("./postTweet.js")

// Importing postVacationTweet() controller:
const postVacationTweet = require("./postVacationTweet.js")

// Importing get_CurrDate() controller:
const date = require("./date.js")

// Setting official college and highschool vacation dates:
const collegeVacation_BH = new Date(2022,06,25);
const highSchoolVacation_BH = new Date(2022,06,25);

// Setting twetting interval:
const cdBetweenTweet = 1200000;

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
        // Declaring days to vacation:
        let collegeDays = get_diffDate(collegeVacation_BH);
        let highSchoolDays = get_diffDate(highSchoolVacation_BH);
        
        // Checking if college and highschool vacations are active:
        if(!collegeVacations){
            type = 'college';
            if(collegeDays > 0){
                postTweet.post(type, collegeDays);
            } else if(collegeDays == 0) {
                collegeVacations = true;
                postVacationTweet.post(type)
            }
        }
      
        setTimeout(function(){
            if(!highSchoolVacations){
                type = 'highSchool';
                if(highSchoolDays > 0){
                    postTweet.post(type, highSchoolDays);
                } else if(highSchoolDays == 0) {
                    highSchoolVacations = true;
                    postVacationTweet.post(type)
                }
            }
        }, cdBetweenTweet);
    }
}
