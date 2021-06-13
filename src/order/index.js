const nodemailer = require('nodemailer');
const fs = require('fs');
const path = require('path');

const sendInBlueConfig = () => {
    return {
        user: process.env.SEND_IN_BLUE_USER,
        pass: process.env.SEND_IN_AUTH_PASS,
        from: process.env.SEND_IN_FROM_ADDRESS,
        to: process.env.SEND_IN_TO_ADDRESS,
    };
}

module.exports.sendEmail = async ({subject, text, attachments}) => {
    const {user, pass, from, to} = sendInBlueConfig();
    const transporter = nodemailer.createTransport({
        service: 'SendinBlue',
        auth: {user: user, pass: pass},
    });
    return await transporter.sendMail({
        from: from,
        to: to,
        subject: subject,
        text: text,
        attachments: attachments,
    });
};

module.exports.savePdf = (filename, content) => {
    return new Promise((resolve, reject) => {
        const orderSummaryPath = path.join('./orders', filename);
        fs.open(orderSummaryPath, 'w', (err, fd) => {
            if (err) {
                reject(err);
            }
            fs.write(fd, content, 0, content.length, null, (err) => {
                if (err) {
                    reject(err);
                }
                resolve({path: orderSummaryPath});
            });
        });
    });
};