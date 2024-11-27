import transporter from "../utils/nodemailer.js"

async function sendWelcomeEmail (email, name){
  const mailOptions = {
    from: 'nao-reponda-ricardopotiguar@gmail.com',
    to: email,
    subject: 'Plataforma de Doações | Seja bem vindo a plataforma de doações',
    text: `
Oi ${name}, seja muito bem vindo a nossa platforma!
    
Seu usuário foi criado com sucesso. 

Qualquer dúvida entre em contato em nossos canais de atendimento.`,
  }
  try {
      await transporter.sendMail(mailOptions);
  } catch (error) {
      throw new Error(`Failed to send email to new user: ${error.message}`);
  }
}

async function sendEmailUserNeeds (email, name, userNeed){
  const mailOptions = {
    from: 'nao-reponda-ricardopotiguar@gmail.com',
    to: email,
    subject: 'Plataforma de Doações | Uma necessidade de doação foi criada para você',
    text: `
Oi ${name}, a necessidade de doação abaixo foi criada com sucesso para você:

Título: ${userNeed.title}
Descrição: ${userNeed.description}
Quantidade: ${userNeed.quantity}

Agora é aguardar até que uma pessoa doadora entre em contato com você.      
      
Qualquer dúvida entre em contato em nossos canais de atendimento.`
  }
  try {
      await transporter.sendMail(mailOptions);
  } catch (error) {
      throw new Error(`Failed to send email to new user needs: ${error.message}`);
  }
}

async function sendEmailCreateDonation (needUser, donorUser, userNeeds, donationQuantity){
  try {
      const mailOptionsNeedUser = {
        from: 'nao-reponda-ricardopotiguar@gmail.com',
        to: needUser.email,
        subject: 'Plataforma de Doações | Uma doação foi programada para você',
        text: `
Oi ${needUser.name}, foi realizada uma programação de doação para a sua necessidade abaixo:

Título: ${userNeeds.title} 
Descrição: ${userNeeds.description} 
Quantidade: ${userNeeds.quantity} 
        
Abaixo seguem os dados da pessoa doadora e da quantidade programada para doação: 
Nome: ${donorUser.name} 
Telefone: ${donorUser.phone} 
Email: ${donorUser.email} 
Quantidade a ser doada: ${donationQuantity} 
        
Agora é importante que você entre em contato com a pessoa doadora para combinar a forma de entrega da doação.
        
Importante: Após a doação ser entregue, é importante que você acesse a plataforma para informar que a doação foi entregue e concretizada.
        
        
Qualquer dúvida entre em contato em nossos canais de atendimento`
      }
      await transporter.sendMail(mailOptionsNeedUser);
  } catch (error) {
      throw new Error(`Failed to send email to need user: ${error.message}`);
  }
  try {
    const mailOptionsDonorUser = {
      from: 'nao-reponda-ricardopotiguar@gmail.com',
      to: donorUser.email,
      subject: 'Plataforma de Doação | Você realizou uma programação de doação',
      text: `
Oi ${donorUser.name}, você realizou uma programação de doação para necessidade abaixo:

Título: ${userNeeds.title} 
Descrição: ${userNeeds.description} 
Quantidade original solicitada: ${userNeeds.quantity} 
    
Quantidade a ser doada: ${donationQuantity} 
      
Abaixo seguem os dados da pessoa que cadastrou a necessidade na plataforma: 
Nome: ${needUser.name} 
Telefone: ${needUser.phone} 
Email: ${needUser.email} 
      
Agora é importante que você entre em contato com a pessoa que cadastrou a necessidade na plataforma para combinar a forma de entrega da doação.
      
Importante: Após a doação ser entregue, é importante que você acesse a plataforma para informar que a doação foi entregue e concretizada.
      
      
Qualquer dúvida entre em contato em nossos canais de atendimento`
    }
    await transporter.sendMail(mailOptionsDonorUser);
  } catch (error) {
      throw new Error(`Failed to send email to donor user: ${error.message}`);
  }
}

export { sendWelcomeEmail, sendEmailUserNeeds, sendEmailCreateDonation }