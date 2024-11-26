import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

/*
async function getAllUserNeedsService(request){
    try {
        let userNeeds = []
        if (request.query){
            const filters = {};
            const { title, quantity, userId, state } = request.query
            filters.title = title
            filters.state = state
            if (quantity) {
                const quantityInt = parseInt(quantity, 10)
                if (isNaN(quantityInt)) {
                    throw new Error('O parâmetro quantity deve ser um número inteiro.' )
                }
                filters.quantity = quantityInt
            }
            if (userId) {
                const userIdInt = parseInt(userId, 10)
                if (isNaN(userIdInt)) {
                    throw new Error('O parâmetro quantity deve ser um número inteiro.' )
                }
                filters.userId = userIdInt
            }
            userNeeds = await prisma.userNeeds.findMany({
                where: filters,
            })
        } else { 
            userNeeds = await prisma.userNeeds.findMany()
        } 
        return userNeeds
    } catch (error) {
        throw new Error(`Failed to find user: ${error.message}`);
    }
}
*/

async function createDonationService(request){
    try {
        await prisma.Donation.create({
            data: {
                donorId: Number(request.body.donorId),
                userNeedsId: Number(request.body.userNeedsId),
                quantity: Number(request.body.quantity),
                updatedAt: new Date()
            }
        })
        return request
/*         const user = await findUserByIdService(requestBody.userId)
        await sendEmailUserNeeds (user.email, user.name, requestBody) */
    } catch (error) {
        throw new Error(`Failed to create donation: ${error.message}`);
    }
}

/*


async function updateUserNeedsService(request){
    try {
        await prisma.userNeeds.update({
            where : {
                id: Number(request.params.id)
            },
            data: {
                userId: Number(request.body.userId),
                title: request.body.title,
                description: request.body.description,
                quantity: Number(request.body.quantity),
                state: request.body.state
            }
        })
        return
    } catch (error) {
        throw new Error(`Failed to update user: ${error.message}`);
    }
}

async function deleteUserNeedsService(requestParams){
    try {
        await prisma.userNeeds.delete({
            where : {
                id: Number(requestParams.id)
            }
        })
        return
    } catch (error) {
        throw new Error(`Failed to delete user: ${error.message}`);
    }
}

export { createUserNeedsService, getAllUserNeedsService, updateUserNeedsService, deleteUserNeedsService }

 */

export {createDonationService}