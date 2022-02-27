'use strict';

const nodemailer = require("nodemailer");

const { host, port, user, pass} = require("../config/mail.json");

module.exports = class email{
    static submitEmail(email, subject, text) {
        const transport = nodemailer.createTransport({
            host,
            port,
            auth: {
                user,
                pass
            }
        });
        const emailBody = {
            to: email,
            from: 'jose.martins@audaces.com',
            subject: subject,
            html: text,
            template: 'email'
        }
        transport.sendMail(emailBody, (err, info) => {
            if(err){
                console.log(err)
            }
        })
    }
}
