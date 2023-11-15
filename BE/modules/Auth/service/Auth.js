import Auth from "../Model/Auth.js"
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

export const register = async (dataBody) => {
    const { password } = dataBody
    const bcryptPassword = await bcrypt.hash(password, 10)
    const user = await Auth.create({
        ...dataBody,
        password: bcryptPassword
    })
    return user
}
export const signin = async (req) => {
    const user = req
    const token = jwt.sign({ _id: user._id }, process.env.SECRET_KEY, {
        expiresIn: "5d",
    });
    user.password = undefined
    const auth = { user, accessToken: token }
    return auth
}

export const getAllUsers = async (req) => {
    const users = await Auth.find()
    return users
}
export const getOneUsers = async (req) => {
    const users = await Auth.findById(req.params.id)
    return users
}
export const deleteUsers = async (req) => {
    const remove = await Auth.findByIdAndDelete(req.params.id)
    return remove
}

export const updateUsers = async (req) => {
    const id = req.params.id
    const { password } = req.body
    const bcryptPassword = await bcrypt.hash(password, 10)
    const update = await Auth.updateOne({
        _id: id
    },
        {
            ...req.body,
            password: bcryptPassword
        });
    return update
}