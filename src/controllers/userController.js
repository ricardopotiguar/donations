import { createUser, findAll, updateUser, deleteUserService } from '../services/userService.js'

async function getAll(request, response){
    try{
        let users = []
        users = await findAll(request)
        return response.status(200).json(users)
    } catch (error) {
        return response.status(500).json({ message: 'An error occurred while finding the user.', datail: error.message });
    }
}

async function create(request, response){
    try {
        createUser(request.body)
        return response.status(201).send(request.body)
    } catch (error) {
        return response.status(500).json({ message: 'An error occurred while creating the user.', datail: error.message });
    }
}

async function update(request, response){
    try {
        await updateUser(request)
        return response.status(200).send(request.body)
    } catch (error) {
        return response.status(500).json({ message: 'An error occurred while updating the user.', datail: error.message });
    }

}

async function deleteUser(request, response){
    await deleteUserService (request.params)
    return response.status(200).send({message:"Usuário deletado com sucesso!"})
}

export { getAll,create, update, deleteUser}