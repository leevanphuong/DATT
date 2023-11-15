import Auth from "../modules/Auth/Model/Auth.js";
import status from "http-status";
import jwt from "jsonwebtoken"
const veryfiletoken = async (req, res, next) => {
    try {
        const token = req.headers.authorization
        const accessToken = token.split(" ")[1]
        if (!token) {
            return res.status(status.BAD_REQUEST).json('Bạn chưa đăng nhập')
        }
        const decoder = await jwt.verify(accessToken, process.env.SECRET_KEY)
        if (!decoder) {
            return res.status(status.BAD_REQUEST).json('lỗi token')
        }
        const user = await Auth.findOne({ _id: decoder._id })
        req.user = user
        next()

    } catch (error) {
        return res.status(status.INTERNAL_SERVER_ERROR).json('lỗi')
    }
}
const checkAdminAuthorization = (req, res, next) => {
    veryfiletoken(req, res, () => {
        if (req.user.role == "ADMIN") {
            next()
        } else {
            return res.status(status.UNAUTHORIZED).json('Thất Bại')
        }
    })
}
const checkUserStoreAuthorization = (req, res, next) => {
    veryfiletoken(req, res, () => {
        if (req.user.role == "USER_STORE") {
            next()
        } else {
            return res.status(status.UNAUTHORIZED).json('Thất Bại')
        }
    })
}
const checkUserStoreAndAdminAuthorization = (req, res, next) => {
    veryfiletoken(req, res, () => {
        if (req.user.role == "USER_STORE" || req.user.role == "ADMIN") {
            next()
        } else {
            return res.status(status.UNAUTHORIZED).json('Thất Bại')
        }
    })
}
export { checkAdminAuthorization, checkUserStoreAuthorization, veryfiletoken, checkUserStoreAndAdminAuthorization }