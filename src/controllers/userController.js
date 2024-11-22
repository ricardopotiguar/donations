
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

import { createUser } from '../services/userService.js'

async function getAll(request, response){
    let users = []
    if (request.query){
        users = await prisma.user.findMany({
            where:{
                name: request.query.name,
                email: request.query.email,
                age : request.query.age
            }
        })
    }else {
        users = await prisma.user.findMany()
    }
    return response.status(200).json(users)
}

async function create(request, response){
    try {
        createUser(request.body)
        return response.status(201).send(request.body)
    } catch (error) {
        return response.status(500).json({ message: 'An error occurred while creating the user.', datail: error.message });
    }
}
/* async function create(request, response){
    await prisma.user.create({
        data: {
            email: request.body.email,
            name: request.body.name,
            age: request.body.age
        }
    })

   return response.status(201).send(request.body)
} */

async function update(request, response){
    await prisma.user.update({
        where : {
            id: request.params.id
        },
        data: {
            email: request.body.email,
            name: request.body.name,
            age: request.body.age
        }
    })
    return response.status(200).send(request.body)
}

async function deleteUser(request, response){
    await prisma.user.delete({
        where : {
            id: request.params.id
        }
    })
    return response.status(200).send({message:"Usuário deletado com sucesso!"})
}

export { getAll,create, update, deleteUser}