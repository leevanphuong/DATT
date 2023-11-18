import Auth from "../modules/Auth/Model/Auth.js";
import status from "http-status";
import jwt from "jsonwebtoken";

const veryfiletoken = async (req, res, next) => {
    console.log(req.headers)
    try {
        const token = req.headers.authorization;
        if (!token) {
            return res.status(status.BAD_REQUEST).json('Bạn chưa đăng nhập');
        }

        const accessToken = token.split(" ")[1];
        if (!accessToken) {
            return res.status(status.BAD_REQUEST).json('Token không hợp lệ');
        }

        const decoder = await jwt.verify(accessToken, process.env.SECRET_KEY);
        if (!decoder) {
            return res.status(status.BAD_REQUEST).json('Lỗi xác thực token');
        }

        const user = await Auth.findOne({ _id: decoder._id });
        if (!user) {
            return res.status(status.BAD_REQUEST).json('Người dùng không tồn tại');
        }

        req.user = user;
        next();

    } catch (error) {
        console.error(error);
        return res.status(status.INTERNAL_SERVER_ERROR).json('Lỗi server');
    }
};


const checkAdminAuthorization = (req, res, next) => {
    veryfiletoken(req, res, () => {
        if (req.user.role === "ADMIN") {
            next();
        } else {
            return res.status(status.UNAUTHORIZED).json('Thất Bại');
        }
    });
};

const checkUserStoreAndAdminAuthorization = (req, res, next) => {
    veryfiletoken(req, res, () => {
        const userRole = req.user.role;
        if (userRole === "ADMIN") {
            next();
        } else {
            return res.status(status.UNAUTHORIZED).json('Thất Bại');
        }
    });
};

export { checkAdminAuthorization, veryfiletoken, checkUserStoreAndAdminAuthorization };
