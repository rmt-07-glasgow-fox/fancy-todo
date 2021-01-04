const yesterday = () => {
    let date = new Date();
    date.setDate(date.getDate() - 1);
    return date.toISOString().substring(0, 10);
}

module.exports = yesterday;