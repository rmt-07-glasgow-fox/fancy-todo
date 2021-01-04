function formatDate(){
    let todayDate = new Date()
    let yesterday = new Date(todayDate)
    yesterday.setDate(yesterday.getDate()-1)
    
    todayDate.toDateString()
    yesterday.toDateString()
    return yesterday.toISOString().slice(0,10)
}

//console.log(formatDate())

module.exports = formatDate