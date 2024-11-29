import express from 'express'
import router from './routes/routes.js'
import cors from 'cors'

const app = express()
//app.use(router)
app.use(express.json())
app.use(cors())
app.use(router)


app.listen(3000, () => console.warn("servidor está rodando na porta 3000")) // <<<<-----------------------------------------------------------------------------------