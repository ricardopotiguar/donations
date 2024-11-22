import transporter from "../utils/nodemailer.js";

const sendWelcomeEmail = async (email, name) => {
  const mailOptions = {
    from: 'nao-reponda-ricardopotiguar@gmail.com',
    to: email,
    subject: 'Bem vindo a plataforma de doações do Núcleo Perifico',
    text: `Oi ${name}, seja muito bem vindo a nossa platforma!`,
  };

  await transporter.sendMail(mailOptions);
};

/* teste */

export { sendWelcomeEmail }