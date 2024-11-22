import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

import {sendWelcomeEmail} from "./emailService.js"

async function findUserByEmail(userEmail){
    try{
        const user = await prisma.user.findUnique({
            where: { email: userEmail}
        })  
        return user
    } catch (error){
        throw new Error(`Failed to find user email: ${error.message}`);
    }

}

async function createUser(requestBody){
    try {
        await prisma.user.create({
            data: {
                email: requestBody.email,
                name: requestBody.name,
                age: requestBody.age
            }
        })
        await sendWelcomeEmail(requestBody.email, requestBody.name);
        return requestBody
    } catch (error) {
        throw new Error(`Failed to create user: ${error.message}`);
    }
}



export {findUserByEmail, createUser}