import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

import {sendEmailCreateDonation} from "./emailService.js"
import {findUserByIdService} from "./userService.js"
import { findUserNeedsByIdService } from './userNeedsService.js'

async function getAllDonationService(request){
    try {
        let donation = []
        if (request.query){
            const filters = {};
            filters.state = request.query.state
            const { id, donorId, userNeedsId, quantity } = request.query
            if (quantity) {
                const quantityInt = parseInt(quantity, 10)
                if (isNaN(quantityInt)) {
                    throw new Error('O parâmetro quantity deve ser um número inteiro.' )
                }
                filters.quantity = quantityInt
            }
            if (id) {
                const IdInt = parseInt(id, 10)
                if (isNaN(IdInt)) {
                    throw new Error('O parâmetro quantity deve ser um número inteiro.' )
                }
                filters.id = IdInt
            }
            if (donorId) {
                const donorIdInt = parseInt(donorId, 10)
                if (isNaN(donorIdInt)) {
                    throw new Error('O parâmetro quantity deve ser um número inteiro.' )
                }
                filters.donorId = donorIdInt
            }
            if (userNeedsId) {
                const userNeedsIdInt = parseInt(userNeedsId, 10)
                if (isNaN(userNeedsIdInt)) {
                    throw new Error('O parâmetro quantity deve ser um número inteiro.' )
                }
                filters.userNeedsId = userNeedsIdInt
            }
            donation = await prisma.Donation.findMany({
                where: filters,
            })
        } else { 
            donation = await prisma.Donation.findMany()
        } 
        return donation
    } catch (error) {
        throw new Error(`Failed to find the Donation: ${error.message}`);
    }
}


async function createDonationService(request){
    try {
        await prisma.Donation.create({
            data: {
                donorId: Number(request.body.donorId),
                userNeedsId: Number(request.body.userNeedsId),
                quantity: Number(request.body.quantity),
                updatedAt: new Date(),
                state: "scheduled"
            }
        })
        const donorUser = await findUserByIdService(request.body.donorId)
        const UserNeeds = await findUserNeedsByIdService(request.body.userNeedsId)
        const needUser = await findUserByIdService(UserNeeds.userId)
        await sendEmailCreateDonation (needUser, donorUser, UserNeeds, request.body.quantity)
        return request 
    } catch (error) {
        throw new Error(`Failed to create the donation: ${error.message}`);
    }

    /* state:
            scheduled
            completed
     */

}


async function updateDonationService(request){
    try {
        await prisma.Donation.update({
            where : {
                id: Number(request.params.id)
            },
            data: {
                donorId: Number(request.body.donorId),
                userNeedsId: Number(request.body.userNeedsId),
                quantity: Number(request.body.quantity),
                state: request.body.state,
                updatedAt: new Date(),
            }
        })
        return
    } catch (error) {
        throw new Error(`Failed to update the Donation: ${error.message}`);
    }
}

async function deleteDonationService(requestParams){
    try {
        await prisma.Donation.delete({
            where : {
                id: Number(requestParams.id)
            }
        })
        return
    } catch (error) {
        throw new Error(`Failed to delete the donation: ${error.message}`);
    }
}

export {createDonationService, getAllDonationService, updateDonationService, deleteDonationService}