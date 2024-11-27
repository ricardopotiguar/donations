import { findUserByEmailService } from "../services/userService.js"
import { findUserNeedsByIdService } from "../services/userNeedsService.js"

async function userValidation(request, response, next){
    const { email } = request.body;
    try {
        const existingUser = await findUserByEmailService(email); // Chama o serviço para verificar o banco
        if (existingUser) {
            return response.status(400).json({ message: 'E-mail já cadastrado' });
        }
    } catch (error) {
        return response.status(500).json({ message: 'An error occurred while finding the userEmail.', datails: error.message });       
    }
    next()
}

async function userNeedsValidation(request, response, next){
    try {
        const userNeeds = await findUserNeedsByIdService(request.body.userNeedsId)
        if (!userNeeds){
            return response.status(400).json({ message: `UserNeeds ${request.body.userNeedsId} not exists` });
        }
        if (userNeeds.state === 'completed'){
            return response.status(400).json({ message: `It is not possible to make a donation for a userNeeds with a completed state` });
        }
    } catch (error) {
        return response.status(500).json({ message: 'An error occurred while finding the user needs.', datails: error.message });       
    }
    next()
}

export {userValidation, userNeedsValidation, }
