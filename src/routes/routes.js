import { Router } from 'express'
const router = Router()

import { getAllUserController, createUserController, updateUserController, deleteUserController } from '../controllers/userController.js'
import { userValidation, userNeedsValidation } from '../middlewares/validationMiddleware.js'
import { createUserNeedsController, getAllUserNeedsController, updateUserNeedsController, deleteUserNeedsController } from '../controllers/userNeedsController.js'
import { createDonationController, getAllDonationController, updateDonationController, deleteDonationController } from '../controllers/donationController.js'
import { loginController } from '../controllers/loginController.js'

import { body } from 'express-validator'

router.post('/api/v1/usuarios', userValidation, createUserController) 
router.get('/api/v1/usuarios', getAllUserController)
router.put('/api/v1/usuarios/:id', updateUserController)
router.delete('/api/v1/usuarios/:id', deleteUserController)

router.post('/api/v1/necessidades', createUserNeedsController) 
router.get('/api/v1/necessidades', getAllUserNeedsController) 
router.put('/api/v1/necessidades/:id', updateUserNeedsController) 
router.delete('/api/v1/necessidades/:id', deleteUserNeedsController)

router.post('/api/v1/doacao', userNeedsValidation, createDonationController) 
router.get('/api/v1/doacao', getAllDonationController) 
router.put('/api/v1/doacao/:id', updateDonationController) 
router.delete('/api/v1/doacao/:id', deleteDonationController) 

// Rota de login
router.post('/api/v1/login',
    [
      body('email').isEmail().withMessage('Insira um email válido'),
      body('password').notEmpty().withMessage('A senha é obrigatória'),
    ],
    loginController
  );

export default router
