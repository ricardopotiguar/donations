import express from 'express'
import router from './routes/routes.js'
import cors from 'cors'
import path from 'path'
import { fileURLToPath } from "url";

const app = express()
//app.use(router)
app.use(express.json())
app.use(cors())
app.use(router)

const __filename = fileURLToPath(import.meta.url); // Obtém o caminho absoluto do arquivo atual
const __dirname = path.dirname(__filename); // Obtém o diretório do arquivo atual

// Habilitar a pasta de uploads como pública
app.use("/uploads", express.static(path.join(__dirname, "uploads")));


app.listen(3000, () => console.warn("servidor está rodando na porta 3000")) // <<<<-----------------------------------------------------------------------------------