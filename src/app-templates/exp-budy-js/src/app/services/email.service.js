import nodemailer from 'nodemailer';
import ejs from 'ejs';
import path from 'path';
import { htmlToText } from 'html-to-text';
import config from '../../config.js';
import httpStatus from 'http-status';
import ApiError from '../../errors/ApiError.js';
import { logger } from '../../shared/logger.js';
const { service, host, port, user, pass } = config.mail;
const transporter = nodemailer.createTransport({
    service, // Use your email service
    host,
    port,
    secure: port === 465,
    auth: {
        user, // Your email address
        pass, // Your email password
    },
});
const sendEmail = async (to, subject, templateName, context) => {
    try {
        const templatePath = path.join(process.cwd(), 'src/app/templates/mail', `${templateName}.ejs`);
        const html = await ejs.renderFile(templatePath, context);
        const mailOptions = {
            from: `Auth service <${user}>`,
            to,
            subject,
            html,
        };
        if (config.env === 'production') {
            // Send email in production mode
            await transporter.sendMail(mailOptions);
        }
        else {
            //log mail content in development mode
            const text = htmlToText(html, {
                wordwrap: 130,
            });
            console.log(`\n\n-----Mail Content----- \n\n${text}\n\n`);
        }
    }
    catch (error) {
        logger.error('Error sending email:', error);
        throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, 'Error sending email');
    }
};
export default sendEmail;
