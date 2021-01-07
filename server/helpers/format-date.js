function formatDate(date) {
    //var myDate = "26-02-2012";
    let splittedDate = date.split("-")
    let dueDate = new Date(splittedDate[0], splittedDate[1] - 1, splittedDate[2]);

    return dueDate
}

module.exports = formatDate