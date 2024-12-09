import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

import { sendEmailUserNeeds } from "./emailService.js"
import { findUserByIdService } from "./userService.js"


async function getAllUserNeedsService(request) {
    try {
        let userNeeds = [];
        let totalItems = 0;

        if (request.query) {
            const filters = {};
            const { title, quantity, userId, state, type, search, page, limit } = request.query;
            const skip = (page - 1) * limit;

            if (title) filters.title = title;
            if (state) filters.state = state;
            if (type) filters.type = type;

            if (quantity) {
                const quantityInt = parseInt(quantity, 10);
                if (isNaN(quantityInt)) {
                    throw new Error('O parâmetro quantity deve ser um número inteiro.');
                }
                filters.quantity = quantityInt;
            }

            if (userId) {
                const userIdInt = parseInt(userId, 10);
                if (isNaN(userIdInt)) {
                    throw new Error('O parâmetro userId deve ser um número inteiro.');
                }
                filters.userId = userIdInt;
            }

            // Inicializar os critérios de busca com os filtros recebidos
            const where = { ...filters };

            // Adicionar a pesquisa pelo termo, se fornecido
            if (search) {
                where.OR = [
                    { title: { contains: search} },
                    { description: { contains: search } },
                ];
            }

            // Contar o número total de itens com base nos filtros
            totalItems = await prisma.userNeeds.count({ where });

            // Buscar os itens paginados
            if (page && limit) {
                userNeeds = await prisma.userNeeds.findMany({
                    where,
                    skip: Number(skip),
                    take: Number(limit),
                });
            } else {
                userNeeds = await prisma.userNeeds.findMany({ where });
            }
        } else {
            // Sem filtros, contar e buscar todos os itens
            totalItems = await prisma.userNeeds.count();
            userNeeds = await prisma.userNeeds.findMany();
        }

        return { data: userNeeds, totalItems };
    } catch (error) {
        throw new Error(`Failed to find user needs: ${error.message}`);
    }
}

async function createUserNeedsService(requestBody) {
    try {
        await prisma.UserNeeds.create({
            data: {
                userId: Number(requestBody.userId),
                title: requestBody.title,
                description: requestBody.description,
                quantity: Number(requestBody.quantity),
                state: 'pending',
                updatedAt: new Date(),
                type: requestBody.type

            }
        })
        const user = await findUserByIdService(requestBody.userId)
        await sendEmailUserNeeds(user.email, user.name, requestBody)
        return requestBody
    } catch (error) {
        throw new Error(`Failed to create userNeeds: ${error.message}`);
    }

    /* state:
            pending
            completed
            partial */
}

async function updateUserNeedsService(request) {
    try {
        await prisma.userNeeds.update({
            where: {
                id: Number(request.params.id)
            },
            data: {
                userId: Number(request.body.userId),
                title: request.body.title,
                description: request.body.description,
                quantity: Number(request.body.quantity),
                state: request.body.state,
                updatedAt: new Date(),
                type: request.body.type
            }
        })
        return
    } catch (error) {
        throw new Error(`Failed to update UserNeeds: ${error.message}`);
    }
}

async function updateUserNeedsStateService(id, newState) {
    try {
        await prisma.userNeeds.update({
            where: {
                id: Number(id),
            },
            data: {
                state: newState,
                updatedAt: new Date(), // Atualiza o timestamp
            },
        });
        return { success: true, message: 'State updated successfully' };
    } catch (error) {
        throw new Error(`Failed to update UserNeeds state: ${error.message}`);
    }
}

async function deleteUserNeedsService(requestParams) {
    try {
        await prisma.userNeeds.delete({
            where: {
                id: Number(requestParams.id)
            }
        })
        return
    } catch (error) {
        throw new Error(`Failed to delete user: ${error.message}`);
    }
}

async function findUserNeedsByIdService(id) {
    try {
        const user = await prisma.userNeeds.findUnique({
            where: { id: id }
        })
        return user
    } catch (error) {
        throw new Error(`Failed to find user needs by id: ${error.message}`);
    }
}

export { createUserNeedsService, getAllUserNeedsService, updateUserNeedsService, deleteUserNeedsService, findUserNeedsByIdService, updateUserNeedsStateService }

