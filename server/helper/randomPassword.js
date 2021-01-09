function genPassword(digit){
    let char = "qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM1234567890"
    let password = ''

    for (let i = 0; i < digit; i++) {
        let num = Math.floor(Math.random()*char.length)
        password += char[num]
    }
    return password
}

module.exports = genPassword