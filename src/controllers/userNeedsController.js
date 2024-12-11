import { createUserNeedsService, getAllUserNeedsService, updateUserNeedsService, deleteUserNeedsService } from '../services/userNeedsService.js'


async function getAllUserNeedsController(request, response){
    try{
        let usersNeeds = []
        usersNeeds = await getAllUserNeedsService(request)
        return response.status(200).json(usersNeeds)
    } catch (error) {
        return response.status(500).json({ message: 'An error occurred while finding the user.', datail: error.message });
    }
}

async function createUserNeedsController(request, response){
    try {
        const { title, description, userId, quantity, type } = request.body;
        const imagePath = request.file ? `${process.env.BASE_URL}/uploads/userNeedsImages/${request.file.filename}` : null;
    
        // Envia os dados ao serviço
        await createUserNeedsService({
          userId: Number(userId),
          title,
          description,
          quantity: Number(quantity),
          type,
          imageUrl: imagePath, // Adiciona o caminho da imagem
        });


/*         await createUserNeedsService(request.body) */
        return response.status(201).send(request.body)
    } catch (error) {
        return response.status(500).json({ message: 'An error occurred while creating the userNeeds.', datail: error.message });
    }
}

async function updateUserNeedsController(request, response){
    try {
        await updateUserNeedsService(request)
        return response.status(200).send(request.body)
    } catch (error) {
        return response.status(500).json({ message: 'An error occurred while updating the UserNeeds.', datail: error.message });
    }

}

async function deleteUserNeedsController(request, response){
    try {
        await deleteUserNeedsService (request.params)
        return response.status(200).send({message:"Necessidades do usuário excluídas com sucesso!"})
    } catch (error) {
        return response.status(500).json({ message: 'An error occurred while deleting the user needs.', datail: error.message });
    }
}

export { createUserNeedsController, getAllUserNeedsController, updateUserNeedsController, deleteUserNeedsController }