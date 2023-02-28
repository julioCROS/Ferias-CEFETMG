// Importing 'xlsx' to read xls/xlsx files:
const xlsx = require('xlsx');

const weekdaysXlsx = [2, 15, 28, 41];
const blankRows = [3, 16, 29, 42];

const WEEKEND_CODE = 0;
const HOLIDAY_CODE = -1;
const UNDEFINED_CODE = -2;

// Getting current month:
const months = [
    "JANEIRO",
    "FEVEREIRO",
    "MARÇO",
    "ABRIL",
    "MAIO",
    "JUNHO",
    "JULHO",
    "AGOSTO",
    "SETEMBRO",
    "OUTUBRO",
    "NOVEBRO",
    "DEZEMBRO"
];

// Getting day name:
const weekDays = [
    "Domingo",
    "Segunda-feira",
    "Terçã-feira",
    "Quarta-feira",
    "Quinta-feira",
    "Sexta-feira",
    "Sábado"
];

// Getting current date
const date = new Date();
let timeZone_string = date.toString().split(" ");
let timeString = date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds() + " (" + timeZone_string[timeZone_string.length - 2] + " " + timeZone_string[timeZone_string.length - 1];
let day = date.getDate();
let month = date.getMonth() + 1;
let year = date.getFullYear();
let currentDate = `${year}-${month}-${day}`;
let currentDate2find = `${month}/${day}/${year}`;

let weekDay = new Date(currentDate).getDay();
let monthDay = new Date(currentDate).getUTCDate();
let currentMonth = months[new Date(currentDate).getUTCMonth()];
console.log("\n [MENU.JS] Data de hoje: " + currentDate + " - " + timeString);
console.log(" [MENU.JS] Dia da semana: " + weekDays[weekDay] + ", " + monthDay + " de " + currentMonth + ".");

module.exports = {
    getCurrMenu: function get_CurrMenu(){
        // Variable to set the menu
        // 0 -> Prato principal           5 -> Arroz            9 -> Salada 3
        // 1 - Vegetariana                6 -> Feijão          10 -> Salada 4
        // 2 -> Vegana                    7 -> Salada 1        11 -> Sobremesa
        // 3 -> Guarnição                 8 -> Salada 2

        let menu = [];

        // Main method to read our xls/xlsx file:
        const parseExcel = (fileName) => {
            console.log(" [MENU.JS] ======================================================================");
            console.log(" [MENU.JS] ========= Lendo o arquivo: " + fileName + " ===========");
            const excelData = xlsx.readFile(fileName);
            return Object.keys(excelData.Sheets).map(name => ({
                name,
                data: xlsx.utils.sheet_to_json(excelData.Sheets[name])
            }));
        }

        let excelFile;

        try{
            excelFile =  parseExcel(`./src/menu_files/${currentMonth}.xlsx`)
        }catch(e){
            currentMonth = months[new Date(currentDate).getUTCMonth() - 1]
            excelFile =  parseExcel(`./src/menu_files/${currentMonth}.xlsx`)
        }
        
        excelFile.forEach(element => {
            currentWeek = parseInt(findCurrentWeek(element.data), 10);

            let __EMPTY_NUMBER = "__EMPTY_" + weekDay;
            let rowOffset = blankRows[currentWeek - 1];

            if(weekDays[weekDay] == 'Sábado' || weekDays[weekDay] == 'Domingo'){
                menu = [WEEKEND_CODE, weekDays[weekDay]]
            } else {
                for(index = 0; index < 11; index++){
                    try{
                        menu.push(element.data[rowOffset + index][__EMPTY_NUMBER]);
                    }catch(e){
                        menu = [UNDEFINED_CODE]
                    }                    
                }
                if(isHoliday(menu)){
                    menu = [HOLIDAY_CODE]
                }
                if(menu[0] != HOLIDAY_CODE && menu[0] != UNDEFINED_CODE){
                    console.log(" [MENU.JS] ================================ MENU ================================");
                    for(index = 0; index < 11; index++){
                        menu[index] = textHandle(menu[index]);
                        console.log("   ● " + menu[index]);
                    }
                    console.log(" [MENU.JS] ======================================================================");
                }
            }
        })
        return menu;
    }
}

function findCurrentWeek(element){
  for(j = 0; j < 4; j++){
      for(index = 1; index < 7; index++){
          if(element[weekdaysXlsx[j]]["__EMPTY_" + index] == currentDate2find){
              currentWeek = element[weekdaysXlsx[j] - 1]["__EMPTY"].replace("SEMANA ", "");
              return currentWeek;
          }
      }
  }
}

function textHandle(text){
  return text.replace(/(\r\n|\n|\r)/gm, "").replace("ao", "ao ")
  .replace("c/", "c/ ").replace(" em", " em ")
  .replace(" com", " com ").replace(" molho", " molho ")
  .replace(" proteína", " proteína ").replace(" linguiça", " linguiça ")
  .replace(" cravo", " cravo ").replace(" cheiro", " cheiro ")
  .replace(" orégano", " orégano ").replace(" feijão", " feijão ")
  .replace(" ervilha", " ervilha ").replace(" Acebolado", " acebolado ")
  .replace(",", ", ")
  .replace("  ", " ").replace("  ", " ")
}

function isHoliday(menu){
    let isHoliday = 0;
    for(index = 0; index < menu.length; index++){
        if(typeof(menu[index]) == typeof(undefined)) isHoliday++;
    }
    if(isHoliday >= 10) return true;
    return false;
}

