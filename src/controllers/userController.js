import { createUserService, getAllUserService, updateUserService, deleteUserService } from '../services/userService.js'

async function getAllUserController(request, response){
    try{
        let users = []
        users = await getAllUserService(request)
        return response.status(200).json(users)
    } catch (error) {
        return response.status(500).json({ message: 'An error occurred while finding the user.', datail: error.message });
    }
}

async function createUserController(request, response){
    try {
        await createUserService(request.body)
        return response.status(201).send(request.body)
    } catch (error) {
        return response.status(500).json({ message: 'An error occurred while creating the user.', datail: error.message });
    }
}

async function updateUserController(request, response){
    try {
        await updateUserService(request)
        return response.status(200).send(request.body)
    } catch (error) {
        return response.status(500).json({ message: 'An error occurred while updating the user.', datail: error.message });
    }

}

async function deleteUserController(request, response){
    await deleteUserService (request.params)
    return response.status(200).send({message:"Usuário deletado com sucesso!"})
}

export { getAllUserController,createUserController, updateUserController, deleteUserController}