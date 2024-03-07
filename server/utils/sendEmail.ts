import nodemailer from "nodemailer";
const transporter = nodemailer.createTransport({
  service:"gmail",
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.USER,
    pass: process.env.PASSWORD,
  },
});

 type MailOptions={
    from: {
        name:string,
        address:string
    },
    to:[string],
    subject:string,
    text:string,
    html: string
}
const sendMail = async function (email:MailOptions) {
  const info = await transporter.sendMail(email);
}

export default sendMail;