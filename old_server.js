import express from 'express'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const app = express()
app.use(express.json())

app.post('/usuarios', async (req, res) => {
    await prisma.user.create({
        data: {
            email: req.body.email,
            name: req.body.name,
            age: req.body.age
        }
    })

    res.status(201).send(req.body)
})


app.get('/usuarios', async (req, res) => {

    let users = []

    if (req.query){
        users = await prisma.user.findMany({
            where:{
                name: req.query.name,
                email: req.query.email,
                age : req.query.age
            }
        })
    }else {
        users = await prisma.user.findMany()
    }

    res.status(200).json(users)
    //res.send('Ok, deu bom')
})

app.put('/usuarios/:id', async (req, res) => {
    await prisma.user.update({
        where : {
            id: req.params.id
        },
        data: {
            email: req.body.email,
            name: req.body.name,
            age: req.body.age
        }
    })

    res.status(200).send(req.body)
})

app.delete('/usuarios/:id', async (req, res) => {
    await prisma.user.delete({
        where : {
            id: req.params.id
        }
    })

    res.status(200).send({message:"Usuário deletado com sucesso!"})
})



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

app.listen(3000)