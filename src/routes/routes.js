import { Router } from 'express'
const router = Router()

import { getAll, create, update, deleteUser } from '../controllers/userController.js'
import { userValidation } from '../middlewares/validationMiddleware.js'

router.get('/usuarios', getAll)
router.post('/usuarios', userValidation, create) 
router.put('/usuarios/:id', update)
router.delete('/usuarios/:id', deleteUser)

export default router
