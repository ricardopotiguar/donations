import { Router } from 'express'
const router = Router()

import { getAllUserController, createUserController, updateUserController, deleteUserController } from '../controllers/userController.js'
import { userValidation, userNeedsValidation } from '../middlewares/validationMiddleware.js'
import { createUserNeedsController, getAllUserNeedsController, updateUserNeedsController, deleteUserNeedsController } from '../controllers/userNeedsController.js'
import { createDonationController, getAllDonationController, updateDonationController, deleteDonationController } from '../controllers/donationController.js'
import { loginController } from '../controllers/loginController.js'

import { body } from 'express-validator'

import {uploadFile} from '../middlewares/uploadFile.js' // Importar configuração do multer
/* import multer from 'multer'; */



router.post('/api/v1/usuarios', userValidation, createUserController) 
router.get('/api/v1/usuarios', getAllUserController)
router.put('/api/v1/usuarios/:id', updateUserController)
router.delete('/api/v1/usuarios/:id', deleteUserController)

//uploadFile.single("image")

/* // Configuração do multer
const upload = multer({
  dest: 'uploads/userNeedsImages', // Pasta onde as imagens serão salvas
  limits: { fileSize: 5 * 1024 * 1024 }, // Limite de 5MB
}); */
router.post('/api/v1/necessidades', uploadFile.single('image'), createUserNeedsController) 
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
