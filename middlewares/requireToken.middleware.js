import jwt from 'jsonwebtoken';
import { tokenVerificationErrors } from '../utils/tokenManager.util.js';

export const requireToken = (req,res,next) => {
    try {
        let token = req.headers?.authorization; //el ? valida que exista la info si no retorna un undefined
        if (!token)
            throw new Error('No existe el token en el header usa bearer')

        token = token.split(" ")[1]
        const {uid} = jwt.verify(token, process.env.JWT_SECRET)
        req.uid = uid
        next()
    } catch (error) {
        console.log(error)
        return res.status(401).json({error: tokenVerificationErrors[error.message]})
    }
}