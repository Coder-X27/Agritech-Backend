import { createTransport } from "nodemailer";

export const sendMail = async (text) => {
  const transporter = createTransport({
    service: "gmail",
    auth: {
      user: process.env.MYMAIL,
      pass: process.env.MYMAIL_PASSWORD
    },
    port: 465,
    host: "smtp.gmail.com"
  });

  await transporter.sendMail({
    subject: "CONTACT REQUEST FROM PORTFOLIO",
    to: process.env.MYMAIL,
    from: process.env.MYMAIL,
    text,
  });

}