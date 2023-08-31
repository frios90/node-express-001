import {validationResult} from 'express-validator';


export const validateErrors = (req, res, next) => {
    const errors = validationResult(req);
    console.log("validando errores")
    if (!errors.isEmpty()) {
        return res.status(400).json({errors:errors.array()});
    }
    next();
}