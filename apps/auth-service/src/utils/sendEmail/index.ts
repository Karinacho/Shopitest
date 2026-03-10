import nodemailer from "nodemailer";
import dotenv from 'dotenv';
// @ts-ignore
import ejs from "ejs";
import path from 'path';

dotenv.config();

interface renderTemplateProps  {
  templateName: string;
  data: Record<string,  any>;
}

interface sendEmailProps extends renderTemplateProps {
  to: string;
  subject: string;
}

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT) || 587,
  service: process.env.SMTP_NAME,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  }
});

//Render an EJS email template
const  renderEmailTemplate = async ({templateName,  data}: renderTemplateProps): Promise<string> => {
  const templatePath = path.join(
    process.cwd(),
    'src',
    'utils',
    'email-templates',
    `${templateName}.ejs`
  )

  return ejs.renderFile(templatePath, data);
}

//send an email using nodemailer

export const sendEmail = async ({to,  subject,  templateName, data}: sendEmailProps) => {
  try {
      const html = await renderEmailTemplate({templateName, data});
      await transporter.sendMail({
        from: `<${process.env.SMTP_USER}`,
        to,
        subject,
        html,
      })
    return true;
  } catch (error) {
    console.error(`Error sending email`, error);
    return false;

  }
}
