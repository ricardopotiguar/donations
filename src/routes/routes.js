import { Router } from 'express'
const router = Router()

import { getAllUserController, createUserController, updateUserController, deleteUserController } from '../controllers/userController.js'
import { userValidation, userNeedsValidation } from '../middlewares/validationMiddleware.js'
import { createUserNeedsController, getAllUserNeedsController, updateUserNeedsController, deleteUserNeedsController } from '../controllers/userNeedsController.js'
import { createDonationController } from '../controllers/donationController.js'

router.get('/api/v1/usuarios', getAllUserController)
router.post('/api/v1/usuarios', userValidation, createUserController) 
router.put('/api/v1/usuarios/:id', updateUserController)
router.delete('/api/v1/usuarios/:id', deleteUserController)

router.post('/api/v1/necessidades', createUserNeedsController) 
router.get('/api/v1/necessidades', getAllUserNeedsController) 
router.put('/api/v1/necessidades/:id', updateUserNeedsController) 
router.delete('/api/v1/necessidades/:id', deleteUserNeedsController)

router.post('/api/v1/doacao', userNeedsValidation, createDonationController) 



export default router
