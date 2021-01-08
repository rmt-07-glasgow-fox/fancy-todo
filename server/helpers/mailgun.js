const mailgun = require("mailgun-js");
const api_key = process.env.API_KEY
const DOMAIN = 'sandboxf5189883fc754e2894353c89ef60006a.mailgun.org';
const mg = mailgun({apiKey: api_key, domain: DOMAIN});

function sendEmail(email, todo){
    const data = {
        from: `Fancy Todo <noreplay@fancytodo.com>`,
        to: `${email}`,
        subject: 'Created a todo',
        text: `Hi! You just created a todo. The todo is ${todo.title}, with a description of ${todo.description} and its is due on ${todo.due_date}. Don't forget!`
    };
    mg.messages().send(data, function (error, body) {
        if(error){
            console.log(error)
        }
        console.log(body)
    });
}

module.exports = {
    sendEmail
}





