import { THIRTY_DAYS } from "../constants/auth.js"
import { loginUser, registerUser } from "../services/auth.js"


export const registerUserController = async (req, res) => {
    const user = await registerUser(req.body)

    res.status(201).json({
        status: 201,
        message: "Successfully registered an user",
        data: user
    })
}

export const loginUserController = async (req, res) => {
    const session = await loginUser(req.body)

    res.cookie('refreshToken', session.refreshToken, {
        httpOnly: true,
        expires: new Date(Date.now() + THIRTY_DAYS)
    })

    res.cookie('sessionId', session._id, {
        httpOnly: true,
        expires: new Date(Date.now() + THIRTY_DAYS)
    })

    res.json({
        status: 200,
        message: "Successfully loged in an user!",
        data: {
            accessToken: session.accessToken
        }
    })
}