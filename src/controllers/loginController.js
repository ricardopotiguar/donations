console.log('Entrou em loginController')

import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { validationResult } from 'express-validator'

import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()


// Controller de login
async function loginController(request, response) {
    const errors = validationResult(request);
    if (!errors.isEmpty()) {
        return response.status(400).json({ errors: errors.array() });
    }

    const { email, password } = request.body;

    try {
        // Buscar usuário pelo email
        const user = await prisma.user.findUnique({ where: { email } });
        if (!user) {
            return response.status(401).json({ message: 'Credenciais inválidas.' });
        }

        // Verificar senha
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return response.status(401).json({ message: 'Credenciais inválidas!' });
        }
        
        // Gerar token JWT
        const token = jwt.sign(
            { userId: user.id, email: user.email },
            process.env.JWT_SECRET, // Certifique-se de definir esta variável no seu .env
            { expiresIn: '1h' } // Token válido por 1 hora
        );

        // Responder com o token
        response.json({ token, user: { id: user.id, email: user.email } });

    } catch (error) {
        console.error('Erro ao fazer login:', error);
        return response.status(500).json({ message: 'An error occurred in server while login process.', datail: error.message });
    }
}


export { loginController }
console.log('Saiu de loginController')