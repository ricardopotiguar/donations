import nodemailer from "nodemailer" 

const transporter = nodemailer.createTransport({
  service: 'Gmail',
/*   host: 'smtp.mail.yahoo.com', // Host SMTP do Yahoo
  port: 587, // Porta para conexão segura com SSL
  secure: false, // Define o uso de SSLcl */
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export default transporter;