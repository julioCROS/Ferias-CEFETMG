// Importing postTweet() controller:
const postTweet = require("./postTweet.js")

// Importing postVacationTweet() controller:
const postVacationTweet = require("./postVacationTweet.js")

// Importing dotenv dependency config:
require("dotenv").config();

// Setting official college and highschool vacation dates:
const collegeVacation_BH = new Date(2022,01,21);
const highSchoolVacation_BH = new Date(2022,01,18);

// 600000ms = 10min
// 5400000ms = 1h30
// 3600000ms = 1h
// 39600000ms = 11h
// 43200000ms = 12h
// 82800000ms = 23h
// 86400000ms = 24h

// Setting twetting interval:
const cdBetweenTweet = 5000;

// Declaring boolean vacation states:
let collegeVacations = false;
let highSchoolVacations = false;

// Declaring days to vacation:
let collegeDays = get_diffDate(collegeVacation_BH);
let highSchoolDays = get_diffDate(highSchoolVacation_BH);

// Function to get current date:
function get_currDate(){
    let curr_date = new Date();
    let day = String(curr_date.getDate()).padStart(2, '0');
    let month = String(curr_date.getMonth() + 1).padStart(2, '0');
    let year = curr_date.getFullYear();
    return curr_date;
}

// Function to get the number of days to vacation:
function get_diffDate(targetDate){
    let diffTime = (targetDate - get_currDate());
    let diffDays = Math.ceil(diffTime/ (1000 * 3600 * 24)); 
    return diffDays;
}

// Declaring a type for college and highschool vacation types:
let type;

module.exports = {
    post: function main(){
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
