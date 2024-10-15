import nodemailer from "nodemailer";
import { EML_PASS, EMAIL } from "../config/index.js";

const sendInvitationEmail = async (email, invitationLink) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: EMAIL,
      pass: EML_PASS,
    },
  });

  const mailOptions = {
    from: "noreply@gmail.com",
    to: email,
    subject: "Invitation to Join Our Platform",
    html: `
      <div style="font-family: Arial, sans-serif; padding: 20px;">
        <h1 style="color: #4A90E2;">Hello there :),</h1>
        <p>We're excited to invite you to join our platform! To activate your account, please click the link below:</p>
        <a href="${invitationLink}" style="display: inline-block; margin-top: 20px; padding: 10px 20px; background-color: #4A90E2; color: white; text-decoration: none; border-radius: 5px;">Activate Your Account</a>
        <p>If you have any questions, feel free to reach out to us.</p>
        <p>Best regards,<br>Your Platform Team</p>
      </div>
    `,
  };

  await transporter.sendMail(mailOptions);
};

export default sendInvitationEmail;
