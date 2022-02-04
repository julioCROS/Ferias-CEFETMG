// Function to get current date:
module.exports = {
  getCurrDate: function get_currDate(){
    let curr_date = new Date();
    let day = String(curr_date.getDate()).padStart(2, '0');
    let month = String(curr_date.getMonth() + 1).padStart(2, '0');
    let year = curr_date.getFullYear();

    let curr_date_BRT = new Date(curr_date.valueOf() - 10800000);
    return curr_date_BRT;
  }
}