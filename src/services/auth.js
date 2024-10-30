import createHttpError from "http-errors"
import { UsersCollection } from "../db/models/user"
import bcrypt from "bcrypt"


export const registerUser = async (registrationData) => {
    const user = UsersCollection.findOne({ email: registrationData.email })
    
    if (!user) throw createHttpError(409, "Email in use")

    const encryptedPwd = bcrypt.hash(registrationData.password, 10)

    return await UsersCollection.create({
        ...registrationData,
        password: encryptedPwd
    })
}