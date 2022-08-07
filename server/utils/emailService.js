const nodeMailer = require('nodemailer');

const sendMail = async (options) => {

    const transport = nodeMailer.createTransport({
        service:process.env.SMPT_SERVICE,
        host:process.env.SMPT_HOST,
        port:process.env.SMPT_PORT,
        secure:true,
        auth:{
            user:process.env.SMPT_MAIL,
            pass:process.env.SMPT_PASSWORD
        }
    });

    const mailOptions = {
        from:process.env.SMPT_MAIL,
        to:options.email,
        subject:options.subject,
        html:options.html
    };

    await transport.sendMail(mailOptions);
};

module.exports = sendMail;