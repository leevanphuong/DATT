import catchAsync from "../../../../utils/catchAsync.js";
import status from 'http-status'
import Auth from "../../Model/Auth.js";
import { register } from "../../service/Auth.js";

const registers = catchAsync(async(req,res)=> {
    const {email} = req.body
    const checkUser = await Auth.findOne({email})
    if(checkUser){
        return res.status(status.BAD_REQUEST).json('Người dùng đã tồn tại')
    }
    const users = await register(req.body)
    return res.status(status.OK).json(users)
})
export default registers
