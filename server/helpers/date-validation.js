function checkDate(date) {
    let dueDate = date.getDate()
    let dueMonth = date.getMonth()
    let dueYear = date.getFullYear()

    let todayDate = new Date()

    let counter = 0

    // cek tanggal, bulan, tahun
    if(dueYear < todayDate.getFullYear()) {
        counter++
    }

    if(dueMonth < todayDate.getMonth()) {
        counter++
    }

    if(dueDate < todayDate.getDate()) {
        counter++
    }

    // cek keseluruhan
    if(counter > 0) {
        return 'invalid'
    } else {
        return date
    }
}

module.exports = checkDate