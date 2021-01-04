function checkDate(date) {
    let dueDate = date.getDate()
    let todayDate = new Date()
    
    if(dueDate < todayDate.getDate()) {
        return 'invalid'
    } else {
        return date
    }
}

module.exports = checkDate