import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

import {sendWelcomeEmail} from "./emailService.js"

async function findUserByEmailService(userEmail){
    try{
        const user = await prisma.user.findUnique({
            where: { email: userEmail}
        })  
        return user
    } catch (error){
        throw new Error(`Failed to find user email: ${error.message}`);
    }

}

async function getAllUserService(request){
    try{
        let users = []
        if (request.query){
            const filters = {};
            const { name, email, age, type, id } = request.query
            filters.name = name
            filters.email = email
            filters.type = type
            if (age) {
                const ageInt = parseInt(age, 10)
                if (isNaN(ageInt)) {
                    throw new Error('O parâmetro age deve ser um número inteiro.' )
                }
                filters.age = ageInt
            }
            if (id) {
                const IdInt = parseInt(id, 10)
                if (isNaN(IdInt)) {
                    throw new Error('O parâmetro id deve ser um número inteiro.' )
                }
                filters.id = IdInt
            }
            users = await prisma.user.findMany({
                where: filters,
            })
        } else {
            users = await prisma.user.findMany()
        } 
        return users
    } catch (error) {
        throw new Error(`Failed to find user: ${error.message}`);
    }
}

async function createUserService(requestBody){
    try {
        await prisma.user.create({
            data: {
                email: requestBody.email,
                name: requestBody.name,
                age: Number(requestBody.age),
                type: requestBody.type,
                updatedAt: new Date(),
                phone: requestBody.phone,
                password: requestBody.password
            }
        })
        await sendWelcomeEmail(requestBody.email, requestBody.name);
        return requestBody
    } catch (error) {
        throw new Error(`Failed to create user: ${error.message}`);
    }
}


async function updateUserService(request){
    try {
        await prisma.user.update({
            where : {
                id: Number(request.params.id)
            },
            data: {
                email: request.body.email,
                name: request.body.name,
                age: Number(request.body.age),
                type: request.body.type,
                updatedAt: new Date(),
                phone: request.body.phone
            }
        })
        return
    } catch (error) {
        throw new Error(`Failed to update user: ${error.message}`);
    }
}

async function deleteUserService(requestParams){
    try {
        await prisma.user.delete({
            where : {
                id: Number(requestParams.id)
            }
        })
        return
    } catch (error) {
        throw new Error(`Failed to delete user: ${error.message}`);
    }
}

async function findUserByIdService(id){
    try{
        const user = await prisma.user.findUnique({
            where: { id: id}
        })  
        return user
    } catch (error){
        throw new Error(`Failed to find user by id: ${error.message}`);
    }
}

export {findUserByEmailService, createUserService, getAllUserService, updateUserService, deleteUserService, findUserByIdService}