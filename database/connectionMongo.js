import mongoose from "mongoose";

try {
    await mongoose.connect(process.env.URI_MONGO)
    console.log("conectado a MONGO")
} catch (error) {
    console.log("Error al conectar con mongo")
    console.log(error)
}
