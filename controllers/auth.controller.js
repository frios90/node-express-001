import {User} from '../models/User.model.js'
import jwt from 'jsonwebtoken'
import { generateRefreshToken, generateToken } from '../utils/tokenManager.util.js'

export const register = async (req, res) => {
    console.log("pegando en el register")
    console.log(req.body)

    const {email, password} = req.body

    try {

        // let user = await User.findOne({ email })
        // console.log("esto es el usuaruio")
        // console.log(user)
        // if (user) throw {code: 11000};

        let  user = new User({email, password})
        await user.save()

        //jwt

        return res.status(201).json({ok: true})

    } catch (error) {
        if (error.code == 11000) {
            return res.status(400).json({ error: "Ya existe un usuario registrado con el email ingresado" })
        }
        return res.status(500).json({ error: "error en el servidor" })
    }
}

export const login = async (req, res) => {
    console.log("aqui en el coso este")
    console.log(req.body)

    try {
        const {email, password} = req.body

        let user = await User.findOne({ email })

        if (!user) return res.status(403).json({ error: "El usuario no se encuentra registrado" });

        const responsePassword  = await user.comparePassword(password)

        if (!responsePassword) return res.status(403).json({ error: "Error en la contraseña ingresada" });

        // generar jwt
        const {token,expiresIn} = generateToken(user._id)
        generateRefreshToken(user._id,res)


        return res.status(201).json({token,expiresIn})

    } catch (error) {
        console.log(error)
        return res.status(500).json({ error: "error en el servidor" })

    }
}
export const infoUser = async (req, res) => {

    try {
        console.log(req.uid)
        const user = await User.findById(req.uid).lean()
        return res.json({user})
    } catch (error) {
        return res.status(500).json({error: "error de servidor"})
    }
}

export const refreshToken = (req,res) => {
    try {
        const { token, expiresIn } = generateToken(req.uid)
        return res.json({ token, expiresIn, refresh: true })
    } catch (error) {
        console.log(error)
        return res.status(500).json({error: "error de servidor"})
    }
}

export const logout = (req, res) => {
    res.clearCookie("refreshToken");
    res.json({ok: true})
};
