import { Router } from 'express'
const router = Router()

import { getAll, create, update, deleteUser } from '../controllers/userController.js'
import { userValidation, userNeedsValidation } from '../middlewares/validationMiddleware.js'
import { createUserNeedsController, getAllUserNeedsController, updateUserNeedsController, deleteUserNeedsController } from '../controllers/userNeedsController.js'
import { createDonationController } from '../controllers/donationController.js'

router.get('/api/v1/usuarios', getAll)
router.post('/api/v1/usuarios', userValidation, create) 
router.put('/api/v1/usuarios/:id', update)
router.delete('/api/v1/usuarios/:id', deleteUser)

router.post('/api/v1/necessidades', createUserNeedsController) 
router.get('/api/v1/necessidades', getAllUserNeedsController) 
router.put('/api/v1/necessidades/:id', updateUserNeedsController) 
router.delete('/api/v1/necessidades/:id', deleteUserNeedsController)

router.post('/api/v1/doacao', userNeedsValidation, createDonationController) 



export default router
