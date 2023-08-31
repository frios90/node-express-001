import express from 'express';
import { infoUser, login, register, refreshToken } from '../controllers/auth.controller.js';
import { body } from 'express-validator'
import { validateErrors } from '../middlewares/validateErrors.middleware.js';
import { requireToken } from '../middlewares/requireToken.middleware.js';
import { requireRefreshToken } from '../middlewares/requireRefreshToken.middleware.js';
const router = express.Router()


router.post('/register',
    [
        body('email', "Formato de email incorrecto").trim().isEmail().normalizeEmail(),

        body('password', "Contraseña debe tener mínimo 6 digitos")
            .trim()
            .isLength({ min: 6 }),

        body('password', "Formato de password incorrecto")
            .custom((value, { req }) => {
                if (value !== req.body.repassword) {
                    console.log("no son iguaes")
                    throw new Error("No coinciden las contraseñas");
                }
                return value
            }),
    ],
    validateErrors,
    register)

router.post('/login',
    [
        body('email', "Formato de email incorrecto").trim().isEmail().normalizeEmail(),

        body('password', "Contraseña debe tener mínimo 6 digitos")
            .trim()
            .isLength({ min: 6 }),

    ],
    validateErrors,
    login)


router.get("/protected", requireToken, infoUser)

router.get("/refresh", requireRefreshToken, refreshToken);

export default router