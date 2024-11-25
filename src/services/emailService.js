import transporter from "../utils/nodemailer.js";

async function sendWelcomeEmail (email, name){
  const mailOptions = {
    from: 'nao-reponda-ricardopotiguar@gmail.com',
    to: email,
    subject: 'Bem vindo a plataforma de doações do Núcleo Perifico',
    text: `Oi ${name}, seja muito bem vindo a nossa platforma!`,
  }
  try {
      await transporter.sendMail(mailOptions);
  } catch (error) {
      throw new Error(`Failed to send email for new user: ${error.message}`);
  }

};

export { sendWelcomeEmail }