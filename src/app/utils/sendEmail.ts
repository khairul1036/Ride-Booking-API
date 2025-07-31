/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-explicit-any */
import ejs from 'ejs';
import nodemailer from 'nodemailer';
import path from 'path';
import AppError from '../errorHelpers/AppError';
import envVars from '../config/env';
import { SendEmailOptions } from '../interfaces';

const transporter = nodemailer.createTransport({
  secure: true,
  auth: {
    user: envVars.EMAIL_SENDER.SMTP_USER,
    pass: envVars.EMAIL_SENDER.SMTP_PASS,
  },
  port: envVars.EMAIL_SENDER.SMTP_PORT,
  host: envVars.EMAIL_SENDER.SMTP_HOST,
});

const sendEmail = async ({
  to,
  subject,
  templateName,
  templateData,
  attachments,
}: SendEmailOptions) => {
  try {
    const templatePath = path.join(__dirname, `templates/${templateName}.ejs`);
    const html = await ejs.renderFile(templatePath, templateData);
    const info = await transporter.sendMail({
      from: envVars.EMAIL_SENDER.SMTP_FROM,
      to: to,
      subject: subject,
      html: html,
      attachments: attachments?.map((attachment) => ({
        filename: attachment.filename,
        content: attachment.content,
        contentType: attachment.contentType,
      })),
    });
    if (envVars.NODE_ENV == 'development') {
      console.log(`\u2709\uFE0F Email sent to ${to}: ${info.messageId}`);
    }
  } catch (error: any) {
    if (envVars.NODE_ENV == 'development') {
      console.log('email sending error', error.message);
    }
    throw new AppError(401, 'Email error');
  }
};

export default sendEmail;
