import { nanoid } from "nanoid";
import { Link } from "../models/Link.model.js";

export const getLinks = async (req, res) => {
    try {
        const links = await Link.find({ uid: req.uid }).lean();
        return res.json({ links });
    } catch (error) {
        return res.status(500).json({ error: "Error de servidor" });
    }
};

export const getNanoLink = async (req, res) => {
    try {
        const { nanoLink } = req.params;
        const link = await Link.findOne({ nanoLink });

        if (!link) return res.status(404).json({ error: "No existe el link" });

        return res.json({ longLink: link.longLink });
    } catch (error) {
        console.log(error);
        if (error.kind === "ObjectId") {
            return res.status(403).json({ error: "Formato id incorrecto" });
        }
        return res.status(500).json({ error: "error de servidor" });
    }
};

export const createLink = async (req, res) => {
    try {
        const { longLink } = req.body;
        const link = new Link({ longLink, nanoLink: nanoid(6) , uid: req.uid }); /**Con nanoid genero id randon  */
        const newLink = await link.save();
        res.json({ newLink });
    } catch (error) {
        return res.status(500).json({ error: "Error de servidor" });
    }
};

export const removeLink = async (req, res) => {
    try {
        const { id } = req.params;
        const link = await Link.findById(id);
        if (!link) return res.status(404).json({ error: "no existe link" });

        if (!link.uid.equals(req.uid))
            return res.status(401).json({ error: "no es tu link payaso 🤡" });
        console.log("listo para ser eliminado")
        console.log(link)
        await link.deleteOne();
        return res.json({ link });
    } catch (error) {
        console.log(error)
        if (error.kind === "ObjectId")
            return res.status(403).json({ error: "Formato id incorrecto" });
        return res.status(500).json({ error: "Error de servidor" });
    }
};

export const updateLink = async (req, res) => {
    try {
        const { id } = req.params;
        let { longLink } = req.body;
        if (!longLink.startsWith("https://")) {
            longLink = "https://" + longLink;
        }

        const link = await Link.findById(id);

        if (!link) return res.status(404).json({ error: "No existe el link" });

        if (!link.uid.equals(req.uid))
            return res.status(401).json({ error: "No le pertenece ese id 🤡" });

        link.longLink = longLink;

        await link.save();

        return res.json({ link });
    } catch (error) {
        console.log(error);
        if (error.kind === "ObjectId") {
            return res.status(403).json({ error: "Formato id incorrecto" });
        }
        return res.status(500).json({ error: "error de servidor" });
    }
};

