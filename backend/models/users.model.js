import { Schema, model } from "mongoose";


const UserSchema = Schema(
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
          required: true,
        },
        role: {
            type: String,
            enum: ["admin", "lecturer", "student"],
            required: true
        }
    },
    {
        timestamps: true
    }
)

const User = model("users", UserSchema)

export default User;
