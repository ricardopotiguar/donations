import { findUserByEmailService } from "../services/userService.js";

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

export {userValidation}
