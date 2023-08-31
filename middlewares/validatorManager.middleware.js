import { body, cookie, header, param, validationResult } from "express-validator";
import axios from "axios";

const validationResultExpress = (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    next();
};

export const registerValidator = [
    body("email", "Formato de email incorrecto")
        .trim()
        .isEmail()
        .normalizeEmail(),
    body("password", "Mínimo 6 carácteres")
        .trim()
        .isLength({ min: 6 }),
    body("password", "Formato de password incorrecta").custom(
        (value, { req }) => {
            if (value !== req.body.repassword) {
                throw new Error("No coinciden las contraseñas");
            }
            return value;
        }
    ),
    validationResultExpress,
];

export const loginValidator = [
    body("email", "Formato de email incorrecto")
        .trim()
        .isEmail()
        .normalizeEmail(),
    body("password", "Mínimo 6 carácteres")
        .trim()
        .isLength({ min: 6 }),
    validationResultExpress,
];

export const tokenHeaderValidator = [
    header("authorization", "No existe el token")
        .trim()
        .notEmpty()
        .escape(),
    validationResultExpress,
];

export const tokenCookieValidator = [
    cookie("refreshToken", "No existe refresh Token")
        .trim()
        .notEmpty()
        .escape(),
    validationResultExpress,
];

export const linkValidator = [
    body("longLink", "Formato link incorrecto")
        .trim()
        .custom(async (value) => {
            try {
                if (!value.startsWith("http")) {
                    value = "https://" + value;
                }
                console.log(value)
                await axios.get(value);
                return value;
            } catch (error) {
                console.log(error)
                throw new Error("Link 404 no se encontro el link "+value);
            }
        }),
    validationResultExpress,
];


export const paramsLinkValidator = [

    param("id", "Formato id incorrecto")
        .trim()
        .notEmpty()
        .escape(),
    validationResultExpress,
];

export const paramNanoLinkValidator = [
    param("nanoLink", "Formato no válido (expressValidator)")
        .trim()
        .notEmpty()
        .escape(),
    validationResultExpress,
];

