import { string } from "joi";
import { Schema, model } from "mongoose";


const userSchema = new Schema(
    {
        name: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true,
            unique: true
        },
        password: {
            type: String,
            required: true
        },
        photoUrl: {
            type: String
        },
        theme: {
            type: String,
            enum: ["dark", "light", "violet"],
            default: "dark"
        }
    },
    {
        timestamps: true,
        versionKey: false
    }
)



export const UsersCollection = model('users', userSchema)