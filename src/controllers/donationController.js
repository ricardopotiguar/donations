import { createDonationService } from '../services/donationService.js'
/*

async function getAllUserNeedsController(request, response){
    try{
        let usersNeeds = []
        usersNeeds = await getAllUserNeedsService(request)
        return response.status(200).json(usersNeeds)
    } catch (error) {
        return response.status(500).json({ message: 'An error occurred while finding the user.', datail: error.message });
    }
}
*/

async function createDonationController(request, response){
    try {
        createDonationService(request, response)
        return response.status(201).send(request.body)
    } catch (error) {
        return response.status(500).json({ message: 'An error occurred while creating donation.', datail: error.message });
    }
}

/*
async function updateUserNeedsController(request, response){
    try {
        await updateUserNeedsService(request)
        return response.status(200).send(request.body)
    } catch (error) {
        return response.status(500).json({ message: 'An error occurred while updating the user.', datail: error.message });
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

export { createUserNeedsController, getAllUserNeedsController, updateUserNeedsController, deleteUserNeedsController } */

export { createDonationController }