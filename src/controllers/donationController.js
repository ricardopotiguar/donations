import { createDonationService, getAllDonationService, updateDonationService, deleteDonationService  } from '../services/donationService.js'


async function getAllDonationController(request, response){
    try{
        let usersNeeds = []
        usersNeeds = await getAllDonationService(request)
        return response.status(200).json(usersNeeds)
    } catch (error) {
        return response.status(500).json({ message: 'An error occurred while finding the donation.', datail: error.message });
    }
}


async function createDonationController(request, response){
    try {
        createDonationService(request, response)
        return response.status(201).send(request.body)
    } catch (error) {
        return response.status(500).json({ message: 'An error occurred while creating donation.', datail: error.message });
    }
}


async function updateDonationController(request, response){
    try {
        await updateDonationService(request)
        return response.status(200).send(request.body)
    } catch (error) {
        return response.status(500).json({ message: 'An error occurred while updating the donation.', datail: error.message });
    }

}

async function deleteDonationController(request, response){
    try {
        await deleteDonationService (request.params)
        return response.status(200).send({message:"Doação excluída com sucesso!"})
    } catch (error) {
        return response.status(500).json({ message: 'An error occurred while deleting the user needs.', datail: error.message });
    }
}

export { createDonationController, getAllDonationController, updateDonationController, deleteDonationController}