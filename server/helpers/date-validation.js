function checkDate(date) {
    let dueDate = date.getDate()
    let dueMonth = date.getMonth()
    let dueYear = date.getFullYear()

    let todayDate = new Date()

    // cek tanggal, bulan, tahun
    if (dueYear >= todayDate.getFullYear()) {
        if (dueMonth > todayDate.getMonth()) {
            return date
        } else if (dueMonth === todayDate.getMonth()) {
            if (dueDate >= todayDate.getDate()) {
                return date
            } else {
                return 'invalid'
            }
        } else {
            return 'invalid'
        }
    } else {
        return 'invalid'
    }
}

module.exports = checkDate