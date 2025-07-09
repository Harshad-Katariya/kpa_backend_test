import nodemailer from 'nodemailer';
import fs, { readFileSync } from 'fs'
import path from 'path';
const emailTemplatePath = path.join(__dirname, '../../comman/mailService/oto_send_template.html');

const template = fs.readFileSync(emailTemplatePath, 'utf-8')
export const MailServiceOTP = (email: string, otp: any,) => {
    let htmlcontent = template.replace('{otp}', otp)

    let transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    })

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: 'Verify Your Email: OTP Confirmation Required',
        html: htmlcontent
    }

    transporter.sendMail(mailOptions, (err, info) => {
        if (err) {
            console.log("Send Mail", err);
        }
        else {
            console.log(info);
        }

    });
}