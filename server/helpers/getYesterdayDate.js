function getYesterdayDate() {  
  let date = new Date();
  date.setDate(date.getDate() - 1);
  return date.toISOString().substr(0, 10);
}

module.exports = getYesterdayDate;