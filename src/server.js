


/* 
    1. Tipo da rota (método http)
    2. Endereço
*/
/* 
app.put('/usuarios')
app.delete('/usuarios') */

/* 
ricardopotiguar
190787Mon!
 */

/*
npm install mongodb
mongodb+srv://ricardopotiguar:<db_password>@donations.tm5mq.mongodb.net/?retryWrites=true&w=majority&appName=Donations
*/

//biblioteca para acesso a mongo Prisma




import express from 'express'
import router from './routes/routes.js'

const app = express()
//app.use(router)
app.use(express.json())
app.use(router)
// old app.use(express.json()) <<<<<<-----------------------------------------------------------------------

app.listen(3000, () => console.warn("servidor está rodando na porta 3000")) // <<<<-----------------------------------------------------------------------------------